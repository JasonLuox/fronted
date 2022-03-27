import Axios, {AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios'
import {IUnknowObject} from '@/typings'

const BASE_URL = 'http://127.0.0.1:4000'
// const BASE_URL = 'http://127.0.0.1:8000/api'
const TIME_OUT = 10 * 1000

interface IResponseError {
    code: number,
    result: boolean,
    message: string
}

interface IResponseData extends IUnknowObject {
    code: number;
    total?: number;
}

/**
 * 创建axios实例
 */
const instance = Axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
})

/**
 * 错误处理函数
 */
const errorHandle = (error): IResponseError => {
    const errorMsgHandler = (code, data) => {
        const msgMap = {
            400: data?.message || '400 error 请求无效',
            401: '401 error 登录失效，请重新登录！',
            403: '403 error 对不起，你没有访问权限！',
            404: '404 Not Found',
            500: data?.message || '500 error 后台错误，请联系管理员',
            502: data?.message || '502 error 平台环境异常'
        }
        return msgMap[code]
    }
    const { data, status, statusText } = error.response
    const msg = errorMsgHandler(status, data) || `${status} error ${data ? data.message : statusText}`
    alert(msg)
    return {
        code: status,
        result: false,
        message: msg
    }
}

/**
 * 获取token，根据项目中后台的传递方式调整。这里使用的是cookie传递
 * **/
const getToken = () => {
    const DEFAULT_X_CSRFTOKEN = 'NOTPROVIDED'
    const { cookie } = document
    if (!cookie) {
        return DEFAULT_X_CSRFTOKEN
    }
    // @ts-ignore
    const key = window.CSRF_COOKIE_NAME || 'csrftoken'
    const patten = new RegExp(`^${key}=[\S]*`, 'g')
    const values = cookie.split(';')
    const value = values.find((item) => patten.test(item.trim()))
    if (!value) return DEFAULT_X_CSRFTOKEN
    return decodeURIComponent(value.split('=')[1] || DEFAULT_X_CSRFTOKEN)
}

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers && (config.headers['X-csrfToken'] = getToken())
    return config
})

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data, status } = response
        if (String(status).indexOf('2') !== 0) {
            return {
                code: status,
                message: data.message || '请求异常，请刷新重试',
                result: false
            }
        }
        return response.data
    },
    (error: AxiosError) => {
        if (error.response) {
            errorHandle(error)
        } else {
            return Promise.reject(error)
        }
    }
)

const ajaxGet = (url: string, params?: any): Promise<IResponseData> => instance.get(url, { params })
const ajaxDelete = (url: string, params?: any): Promise<IResponseData> => instance.delete(url, { params })
const ajaxPost = (url: string, params: any, config?: AxiosRequestConfig): Promise<IResponseData> => instance.post(url, params, config)
const ajaxPut = (url: string, params: any, config?: AxiosRequestConfig): Promise<IResponseData> => instance.put(url, params, config)
const ajaxPatch = (url: string, params: any, config?: AxiosRequestConfig): Promise<IResponseData> => instance.patch(url, params, config)


export {
    ajaxGet,
    ajaxDelete,
    ajaxPost,
    ajaxPut,
    ajaxPatch
}

export default instance
