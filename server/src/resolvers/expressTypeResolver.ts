import { APIResolversType } from "@/_generated/sessionOperations";
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
};

export type LocalResolverType<
  ARGS extends Record<string, any> = Record<string, any>,
  BODY extends Record<string, any> = Record<string, any>,
  RET extends Record<string, any> = Record<string, any>
> = (props: ARGS, body: BODY, context: ContextType) => Promise<RET>;

export type ExpressResolverType<
  TABLE extends string = string,
  PROPS extends Record<string, string> = Record<string, string>,
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
