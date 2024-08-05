import { IgetUserCallResolver } from "@/_generated/sessionOperations";
import { UserDB } from "@/entities/user/user";

const getUserResolver: IgetUserCallResolver = async (props, body, context) => {
  console.log("getUserResolver", props, body, context);
  if (!context.viewer) {
    throw new Error("No viewer");
  }
  return UserDB.resolvers.getUser({ userId: context.viewer.id });
};

export default getUserResolver;
