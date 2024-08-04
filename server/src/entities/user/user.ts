import knex from "@/knex";
import { ExpressTypeResolver } from "@/resolvers/expressTypeResolver";
import { Request } from "express";
import { IUserProfile, IUserRegister } from "@/_generated/sessionOperations";
import { randomUUID } from "crypto";

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
    token: "token"
  },
  resolvers: {
    getViewer: async (props: { userId: string }, req: Request): Promise<IUserProfile> => {
      const token = getToken(req);
      const user = await knex("users").where("token", token).first();
      return user;
    },
    getUser: async (props: { userId: string }): Promise<IUserProfile> => {
      const user = await knex("users")
        .where("id", props.userId)
        .select(UserDB.properties.username, UserDB.properties.id)
        .first();
      return user;
    },
    registerUser: async (props: {}, body: IUserRegister): Promise<IUserProfile> => {
      const token = randomUUID();
      if (!body.userId) {
        throw new Error("User ID is required");
      }
      await knex("users")
        .insert({
          token: token,
          email: body.email,
          username: body.username,
          password: body.password,
          created: new Date(),
          id: body.userId
        })
        .onConflict("token")
        .ignore();
      return await UserDB.resolvers.getUser({ userId: body.userId });
    }
  }
});
