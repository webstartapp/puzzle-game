import knex from "@/knex";
import { ExpressTypeResolver } from "@/resolvers/expressTypeResolver";
import { Request } from "express";
import { IUserProfile, IUserRegister } from "@/_generated/sessionOperations";
import { randomUUID } from "crypto";
import { comparePassword } from "@/utils/password";

export const getToken = (req: Request) => {
  const bearer = req.headers.authorization || req.headers.Authorization;
  if (!bearer) {
    throw new Error("No token");
  }
  const token = String(bearer).split(" ")[1];
  if (!token) {
    throw new Error("No token");
  }
  return token;
};

export const UserDB = ExpressTypeResolver({
  table: "users",
  properties: {
    id: "id",
    created: "created",
    username: "username",
    email: "email",
    password: "password"
  },
  resolvers: {
    getUser: async (props: { userId: string }): Promise<IUserProfile> => {
      const user: IUserProfile = await knex("users")
        .where("id", props.userId)
        .select(UserDB.properties.username, UserDB.properties.id);
      user.session = {
        coins: 0,
        previous: []
      };
      (user as any).password = undefined;
      return user;
    },
    registerUser: async (props: {}, body: IUserRegister): Promise<IUserProfile> => {
      const token = randomUUID();
      if (!body.userId) {
        throw new Error("User ID is required");
      }
      await knex("users")
        .insert({
          email: body.email,
          username: body.username,
          password: body.password,
          created: new Date(),
          id: body.userId
        })
        .onConflict("token")
        .ignore();
      return await UserDB.resolvers.getUser({ userId: body.userId });
    },
    deleteUser: async (props: { userId: string }): Promise<void> => {
      await knex("users").where("id", props.userId).delete();
    },
    loginUser: async (props: { username: string; password: string }): Promise<IUserProfile> => {
      const user = await knex("users").where("username", props.username).first();
      if (!user) {
        throw new Error("User not found");
      }
      const comparedPassword = await comparePassword(props.password, user.password);
      if (!comparedPassword) {
        throw new Error("Invalid password");
      }
      return await UserDB.resolvers.getUser({ userId: user.id });
    }
  }
});
