import { IdeleteUserCallResolver } from "@/_generated/sessionOperations";
import { UserDB } from "@/entities/user/user";

const deleteUser: IdeleteUserCallResolver = async (props, body, context) => {
  console.log("deleteUser", props, body, context);
  if (!context.viewer) {
    throw new Error("No viewer");
  }
  await UserDB.resolvers.deleteUser({ userId: context.viewer.id });
  context.responseHeaders.Authorization = "";
  return "";
};

export default deleteUser;
