// import knexHandler, { Config } from "knex";
import { knex as knexHandler, Knex } from "knex";
import { ExpressResolverType } from "@/resolvers/expressTypeResolver";
import { IKnexDBType } from "@/types/KnexDBType";

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

export const isItProductionDB = () => {
  return process.env.DATABASE === "production";
};

export const sanateInsertData = <T extends string>(
  DBModel: ExpressResolverType,
  data: Record<string, any> | Record<string, any>[],
  withDefault: Partial<Record<T, any>> = {}
) => {
  const processedData = Array.isArray(data) ? data : [data];
  return processedData.map((d) => {
    const out: Record<string, any> = {
      ...withDefault
    };
    if (!Object.keys(DBModel.properties || {}).length) {
      throw new Error("DBModel.properties is not defined");
    }
    Object.keys(DBModel.properties || {}).forEach((key) => {
      const property = DBModel.properties[key];
      if (Array.isArray(d[property])) {
        out[key] = JSON.stringify(d[property]);
      } else {
        out[key] = d[property] || out[key];
      }
    });
    return out;
  });
};

export const configKnex: (p?: { followerDB?: boolean }) => Knex.Config = (p) => ({
  client: "pg",
  connection: {
    connectionString: isItProductionDB() ? process.env.DATABASE_URL : process.env.STAGE_DATABASE_URL,
    ssl:
      process.env.NO_DATABASE_SSL === "yes"
        ? undefined
        : {
            // otherwise it returns: UnhandledPromiseRejectionWarning: Error: self signed certificate
            rejectUnauthorized: false
          }
  },
  migrations: {
    directory: "./src/migrations"
  },
  pool: {
    min: 0,
    max: process.env.ENVIRONMENT === "local" ? 20 : 400
  }
});

const knexWrapper = knexHandler(configKnex());

const knex = <T extends keyof IKnexDBType>(dbName: T): Knex.QueryBuilder<IKnexDBType[T]> => knexWrapper(dbName);
export default knex;
