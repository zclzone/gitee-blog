import axios from 'axios'

const service = axios.create({
  // baseURL: 'http://47.113.180.205:3000/',
  baseURL: 'http://api.qszone.com/',
  // baseURL: 'http://localhost:3000/',
  timeout: 10000,
  withCredentials: false
})

service.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      const url = config.url
      url.indexOf('?') === -1 ? config.url = url + '?_=' + (new Date().getTime()) : config.url = url + '&_=' + (new Date().getTime())
    }
    return config
  },
  err => Promise.reject(err)
)

service.interceptors.response.use(
  response => response,
  err => Promise.reject(err)
)

export default service