require("tsconfig-paths/register");
import { GameDB } from "@/entities/game/game";
import { GameSessionDB } from "@/entities/game/gameSession";
import { moveDB } from "@/entities/game/move";
import { UserDB } from "@/entities/user/user";
import { KnexMigrateType } from "@/types/KnexDBType";
import type { Knex } from "knex";

const upUser = async (knex: KnexMigrateType<"users">) => {
  await knex.schema.createTable(UserDB.table, (table) => {
    table.uuid(UserDB.properties.id).primary().notNullable();
    table.timestamp(UserDB.properties.created).defaultTo(knex.fn.now());
    table.string(UserDB.properties.username);
    table.string(UserDB.properties.email);
    table.string(UserDB.properties.password);
  });
  return;
};

const upGameSession = async (knex: KnexMigrateType<"gameSessions">) => {
  await knex.schema.createTable(GameSessionDB.table, (table) => {
    table.uuid(GameSessionDB.properties.id).primary().notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
    table.timestamp(GameSessionDB.properties.created).defaultTo(knex.fn.now());
    table.uuid(GameSessionDB.properties.userId).references("users.id");
    table.integer(GameSessionDB.properties.coins);
  });
  return;
};

const upGame = async (knex: KnexMigrateType<"games">) => {
  await knex.schema.createTable(GameDB.table, (table) => {
    table.uuid("id").primary().notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
    table.timestamp("created").defaultTo(knex.fn.now());
    table.uuid("userId").references("users.id");
    table.string("levelId");
    table.integer("time");
    table.integer("movesCount");
    table.uuid("sessionId");
    table.boolean("completed");
  });
  return;
};

const upMoves = async (knex: KnexMigrateType<"moves">) => {
  await knex.schema.createTable(moveDB.table, (table) => {
    table.increments("id").primary().notNullable();
    table.timestamp("created").defaultTo(knex.fn.now());
    table.uuid("gameId").references("games.id");
    table.integer("x");
    table.integer("y");
  });
  return;
};

export async function up(knex: KnexMigrateType<"games" | "moves" | "users" | "gameSessions">): Promise<void> {
  await upUser(knex as KnexMigrateType<"users">);
  await upGameSession(knex as KnexMigrateType<"gameSessions">);
  await upGame(knex as KnexMigrateType<"games">);
  await upMoves(knex as KnexMigrateType<"moves">);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(moveDB.table);
  await knex.schema.dropTable(GameDB.table);
  await knex.schema.dropTable(GameSessionDB.table);
  await knex.schema.dropTable(UserDB.table);
}
