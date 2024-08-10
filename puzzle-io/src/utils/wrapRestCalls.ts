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
) => {
  return (baseURL: string) => {
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
    return (
      token: string,
      useCallOptions?: UseQueryOptions<any, ErrorObject>,
    ) => {
      const useCallInner: UseCallFNType<OPERATIONS, PATH> = (
        path,
        ...params
      ) => {
        return useQuery<any, ErrorObject>(
          [path, JSON.stringify(params[0])],
          async () => {
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
            staleTime: 1000 * 60 * 15,
            refetchOnWindowFocus: false,
            ...useCallOptions,
          },
        );
      };
      return {
        useCall: useCallInner,
      };
    };
  };
};
