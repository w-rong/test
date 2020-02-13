import axios from 'axios';
import qs from 'qs';

// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/dvt-web/' : 'http://127.0.0.1:5050';
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/dvt-web/' : 'http://47.96.94.56:8082/';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.interceptors.response.use(res => {
//     if (res.data.code !== 10000) {
//         throw new TypeError(res.data.msg || '未知错误')
//     }
//     return res.data.data
// }, error => {
//     throw new TypeError(error)
// })

// axios.interceptors.request.use(req => {
//     req.data = qs.stringify(req.data)
//     return req
// }, error => {
//     throw new TypeError(error)
// })


export default axios