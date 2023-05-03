import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { MyRequestConfig } from './type';

class MyRequest {
	instance: AxiosInstance;
	constructor(config: MyRequestConfig) {
		this.instance = axios.create(config);
		/* 全局拦截器 */
		this.instance.interceptors.request.use(
			(config) => {
				return config;
			},
			(error) => {
				console.log(error);
			}
		);

		this.instance.interceptors.response.use(
			(res) => {
				return res.data;
			},
			(error) => {
				console.log(error);
			}
		);

		/* 实例拦截器 */
		this.instance.interceptors.request.use(
			config.interceptors?.requestSuccessCallback,
			config.interceptors?.requestFailCallback
		);
		this.instance.interceptors.response.use(
			config.interceptors?.responseSuccessCallback,
			config.interceptors?.responseFailCallback
		);
	}

	request<T = any>(config: MyRequestConfig<T>) {
		/*
		 * 1. new Promise<T>这里加泛型是因为想获取到一个具体的数据类型, 当.then(res)时，res就是具体的数据类型
		 * 2. .request<any, T>加泛型，当拦截器处理数据时，可能AxiosResponse里的数据很多，但只有data里的数据是我们想要的，这时我们会在这里
		 * 处理一下，只获取到data的数据，但是这样的话，它的数据类型即改变了，不在是AxiosResponse类型了，应该是一
		 * 个具体的数据类型了，跟上面的1中的数据类型一致
		 */
		return new Promise<T>((resolce, reject) => {
			/* 单个请求的拦截器 */
			if (config.interceptors?.requestSuccessCallback) {
				config = config.interceptors.requestSuccessCallback(config);
			}
			this.instance
				.request<any, T>(config)
				.then((res) => {
					if (config.interceptors?.responseSuccessCallback) {
						res = config.interceptors.responseSuccessCallback(res);
					}
					resolce(res);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	get<T = any>(config: MyRequestConfig<T>) {
		return this.request({ ...config, method: 'GET' });
	}

	post<T = any>(config: MyRequestConfig<T>) {
		return this.request({ ...config, method: 'POST' });
	}
}

export default MyRequest;
