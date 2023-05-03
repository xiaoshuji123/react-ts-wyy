import { AxiosRequestConfig, AxiosResponse } from 'axios';
export interface Iinterceptors<T> {
	requestSuccessCallback?: (value: any) => any;
	requestFailCallback?: (error: any) => any;
	responseSuccessCallback?: (res: T) => T;
	responseFailCallback?: (error: any) => any;
}

export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: Iinterceptors<T>;
}
