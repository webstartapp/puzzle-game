import { Knex } from "knex";
export interface IDBType {
  users: {
    id: string;
    created: Date;
    username: string;
    email: string;
    password: string;
  };
  games: {
    id: string;
    created: Date;
    userId: string;
    levelId: string;
    time: number;
    movesCount: number;
    sessionId: string;
    completed: boolean;
  };
  moves: {
    id: string;
    created: Date;
    gameId: string;
    x: number;
    y: number;
  };
  gameSessions: {
    id: string;
    created: Date;
    userId: string;
    coins: number;
  };
}

declare module "knex/types/tables" {
  interface Tables {
    users: IDBType["users"];
  }
}

export type KnexMigrateType<T extends keyof IDBType> = Knex<IDBType[T], IDBType[T][]>;
export type KnexMigrateTableType<T extends keyof IDBType> = KnexMigrateType<T>["table"];
