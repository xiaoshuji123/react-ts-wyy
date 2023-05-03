import request from '../index';

interface Idata {
	data: any;
}

request
	.get<Idata>({
		url: '1111',
		data: {
			name: 1212
		}
	})
	.then((res) => {
		console.log(res.data);
	});
