import { IdeleteUserCallResolver, IupdateSessionCallResolver } from "@/_generated/sessionOperations";
import { GameSessionDB } from "@/entities/game/gameSession";
import { UserDB } from "@/entities/user/user";

const updateSession: IupdateSessionCallResolver = GameSessionDB.resolvers.insertGameSession;

export default updateSession;
