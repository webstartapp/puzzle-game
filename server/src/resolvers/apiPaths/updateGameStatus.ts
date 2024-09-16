import { IupdateGameStatusCallResolver } from "@/_generated/sessionOperations";
import { GameDB } from "@/entities/game/game";

const updateGameStatus: IupdateGameStatusCallResolver = async (props, body, context) => {
  return await GameDB.resolvers.insertGameStatus({}, body, context);
};

export default updateGameStatus;
