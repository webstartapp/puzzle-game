import { APIResolversType } from "@/_generated/sessionOperations";
import { IDBType } from "@/types/KnexDBType";
import { Request } from "express";

export type Viewer = {
  id: string;
  roles: string[];
};

export type ContextType = {
  req: Request;
  res: any;
  viewer?: Viewer;
  resolvers: APIResolversType;
  statusSet: boolean;
  setResponseStatus: (status: number) => void;
  responseHeaders: Record<string, string>;
};

export type LocalResolverType<
  ARGS extends Record<string, any> | undefined = Record<string, any> | undefined,
  BODY extends Record<string, any> | undefined = Record<string, any> | undefined,
  RET extends any = any
> = (props: ARGS, body: BODY, context: ContextType) => Promise<RET>;

export type ExpressResolverType<
  TABLE extends keyof IDBType = keyof IDBType,
  PROPS extends { [K in keyof IDBType[TABLE]]: K } = { [K in keyof IDBType[TABLE]]: K },
  ARGS extends Record<string, any> = any,
  RET extends Record<string, any> = any
> = {
  table: TABLE;
  properties: PROPS;
  resolvers: Record<string, LocalResolverType<ARGS, RET>>;
};

export const ExpressTypeResolver = <TYPE extends ExpressResolverType = ExpressResolverType>(
  expresResolverOptions: TYPE
): TYPE => {
  return expresResolverOptions;
};
