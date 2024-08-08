/* eslint-disable */
import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { useConfig } from '@/components/providers/ConfigProvder';
import { useSession, signOut } from 'next-auth/react';
import { useCallback, useContext, useMemo, createContext, useEffect, useState } from 'react';
import { restOperations as restOperationsEMS, GlobalMockData as MockDataEMS } from 'generator/_generated/EMSOperations';
import { restOperations as restOperationsHPFDC, GlobalMockData as MockDataHPFDC } from 'generator/_generated/HPFDCOperations';
import { restOperations as restOperationsAudit, GlobalMockData as MockDataAudit } from 'generator/_generated/AuditOperations';
import { restOperations as restOperationsReport, GlobalMockData as MockDataReport } from 'generator/_generated/ReportOperations';
import { restOperations as restOperationsEvaluation, GlobalMockData as MockDataEvalutation } from 'generator/_generated/EvaluationOperations';
import { restOperations as restOperationsExport, GlobalMockData as MockDataExport } from 'generator/_generated/ExportOperations';
import { restOperations as restOperationsApac, GlobalMockData as MockDataApac } from 'generator/_generated/ApacOperations';
import { restOperations as restOperationsImport, GlobalMockData as MockDataImport} from 'generator/_generated/ImportOperations';
import { restOperations as restOperationsMiddleware, GlobalMockData as MockDataMiddleware } from 'generator/_generated/MiddlewareOperations';
import { restOperations as restOperationsEHR, GlobalMockData as MockDataEHR } from 'generator/_generated/EHROperations';

import { ErrorObject, errorObject } from '@/components/providers/LoadingProvider';
import { Stage, StageStoreData } from '@/types/stagedRouterTypes';
import { restInnerCall } from '@/utils/restAPI/RestCallHandlers';
import { encodeRestCall } from '@/utils/restAPI/RestCallEncoding';

const resOperations = {
    EMS: restOperationsEMS,
    HPFDC: restOperationsHPFDC,
    EHR: restOperationsEHR,
    Audit: restOperationsAudit,
    Evaluation: restOperationsEvaluation,
    Export: restOperationsExport,
    Report: restOperationsReport,
    Apac: restOperationsApac,
    Import: restOperationsImport,
    Middleware: restOperationsMiddleware,
};

const mixedMockData = {
    EMS: MockDataEMS,
    HPFDC: MockDataHPFDC,
    EHR: MockDataEHR,
    Audit: MockDataAudit,
    Evaluation: MockDataEvalutation,
    Export: MockDataExport,
    Report: MockDataReport,
    Apac: MockDataApac,
    Import: MockDataImport,
    Middleware: MockDataMiddleware,
};

type RestOperationsEMS = typeof restOperationsEMS;

type MixedOperations = {
    EMS: typeof restOperationsEMS;
    HPFDC: typeof restOperationsHPFDC;
    EHR: typeof restOperationsEHR;
    Audit: typeof restOperationsAudit;
    Evaluation: typeof restOperationsEvaluation;
    Export: typeof restOperationsExport;
    Report: typeof restOperationsReport;
    Apac: typeof restOperationsApac;
    Import: typeof restOperationsImport;
    Middleware: typeof restOperationsMiddleware;
}

const asOperationToStage = <OP extends keyof MixedOperations = keyof MixedOperations, OPS extends { [P in OP]: Stage } = { [P in OP]: Stage }>(
    operations: OPS
) => operations;

const operationToStage = asOperationToStage({
    EMS: 'ems',
    EHR: 'apac',
    HPFDC: 'apac',
    Audit: 'apac',
    Evaluation: 'apac',
    Export: 'apac',
    Report: 'apac',
    Apac: 'apac',
    Import: 'apac',
    Middleware: 'apac',
});

const asOperationToMyself = <OP extends keyof MixedOperations = keyof MixedOperations, OPS extends { [P in OP]: 'Apac' | 'EMS' } = { [P in OP]: 'Apac' | 'EMS' }>(
    operations: OPS
) => operations;

const operationToMyself = asOperationToMyself({
    EMS: 'EMS',
    HPFDC: 'Apac',
    EHR: 'Apac',
    Audit: 'Apac',
    Evaluation: 'Apac',
    Export: 'Apac',
    Report: 'Apac',
    Apac: 'Apac',
    Import: 'Apac',
    Middleware: 'Apac',
});

export type OperationToStageType = typeof operationToStage;

type DownloadableOptions = {
  download?: boolean;
  filename?: string;
  onSuccess?: () => void;
  onError?: (error: ErrorObject) => void;
}

declare global {
  interface Window {
    sessionToken: string | undefined;
    sessionId: string | undefined;
  }
}

export interface CallFNtypes {
  EMS: <T extends keyof MixedOperations['EMS']>(path: T, ...params: Parameters<MixedOperations['EMS'][T]>) => Promise<ReturnType<MixedOperations['EMS'][T]>['responseType'] | false>;
  HPFDC: <T extends keyof MixedOperations['HPFDC']>(path: T, ...params: Parameters<MixedOperations['HPFDC'][T]>) => Promise<ReturnType<MixedOperations['HPFDC'][T]>['responseType'] | false>;
  EHR: <T extends keyof MixedOperations['EHR']>(path: T, ...params: Parameters<MixedOperations['EHR'][T]>) => Promise<ReturnType<MixedOperations['EHR'][T]>['responseType'] | false>;
  Audit: <T extends keyof MixedOperations['Audit']>(path: T, ...params: Parameters<MixedOperations['Audit'][T]>) => Promise<ReturnType<MixedOperations['Audit'][T]>['responseType'] | false>;
  Evaluation: <T extends keyof MixedOperations['Evaluation']>(path: T, ...params: Parameters<MixedOperations['Evaluation'][T]>) => Promise<ReturnType<MixedOperations['Evaluation'][T]>['responseType'] | false>;
  Export: <T extends keyof MixedOperations['Export']>(path: T, ...params: Parameters<MixedOperations['Export'][T]>) => Promise<ReturnType<MixedOperations['Export'][T]>['responseType'] | false>;
  Report: <T extends keyof MixedOperations['Report']>(path: T, ...params: Parameters<MixedOperations['Report'][T]>) => Promise<ReturnType<MixedOperations['Report'][T]>['responseType'] | false>;
  Apac: <T extends keyof MixedOperations['Apac']>(path: T, ...params: Parameters<MixedOperations['Apac'][T]>) => Promise<ReturnType<MixedOperations['Apac'][T]>['responseType'] | false>;
  Import: <T extends keyof MixedOperations['Import']>(path: T, ...params: Parameters<MixedOperations['Import'][T]>) => Promise<ReturnType<MixedOperations['Import'][T]>['responseType'] | false>;
    Middleware: <T extends keyof MixedOperations['Middleware']>(path: T, ...params: Parameters<MixedOperations['Middleware'][T]>) => Promise<ReturnType<MixedOperations['Middleware'][T]>['responseType'] | false>;
}
interface UseCallFNtypes {
  EMS: <T extends keyof MixedOperations['EMS']>(path: T, ...params: Parameters<MixedOperations['EMS'][T]>) => UseQueryResult<ReturnType<MixedOperations['EMS'][T]>['responseType'], ErrorObject>;
  HPFDC: <T extends keyof MixedOperations['HPFDC']>(path: T, ...params: Parameters<MixedOperations['HPFDC'][T]>) => UseQueryResult<ReturnType<MixedOperations['HPFDC'][T]>['responseType'], ErrorObject>;
  EHR: <T extends keyof MixedOperations['EHR']>(path: T, ...params: Parameters<MixedOperations['EHR'][T]>) => UseQueryResult<ReturnType<MixedOperations['EHR'][T]>['responseType'], ErrorObject>;
  Audit: <T extends keyof MixedOperations['Audit']>(path: T, ...params: Parameters<MixedOperations['Audit'][T]>) => UseQueryResult<ReturnType<MixedOperations['Audit'][T]>['responseType'], ErrorObject>;
  Evaluation: <T extends keyof MixedOperations['Evaluation']>(path: T, ...params: Parameters<MixedOperations['Evaluation'][T]>) => UseQueryResult<ReturnType<MixedOperations['Evaluation'][T]>['responseType'], ErrorObject>;
  Export: <T extends keyof MixedOperations['Export']>(path: T, ...params: Parameters<MixedOperations['Export'][T]>) => UseQueryResult<ReturnType<MixedOperations['Export'][T]>['responseType'], ErrorObject>;
  Report: <T extends keyof MixedOperations['Report']>(path: T, ...params: Parameters<MixedOperations['Report'][T]>) => UseQueryResult<ReturnType<MixedOperations['Report'][T]>['responseType'], ErrorObject>;
  Apac: <T extends keyof MixedOperations['Apac']>(path: T, ...params: Parameters<MixedOperations['Apac'][T]>) => UseQueryResult<ReturnType<MixedOperations['Apac'][T]>['responseType'], ErrorObject>;
  Import: <T extends keyof MixedOperations['Import']>(path: T, ...params: Parameters<MixedOperations['Import'][T]>) => UseQueryResult<ReturnType<MixedOperations['Import'][T]>['responseType'], ErrorObject>;
    Middleware: <T extends keyof MixedOperations['Middleware']>(path: T, ...params: Parameters<MixedOperations['Middleware'][T]>) => UseQueryResult<ReturnType<MixedOperations['Middleware'][T]>['responseType'], ErrorObject>;
}

interface DownloadCallFNtypes {
  EMS: <T extends keyof MixedOperations['EMS']>(path: T, params: Parameters<MixedOperations['EMS'][T]>, downloadOptions: DownloadableOptions) => Promise<string | false>;
  HPFDC: <T extends keyof MixedOperations['HPFDC']>(path: T, params: Parameters<MixedOperations['HPFDC'][T]>, downloadOptions: DownloadableOptions) => Promise<string | false>;
  EHR: <T extends keyof MixedOperations['EHR']>(path: T, params: Parameters<MixedOperations['EHR'][T]>, downloadOptions: DownloadableOptions) => Promise<string | false>;
  Audit: <T extends keyof MixedOperations['Audit']>(path: T, params: Parameters<MixedOperations['Audit'][T]>, downloadOptions: DownloadableOptions) => Promise<string | false>;
  Evaluation: <T extends keyof MixedOperations['Evaluation']>(path: T, params: Parameters<MixedOperations['Evaluation'][T]>, downloadOptions: DownloadableOptions) => Promise<string | false>;
  Export: <T extends keyof MixedOperations['Export']>(path: T, params: Parameters<MixedOperations['Export'][T]>, downloadOptions: DownloadableOptions) => Promise<string | false>;
  Report: <T extends keyof MixedOperations['Report']>(path: T, params: Parameters<MixedOperations['Report'][T]>, downloadOptions: DownloadableOptions) => Promise<string | false>;
  Apac: <T extends keyof MixedOperations['Apac']>(path: T, params: Parameters<MixedOperations['Apac'][T]>, downloadOptions: DownloadableOptions) => Promise<string | false>;
  Import: <T extends keyof MixedOperations['Import']>(path: T, params: Parameters<MixedOperations['Import'][T]>, downloadOptions: DownloadableOptions) => Promise<string | false>;
    Middleware: <T extends keyof MixedOperations['Middleware']>(path: T, params: Parameters<MixedOperations['Middleware'][T]>, downloadOptions: DownloadableOptions) => Promise<string | false>;
}

interface MutateCallFNtypes {
  EMS: <T extends keyof MixedOperations['EMS']>(path: T, mutationOptions?: UseMutationOptions<
    ReturnType<MixedOperations['EMS'][T]>['responseType'] | false,
    ErrorObject,
    Parameters<MixedOperations['EMS'][T]>
  >) => UseMutationResult<ReturnType<MixedOperations['EMS'][T]>['responseType'] | false, ErrorObject, Parameters<MixedOperations['EMS'][T]>>
  HPFDC: <T extends keyof MixedOperations['HPFDC']>(path: T, mutationOptions?: UseMutationOptions<
    ReturnType<MixedOperations['HPFDC'][T]>['responseType'] | false,
    ErrorObject,
    Parameters<MixedOperations['HPFDC'][T]>
  >) => UseMutationResult<ReturnType<MixedOperations['HPFDC'][T]>['responseType'] | false, ErrorObject, Parameters<MixedOperations['HPFDC'][T]>>
  EHR: <T extends keyof MixedOperations['EHR']>(path: T, mutationOptions?: UseMutationOptions<
    ReturnType<MixedOperations['EHR'][T]>['responseType'] | false,
    ErrorObject,
    Parameters<MixedOperations['EHR'][T]>
  >) => UseMutationResult<ReturnType<MixedOperations['EHR'][T]>['responseType'] | false, ErrorObject, Parameters<MixedOperations['EHR'][T]>>
  Audit: <T extends keyof MixedOperations['Audit']>(path: T, mutationOptions?: UseMutationOptions<
    ReturnType<MixedOperations['Audit'][T]>['responseType'] | false,
    ErrorObject,
    Parameters<MixedOperations['Audit'][T]>
  >) => UseMutationResult<ReturnType<MixedOperations['Audit'][T]>['responseType'] | false, ErrorObject, Parameters<MixedOperations['Audit'][T]>>
  Evaluation: <T extends keyof MixedOperations['Evaluation']>(path: T, mutationOptions?: UseMutationOptions<
    ReturnType<MixedOperations['Evaluation'][T]>['responseType'] | false,
    ErrorObject,
    Parameters<MixedOperations['Evaluation'][T]>
  >) => UseMutationResult<ReturnType<MixedOperations['Evaluation'][T]>['responseType'] | false, ErrorObject, Parameters<MixedOperations['Evaluation'][T]>>
  Export: <T extends keyof MixedOperations['Export']>(path: T, mutationOptions?: UseMutationOptions<
    ReturnType<MixedOperations['Export'][T]>['responseType'] | false,
    ErrorObject,
    Parameters<MixedOperations['Export'][T]>
  >) => UseMutationResult<ReturnType<MixedOperations['Export'][T]>['responseType'] | false, ErrorObject, Parameters<MixedOperations['Export'][T]>>
  Report: <T extends keyof MixedOperations['Report']>(path: T, mutationOptions?: UseMutationOptions<
    ReturnType<MixedOperations['Report'][T]>['responseType'] | false,
    ErrorObject,
    Parameters<MixedOperations['Report'][T]>
  >) => UseMutationResult<ReturnType<MixedOperations['Report'][T]>['responseType'] | false, ErrorObject, Parameters<MixedOperations['Report'][T]>>
  Apac: <T extends keyof MixedOperations['Apac']>(path: T, mutationOptions?: UseMutationOptions<
    ReturnType<MixedOperations['Apac'][T]>['responseType'] | false,
    ErrorObject,
    Parameters<MixedOperations['Apac'][T]>
  >) => UseMutationResult<ReturnType<MixedOperations['Apac'][T]>['responseType'] | false, ErrorObject, Parameters<MixedOperations['Apac'][T]>>
  Import: <T extends keyof MixedOperations['Import']>(path: T, mutationOptions?: UseMutationOptions<
    ReturnType<MixedOperations['Import'][T]>['responseType'] | false,
    ErrorObject,
    Parameters<MixedOperations['Import'][T]>
  >) => UseMutationResult<ReturnType<MixedOperations['Import'][T]>['responseType'] | false, ErrorObject, Parameters<MixedOperations['Import'][T]>>
    Middleware: <T extends keyof MixedOperations['Middleware']>(path: T, mutationOptions?: UseMutationOptions<
        ReturnType<MixedOperations['Middleware'][T]>['responseType'] | false,
        ErrorObject,
        Parameters<MixedOperations['Middleware'][T]>
    >) => UseMutationResult<ReturnType<MixedOperations['Middleware'][T]>['responseType'] | false, ErrorObject, Parameters<MixedOperations['Middleware'][T]>>
}
interface invalidateCallFNtypes {
  EMS: (queryKeys: (keyof MixedOperations['EMS'])[]) => void;
  HPFDC: (queryKeys: (keyof MixedOperations['HPFDC'])[]) => void;
  EHR: (queryKeys: (keyof MixedOperations['EHR'])[]) => void;
  Audit: (queryKeys: (keyof MixedOperations['Audit'])[]) => void;
  Evaluation: (queryKeys: (keyof MixedOperations['Evaluation'])[]) => void;
  Export: (queryKeys: (keyof MixedOperations['Export'])[]) => void;
  Report: (queryKeys: (keyof MixedOperations['Report'])[]) => void;
  Apac: (queryKeys: (keyof MixedOperations['Apac'])[]) => void;
  Import: (queryKeys: (keyof MixedOperations['Import'])[]) => void;
    Middleware: (queryKeys: (keyof MixedOperations['Middleware'])[]) => void;
}

/**
 * Context to call EMS API
 * @var {CallFNtype} call - call EMS methods directly with no caching or quering
 * @var {invalidateCall} invalidateCall - invalidate EMS methods cache
 * @var {useCall} useCall - call EMS methods with caching and quering
 * @var {mutateCall} mutateCall - call EMS methods with caching and quering
 */
interface MyselfStages {
  ems: ReturnType<MixedOperations['EMS']['myself_retrieve']>['responseType'];
  apac: ReturnType<MixedOperations['Apac']['myself_retrieve']>['responseType'];
}

export type Myselfs = {
  [P in keyof OperationToStageType]: MyselfStages[OperationToStageType[P]]; 
};
interface IEMSUseProvider<STG extends keyof MixedOperations> {
  myself?: Myselfs[STG];
  call: CallFNtypes[STG];
  invalidateCall: invalidateCallFNtypes[STG];
  useCall: UseCallFNtypes[STG];
  mutateCall: MutateCallFNtypes[STG];
  downloadCall: DownloadCallFNtypes[STG];
  callError?: ErrorObject;
  calLoading?: boolean;
  store: StageStoreData[OperationToStageType[STG]];
  setStore: (store: StageStoreData[OperationToStageType[STG]]) => void;
  mockData: (typeof mixedMockData)[STG];
}

interface IEMSContext {
  call: <STG extends keyof MixedOperations>(stage: STG, callLoading: boolean, setCallLoading: (CL: boolean) => void, callQueryConfig: UserRestQueriesConfig) => CallFNtypes[STG];
  callError?: ErrorObject;
  invalidateCall: <STG extends keyof MixedOperations>(stage: STG) => invalidateCallFNtypes[STG];
  useCall: <STG extends keyof MixedOperations>(stage: STG, callQueryConfig: UserRestQueriesConfig) => UseCallFNtypes[STG];
  mutateCall: <STG extends keyof MixedOperations>(stage: STG, callQueryConfig: UserRestQueriesConfig) => MutateCallFNtypes[STG];
  downloadCall: <STG extends keyof MixedOperations>(stage: STG, setCallLoading: (CL: boolean) => void) => DownloadCallFNtypes[STG];
  store: StageStoreData;
  setStore: (store: StageStoreData) => void;
}

type UserRestQueriesConfig = {
  useCallOptions?: UseQueryOptions
  useMockData?: boolean
};

export const useRestQueryContext = createContext(undefined as unknown as IEMSContext);
/**
 * methods to call EMS API
 * @returns {IEMSContext}
 * @example const { call, useCall, mutateCall } =useRestQueries('EMS');
 * 
 */
export const useRestQueries = <STG extends keyof MixedOperations>(stage: STG, config: UserRestQueriesConfig = {}): IEMSUseProvider<STG> => {
    const context = useContext(useRestQueryContext);
    if (context === undefined) {
        throw errorObject({
            title: 'error.build',
            message: 'error.outside_of_provider',
        });
    }
    const { data } = useSession();
    const [callLoading, setCallLoading] = useState<boolean>(false);
    const { call, useCall, invalidateCall, mutateCall, store, setStore, downloadCall } = context;
    const myselfCall = useCall((operationToMyself[stage] as any), {})('myself_retrieve');
    // possible fix to precheck stage on myself call, but needs more investigation
    // const myselfCall = useCall((operationToMyself[stage] as any), {})('myself_retrieve', data?.stages?.includes(operationToStage[stage]) ? undefined : {init:  undefined});

    const myself = useMemo(() =>  {
        if(!myselfCall.data || !data) return {};

        return {
            ...myselfCall?.data,
            groups: [
                ...myselfCall?.data?.groups,
                ...(data?.keycloakRoles || [])
            ]
        };
    }, [myselfCall.data, data?.keycloakRoles]);
    const setStoreInner = useCallback((storeData: StageStoreData[OperationToStageType[STG]]) => {
        const newStore = (store || {} as any);
        setStore({
            ...newStore, [operationToStage[stage]]: {
                ...newStore[operationToStage[stage]],
                ...storeData,
            }
        });
    }, [stage, store]);

    return {
        call: call(stage, callLoading, setCallLoading, config),
        useCall: useCall(stage, config),
        invalidateCall: invalidateCall(stage),
        mutateCall: mutateCall(stage, config),
        downloadCall: downloadCall(stage, setCallLoading),
        myself,
        callError: context.callError,
        calLoading: callLoading,
        store: ((store || {}) as any)[operationToStage[stage]],
        setStore: setStoreInner,
        mockData: mixedMockData[stage]
    };
};
const EMSQueryProvider = ({ children }) => {
    const [store, setStore] = useState<StageStoreData>({
        ems: {},
        apac: {},
    });
    const { restAPI } = useConfig();
    const session = useSession();
    const queryClient = useQueryClient();
    const [callError, setCallError] = useState<ErrorObject>(undefined);

    const axiosAPIs = useMemo(() => ({
        EMS: axios.create({
            baseURL: restAPI.emsAPI,
            paramsSerializer: {
                serialize: (params) => {
                    if (params) {
                        Object.keys(params).forEach(key => {
                            if (params[key] === undefined || (
                                Array.isArray(params[key]) && params[key].length === 0
                            )) delete params[key];
                        });
                    }
                    return new URLSearchParams(params).toString();
                },
            }
        }),
        HPFDC: axios.create({
            baseURL: restAPI.hpfdcAPI,
            paramsSerializer: {
                serialize: (params) => {
                    if (params) {
                        Object.keys(params).forEach(key => {
                            if (params[key] === undefined || (
                                Array.isArray(params[key]) && params[key].length === 0
                            )) delete params[key];
                        });
                    }
                    return new URLSearchParams(params).toString();
                },
            }
        }),
        EHR: axios.create({
            baseURL: restAPI.ehrAPI,
            paramsSerializer: {
                serialize: (params) => {
                    if (params) {
                        Object.keys(params).forEach(key => {
                            if (params[key] === undefined || (
                                Array.isArray(params[key]) && params[key].length === 0
                            )) delete params[key];
                        });
                    }
                    return new URLSearchParams(params).toString();
                },
            }
        }),
        Audit: axios.create({
            baseURL: restAPI.auditAPI,
            paramsSerializer: {
                serialize: (params) => {
                    if (params) {
                        Object.keys(params).forEach(key => {
                            if (params[key] === undefined || (
                                Array.isArray(params[key]) && params[key].length === 0
                            )) delete params[key];
                        });
                    }
                    return new URLSearchParams(params).toString();
                },
            }
        }),
        Evaluation: axios.create({
            baseURL: restAPI.evaluationAPI,
            paramsSerializer: {
                serialize: (params) => {
                    if (params) {
                        Object.keys(params).forEach(key => {
                            if (params[key] === undefined || (
                                Array.isArray(params[key]) && params[key].length === 0
                            )) delete params[key];
                        });
                    }
                    return new URLSearchParams(params).toString();
                },
            }
        }),
        Export: axios.create({
            baseURL: restAPI.exportAPI,
            paramsSerializer: {
                serialize: (params) => {
                    if (params) {
                        Object.keys(params).forEach(key => {
                            if (params[key] === undefined || (
                                Array.isArray(params[key]) && params[key].length === 0
                            )) delete params[key];
                        });
                    }
                    return new URLSearchParams(params).toString();
                },
            }
        }),
        Report: axios.create({
            baseURL: restAPI.reportAPI,
            paramsSerializer: {
                serialize: (params) => {
                    if (params) {
                        Object.keys(params).forEach(key => {
                            if (params[key] === undefined || (
                                Array.isArray(params[key]) && params[key].length === 0
                            )) delete params[key];
                        });
                    }
                    return new URLSearchParams(params).toString();
                },
            }
        }),
        Apac: axios.create({
            baseURL: restAPI.apacAPI,
            paramsSerializer: {
                serialize: (params) => {
                    if (params) {
                        Object.keys(params).forEach(key => {
                            if (params[key] === undefined || (
                                Array.isArray(params[key]) && params[key].length === 0
                            )) delete params[key];
                        });
                    }
                    return new URLSearchParams(params).toString();
                },
            }
        }),
        Import: axios.create({
            baseURL: restAPI.importAPI,
            paramsSerializer: {
                serialize: (params) => {
                    if (params) {
                        Object.keys(params).forEach(key => {
                            if (params[key] === undefined || (
                                Array.isArray(params[key]) && params[key].length === 0
                            )) delete params[key];
                        });
                    }
                    return new URLSearchParams(params).toString();
                },
            }
        }),
        Middleware: axios.create({
            baseURL: restAPI.middlewareAPI,
            paramsSerializer: {
                serialize: (params) => {
                    if (params) {
                        Object.keys(params).forEach(key => {
                            if (params[key] === undefined || (
                                Array.isArray(params[key]) && params[key].length === 0
                            )) delete params[key];
                        });
                    }
                    return new URLSearchParams(params).toString();
                },
            }
        }),
    }), [restAPI.emsAPI, restAPI.hpfdcAPI, restAPI.ehrAPI, restAPI.auditAPI, restAPI.evaluationAPI, restAPI.exportAPI]);

    useEffect(() => {
        window.sessionToken = session.data?.accessToken;
    }, [session.data?.accessToken]);

    /**
   * Direct call to EMS API without caching and querying.
   * @param {string} path - Path generated from the Swagger API.
   * @param {Record<string, string>} queryParams - Query parameters generated from the Swagger API related to the path.
   * @param {Record<string, any>} body - Body parameters generated from the Swagger API related to the path.
   * @returns {Promise<any>} - Response from the EMS API generated from the Swagger API.
   * @example
   * const response = await call('path', { queryParam: 'value' }, { bodyParam: 'value' });
   */
    const call = useCallback(<STG extends keyof MixedOperations = keyof MixedOperations>(stage: STG, callLoading: boolean, setCallLoading: (CL: boolean) => void): CallFNtypes[STG] => {
        const axiosAPI = axiosAPIs[stage];
        const operations = resOperations[stage] as RestOperationsEMS;
        const innerCall: CallFNtypes['EMS'] = async (path, ...params): Promise<Record<string, any> | false> => {
            const enabled = !(Object.keys(params[0] || {}).filter(key => params[0][key] === undefined).length > 0);
            const enabledToken = !operations[path] || !!window.sessionToken || !operations[path](...params as unknown as [any]).security || operations[path](...params as unknown as [any]).security.includes('');
            if (!enabled) {
                return false;
            }
                        setCallLoading(true);
            try {
                const response = await restInnerCall(operations[path](...params as unknown as [any]), axiosAPI, session.update);
                setCallError(undefined);
                setCallLoading(false);
                return response.data;
            } catch (e) {
                setCallError(e);
                setCallLoading(false);
                return false;
            }
        };
        return innerCall as CallFNtypes[STG];
    }, [session?.data?.accessToken]);
  
    /**
   * Direct call to EMS API without caching and querying that immediately download the content into file.
   * @param {string} path - Path generated from the Swagger API.
   * @param {Record<string, string>} queryParams - Query parameters generated from the Swagger API related to the path.
   * @param {Record<string, any>} body - Body parameters generated from the Swagger API related to the path.
   * @param {boolean} download - If true, the content is downloaded immediately.
   * @param {string} filename - Name of the file to download.
   * @returns {Promise<string>} - returns file as base64 string for future use.
   * @example
   * const response = await call('path', { queryParam: 'value' }, { bodyParam: 'value' });
   */
    const downloadCall = useCallback(<STG extends keyof MixedOperations = keyof MixedOperations>(stage: STG, setCallLoading: (CL: boolean) => void): DownloadCallFNtypes[STG] => {
        const axiosAPI = axiosAPIs[stage];
        const operations = resOperations[stage] as RestOperationsEMS;
        const innerCall: DownloadCallFNtypes['EMS'] = async (path, params, {download, filename, onSuccess, onError}): Promise<string | false> => {
            const enabled = !(Object.keys(params[0] || {}).filter(key => params[0][key] === undefined).length > 0);
            const enabledToken = !operations[path] || !!window.sessionToken || !operations[path](...params as unknown as [any]).security || operations[path](...params as unknown as [any]).security.includes('');
            if (!enabled) {
                return false;
            }
            setCallLoading(true);
            const requestContext = operations[path]?.(...params as unknown as [any]);
            try {
                const response = await restInnerCall(operations[path](...params as unknown as [any]), axiosAPI, session.update);
                setCallError(undefined);
                setCallLoading(false);
                if(download) downloadImmediately(response, filename);
                onSuccess?.();
                return Buffer.from(response.data, 'binary').toString('base64');
            } catch (e) {
                setCallError(e);
                setCallLoading(false);
                onError?.(errorObject(e, e?.response?.status, {
                        path: requestContext?.url,
                        params: requestContext?.params,
                        method: requestContext?.method,
                        name: requestContext?.name,
                        body: e?.response?.data,
                        data: encodeRestCall(requestContext?.data),
                        isAxiosError: true,
                        code: e.code,
                        message: e.message,
                        status: e.response?.status,    
                    }));
                return false;
            }
        };
        return innerCall as DownloadCallFNtypes[STG];
    }, [session?.data?.accessToken]);

    const invalidateCall = useCallback(<STG extends keyof MixedOperations = keyof MixedOperations>(stage: STG) => {
        const innerInvalidation: invalidateCallFNtypes['EMS'] = (async (queryKeys: string[]) => {
            const queriesToInvalidate = queryKeys.map(key => `${stage}_${key as string}`);
            return queryClient.invalidateQueries({
                predicate: (query) => {
                    if (Array.isArray(query.queryKey)) {
                        return query.queryKey.some(key => queriesToInvalidate.includes(key as string));
                    }
                    return queriesToInvalidate.includes(query.queryKey as string);
                    return false;
                },
            });
        });
        return innerInvalidation as invalidateCallFNtypes[STG];
    }, [session?.data?.accessToken]);

    const useCall = useCallback(<STG extends keyof MixedOperations = keyof MixedOperations>(stage: STG, { useCallOptions = {}, useMockData}: UserRestQueriesConfig) => {
        const axiosAPI = axiosAPIs[stage];
        if (session?.data?.accessToken && window.sessionToken !== session?.data?.accessToken) {
            window.sessionToken = session?.data?.accessToken;
        }

        const operations = resOperations[stage] as RestOperationsEMS;
        const callInner: UseCallFNtypes['EMS'] = (path, ...params) => {
            let initiationError: ErrorObject; 
            let enabled: boolean;
            let enabledToken: boolean;

            try {
                enabled = !(Object.keys(params[0] || {}).filter(key => params[0][key] === undefined).length > 0);
                enabledToken = !operations[path] || !!window.sessionToken || !operations[path](...params as unknown as [any]).security || operations[path](...params as unknown as [any]).security.includes('');
            } catch(e) {
                initiationError = errorObject(e);
                console.log(364, initiationError, params);
            }
            if (!enabled) {
                console.log(291, 'undefined fields', path, params[0], enabled, enabledToken);
            }
            return useQuery<any, ErrorObject>([`${stage}_${path as string}`, JSON.stringify(params[0])], async () => {
                if(initiationError !== undefined) throw initiationError;
                if (!operations[path]) throw errorObject({
                    title: 'error.network',
                    message: `Path ${path} is not defined in ${stage} operations`
                });
                
                if(useMockData) return operations[path](...params as unknown as [any]).responseMock;
                const response = await restInnerCall(operations[path](...params as unknown as [any]), axiosAPI, session.update);
                return response.data;
            }, { enabled: !!enabled && !!enabledToken, staleTime: 1000 * 60, refetchOnWindowFocus: false, ...useCallOptions });
        };
        return callInner as UseCallFNtypes[STG];
    }, [session?.data?.accessToken]);

    const getHeaders = (response: AxiosResponse, headers: string[]) => {
        const responseHeaders: Record<string, string> = {};
        const cleanHeaders = headers.map(header => header.toLowerCase());
        Object.keys(response?.headers).forEach(key => {
            if (cleanHeaders.includes(key.toLowerCase())) {
                responseHeaders[key] = response.headers[key];
            }
        });
        return responseHeaders;
    };

    const downloadImmediately = (response: AxiosResponse, filename?: string) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const contentDisposition = getHeaders(response, ['content-disposition'])['content-disposition'];

        if (!filename && contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
            if (fileNameMatch?.length > 1) {
                filename = fileNameMatch[1];
            }
        }
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    const mutateCall = useCallback(<STG extends keyof MixedOperations = keyof MixedOperations>(stage: STG) => {
        const axiosAPI = axiosAPIs[stage];
        const operations = resOperations[stage] as RestOperationsEMS;

        const callInner: MutateCallFNtypes['EMS'] = (path: string, mutationOptions: Record<string, any>) => {
            return useMutation(
                [path],
                async (props) => {
                    const response = await restInnerCall(operations[path](...props as unknown as [any]), axiosAPI, session.update);
                    return response.data;
                },
                {
                    ...mutationOptions,
                }
            );
        };
        return callInner as MutateCallFNtypes[STG];
    }, [session?.data?.accessToken, call]);

    return (
        <useRestQueryContext.Provider value={{ call, useCall, invalidateCall, mutateCall, callError, store, setStore, downloadCall }}>
            {children}
        </useRestQueryContext.Provider>
    );
};

export default EMSQueryProvider;