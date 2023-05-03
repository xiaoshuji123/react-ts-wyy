import MyRequest from './request';

const BASEURL = '';
const TIMEOUT = 10000;

export default new MyRequest({
	baseURL: BASEURL,
	timeout: TIMEOUT
});
