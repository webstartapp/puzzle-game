import knex from "@/knex";
import { ExpressTypeResolver } from "@/resolvers/expressTypeResolver";
import { IGameResult, ILevelStatsDB, IUserSession, IUserSessionDB } from "@/_generated/sessionOperations";
import { moveDB } from "./move";
import { IDBType } from "@/types/KnexDBType";
import { GameDB } from "./game";

export const GameSessionDB = ExpressTypeResolver({
  table: "gameSessions",
  properties: {
    id: "id",
    created: "created",
    userId: "userId",
    coins: "coins"
  },
  resolvers: {
    insertGameSession: async (props: {}, body: IUserSession, context) => {
      if (!context.viewer?.id) {
        throw new Error("No user id");
      }
      let previousSession: IUserSessionDB = (await GameSessionDB.resolvers.getGameSession({
        userId: context.viewer.id
      })) as IUserSessionDB;
      if (!previousSession?.id) {
        await knex("gameSessions")
          .insert({
            userId: context.viewer.id,
            coins: body.coins
          })
          .returning(GameSessionDB.properties.id);
        previousSession = (await GameSessionDB.resolvers.getGameSession({
          userId: context.viewer.id
        })) as IUserSessionDB;
      }

      if (!previousSession?.id) {
        throw new Error("unable to create session");
      }
      await knex("gameSessions").where({ id: previousSession.id }).update({ coins: body.coins });
      previousSession.coins = body.coins;

      if (!body.previous) {
        throw new Error("No previous games");
      }
      const newPrevious = [];
      for (let i = 0; i < body.previous.length; i++) {
        const previousGame = previousSession?.previous?.find(
          (game: ILevelStatsDB) => game.levelId === body.previous[i].levelId
        );
        const updatedGame = await GameDB.resolvers.updateGameStatus(
          { id: previousGame?.id, sessionId: previousSession.id },
          body.previous[i],
          context
        );
        newPrevious.push(updatedGame);
      }
      previousSession.previous = newPrevious;
      return previousSession;
    },
    getGameSession: async (props: { userId: string }) => {
      const sessionData: Partial<IUserSessionDB> =
        (await knex("gameSessions").where({ userId: props.userId }).first()) || {};
      if (!sessionData?.id) {
        return sessionData;
      }
      sessionData.previous = await knex("games").where("sessionId", sessionData.id || "-");
      return {
        ...sessionData
      };
    }
  }
});
