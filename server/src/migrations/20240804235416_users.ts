require("tsconfig-paths/register");
import { UserDB } from "@/entities/user/user";
import { KnexMigrateType } from "@/types/KnexDBType";
import type { Knex } from "knex";

export async function up(knex: KnexMigrateType<"users">): Promise<void> {
  return knex.schema.createTable(UserDB.table, (table) => {
    table.uuid(UserDB.properties.id).primary().notNullable();
    table.timestamp(UserDB.properties.created).defaultTo(knex.fn.now());
    table.string(UserDB.properties.username).notNullable();
    table.string(UserDB.properties.email).notNullable();
    table.string(UserDB.properties.password).notNullable();
    table.string(UserDB.properties.token).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(UserDB.table);
}
