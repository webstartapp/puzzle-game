import { RESTRequestType } from '@/types/RestAPIGenerator/RESTRequestType';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { encodeRestCall } from './RestCallEncoding';
import { errorObject } from './wrapRestCalls';

export const restInnerCall = async (
  requestContext: Partial<RESTRequestType>,
  axiosAPI: AxiosInstance,
  token?: string,
) => {
  const request = {
    ...requestContext,
    headers: {
      'Content-Type': requestContext.requestContentType || 'application/json',
      ...requestContext.headers,
    },
  } as Required<AxiosRequestConfig>;

  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await axiosAPI(request);
    return response;
  } catch (e: any) {
    throw errorObject({
      title: 'error.unauthorized',
      message: 'error.unauthorized_message',
      APIError: {
        path: requestContext?.url,
        params: requestContext?.params,
        method: requestContext?.method,
        name: requestContext?.name,
        data: Buffer.from(JSON.stringify(requestContext.data || {})).toString(
          'base64',
        ),
        body: e?.response?.data,
        isAxiosError: true,
        code: e.code,
        message: e.message,
        status: e.response?.status,
      },
    });
  }
};
