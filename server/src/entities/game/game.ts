import knex from "@/knex";
import { ExpressTypeResolver } from "@/resolvers/expressTypeResolver";
import { IGameResult, ILevelStats } from "@/_generated/sessionOperations";
import { moveDB } from "./move";
import { IDBType } from "@/types/KnexDBType";

export const GameDB = ExpressTypeResolver({
  table: "games",
  properties: {
    id: "id",
    created: "created",
    userId: "userId",
    level: "level",
    time: "time",
    movesCount: "movesCount"
  },
  resolvers: {
    insertGameStatus: async (props: {}, body: IGameResult, context) => {
      if (!context.viewer?.id) {
        throw new Error("No user id");
      }
      const insertedGame = await knex("games")
        .insert({
          userId: context.viewer.id,
          levelId: body.levelId,
          time: body.time,
          movesCount: body.moves.length || 0,
          completed: true
        })
        .returning(GameDB.properties.id);

      console.log(28, insertedGame, body.moves);

      await moveDB.resolvers.insertMoves({ gameId: insertedGame[0]?.id, moves: body.moves });
      return "" as const;
    },
    updateGameStatus: async (DBGame: { id?: string; sessionId: string }, body: ILevelStats, context) => {
      if (!context.viewer?.id) {
        throw new Error("No user id");
      }
      if (!DBGame?.id) {
        const insertedGame: IDBType["games"][] = await knex("games")
          .insert({
            userId: context.viewer.id,
            levelId: body.levelId,
            time: body.time,
            movesCount: body.moves,
            sessionId: DBGame.sessionId,
            completed: body.completed
          })
          .returning("*");
        return knex("games").where({ id: insertedGame[0]?.id }).first();
      }
      return knex("games")
        .where({ id: DBGame.id })
        .update({
          time: body.time,
          movesCount: body.moves
        })
        .returning("*");
    }
  }
});
