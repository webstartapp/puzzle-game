import knex from "@/knex";
import { ExpressTypeResolver } from "@/resolvers/expressTypeResolver";
import { IGameResult, IGrid } from "@/_generated/sessionOperations";

export const moveDB = ExpressTypeResolver({
  table: "moves",
  properties: {
    id: "id",
    created: "created",
    gameId: "gameId",
    x: "x",
    y: "y"
  },
  resolvers: {
    insertMove: async (props: { gameId: string; x: number; y: number }) => {
      return await knex("moves").insert({
        gameId: props.gameId,
        x: props.x,
        y: props.y
      });
    },
    insertMoves: async (props: { gameId: string; moves: IGrid[] }) => {
      for (let i = 0; i < props.moves.length; i++) {
        await moveDB.resolvers.insertMove({
          gameId: props.gameId,
          x: props.moves[i].x || 0,
          y: props.moves[i].y || 0
        });
      }
    }
  }
});
