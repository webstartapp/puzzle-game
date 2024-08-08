import {
  APIErrorObject,
  APIRequestCallType,
  ErrorObject,
} from '@/types/RestAPIGenerator/RESTRequestType';
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { restInnerCall } from './RestCallHandlers';
import axios from 'axios';

export const errorObject = (
  error: ErrorObject | string,
  statusCode?: number,
  APIError?: APIErrorObject,
) => {
  const e: ErrorObject =
    typeof error === 'string'
      ? {
          message: error,
        }
      : error;
  if (Array.isArray(e.message)) {
    const newMessage = e.message.join(', ');
    e.message = newMessage;
  }
  e.title = typeof error === 'string' ? 'error.error' : error.title;
  e.statusCode = statusCode || (error as any)?.statusCode;
  e.APIError = APIError || (error as any)?.APIError;
  e.stack = (error as any)?.stack || new Error().stack;
  return e;
};

type UseCallFNType<
  OPERATIONS extends Record<string, APIRequestCallType>,
  PATH extends keyof OPERATIONS,
> = (
  path: PATH,
  ...params: Parameters<OPERATIONS[PATH]>
) => UseQueryResult<ReturnType<OPERATIONS[PATH]>['responseType'], ErrorObject>;

export const wrapRestCalls = <
  OPERATIONS extends Record<string, APIRequestCallType>,
  PATH extends keyof OPERATIONS,
>(
  operations: OPERATIONS,
  baseURL: string,
) => {
  const axiosAPI = axios.create({
    baseURL,
    paramsSerializer: {
      serialize: (params) => {
        if (params) {
          Object.keys(params).forEach((key) => {
            if (
              params[key] === undefined ||
              (Array.isArray(params[key]) && params[key].length === 0)
            )
              delete params[key];
          });
        }
        return new URLSearchParams(params).toString();
      },
    },
  });
  return (useCallOptions: UseQueryOptions<any, ErrorObject>, token: string) => {
    const useCallInner: UseCallFNType<OPERATIONS, PATH> = (path, ...params) => {
      let initiationError: ErrorObject;
      let enabled: boolean | undefined = undefined;
      let enabledToken: boolean | undefined = undefined;

      try {
        enabledToken =
          !operations[path] ||
          !!window.sessionToken ||
          !operations[path](...(params as unknown as [any])).security ||
          operations[path](...(params as unknown as [any])).security?.includes(
            '',
          );
      } catch (e) {
        initiationError = errorObject(e);
        console.log(364, initiationError, params);
      }
      if (!enabled) {
        console.log(
          291,
          'undefined fields',
          path,
          params[0],
          enabled,
          enabledToken,
        );
      }
      return useQuery<any, ErrorObject>(
        [path, JSON.stringify(params[0])],
        async () => {
          if (initiationError !== undefined) throw initiationError;
          if (!operations[path])
            throw errorObject({
              title: 'error.network',
              message: `Path ${path as string} is not defined in API.`,
            });

          const response = await restInnerCall(
            operations[path](...(params as unknown as [any])),
            axiosAPI,
            token,
          );
          return response.data;
        },
        {
          enabled: !!enabled && !!enabledToken,
          staleTime: 1000 * 60,
          refetchOnWindowFocus: false,
          ...useCallOptions,
        },
      );
    };
    return useCallInner;
  };
};
