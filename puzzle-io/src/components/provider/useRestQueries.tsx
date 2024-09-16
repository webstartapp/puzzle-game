import { restCalls as sessionCalls } from '@/_generated/sessionOperations';
import { ErrorObject } from '@/types/RestAPIGenerator/RESTRequestType';
import { createContext } from 'react';
import { UseQueryOptions } from 'react-query';

const restCalls = {
  sessionCalls: sessionCalls('http://localhost:4000/'),
};

type RestCalls = typeof restCalls;

type UserRestQueriesConfig<T extends keyof RestCalls> = {
  useCallOptions?: UseQueryOptions<RestCalls[T], ErrorObject>;
};

export const useRestQueryContext = createContext(
  undefined as unknown as RestCalls['sessionCalls'],
);

export const useRestAPI = <T extends keyof RestCalls>(
  service: T,
  config: UserRestQueriesConfig<T> = {},
): ReturnType<RestCalls[T]> => {
  const serviceCalls = restCalls[service];
  const context = serviceCalls(config.useCallOptions);
  return {
    ...context,
  } as ReturnType<RestCalls[T]>;
};
