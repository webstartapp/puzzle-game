import { Knex } from "knex";
export interface IDBType {
  users: {
    id: string;
    created: Date;
    username: string;
    email: string;
    password: string;
    token: string;
  };
}

declare module "knex/types/tables" {
  interface Tables {
    users: IDBType["users"];
  }
}

export type KnexMigrateType<T extends keyof IDBType> = Knex<IDBType[T], IDBType[T][]>;
export type KnexMigrateTableType<T extends keyof IDBType> = KnexMigrateType<T>["table"];
