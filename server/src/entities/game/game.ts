import knex from "@/knex";
import { ExpressTypeResolver } from "@/resolvers/expressTypeResolver";
import { Request } from "express";
import { IGameResult } from "@/_generated/sessionOperations";
import { moveDB } from "./move";

export const GameDB = ExpressTypeResolver({
  table: "games",
  properties: {
    id: "id",
    created: "created",
    userId: "userId",
    level: "level",
    time: "time"
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
          time: body.time
        })
        .returning(GameDB.properties.id);

      console.log(28, insertedGame, body.moves);

      await moveDB.resolvers.insertMoves({ gameId: insertedGame[0]?.id, moves: body.moves });
      return "" as const;
    }
  }
});
