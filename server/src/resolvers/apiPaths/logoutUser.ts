import { IlogoutUserCallResolver } from "@/_generated/sessionOperations";

const logoutUser: IlogoutUserCallResolver = async (props, body, context) => {
  context.responseHeaders.Authorization = "";
  return "";
};

export default logoutUser;
