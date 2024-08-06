import { IregisterUserCallResolver } from "@/_generated/sessionOperations";
import { UserDB } from "@/entities/user/user";

const registerUser: IregisterUserCallResolver = async (props, body, context) => {
  if (!body) {
    throw new Error("No body");
  }
  const user = await UserDB.resolvers.registerUser({}, body);
  return await UserDB.resolvers.getUser({ userId: user.id });
};

export default registerUser;
