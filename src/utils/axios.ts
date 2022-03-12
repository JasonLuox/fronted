import Axios, {AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios'

const BASE_URL = 'http://localhost:4000/'
const TIME_OUT = 10 * 1000

/**
 * 创建axios实例
 */
const instance = Axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
})

const errorHandle = (status: number, error): void => {
    // HTTP状态码判断
    switch (status) {
        case 401:
            return alert(`Error Code: ${status}, Message: ${error.msg || '登录失效，请重新登录'}`)
        case 403:
            return alert(`Error Code: ${status}, Message: ${error.msg || '你没有访问权限'}`)
        case 500:
            return alert(`Error Code: ${status}, Message: ${error.msg || '后台错误，请联系管理员'}`)
        case 502:
            return alert(`Error Code: ${status}, Message: ${error.msg || '平台环境异常'}`)
        default:
            alert(`Error Code: ${status}, Message: ${error.msg || '未知错误，请刷新重试'}`)

    }
}

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
    (response) =>
        /** * 根据你的项目实际情况来对 config 做处理 * 这里对 config 不做任何处理，直接返回 */
        response,
    (error) => Promise.reject(error)
)

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
    (res: AxiosResponse) => {
        if (String(res.status).indexOf('2') !== 0) {
            return {
                code: res.status,
                message: res.data.message || '请求异常，请刷新重试',
                result: false
            }
        }
        return Promise.reject(res.data)
    },
    (error: AxiosError) => {
        if (error && error.response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(error.response.status, error.response)
            return Promise.reject(error.response)
        }
        return Promise.reject(error)
    }
)

const getPromise = (method, url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance[method](url)(params, config).catch(e => e.response.data)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

const get = (url: string, params?: any) => getPromise('get', url, { params })
const post = (url: string, params: any, config?: AxiosRequestConfig) => getPromise('post', url, params, config)

export {
    get,
    post,
}

export default instance
