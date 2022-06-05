import Axios, {
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
    AxiosInstance
} from 'axios'

let controllers: AbortController[] = []

const BASE_URL = 'http://127.0.0.1:4000/api'
const TIME_OUT = 20 * 1000

interface IResponseError {
    code: number,
    result: boolean,
    message: string
}

/**
 * 创建axios实例
 */
const instance: AxiosInstance = Axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
    // withCredentials: true
})

/**
 * 错误处理函数
 */
const errorMsgHandler = (code, data): string | undefined => {
    const { message } = data
    const msgMap = {
        400: message || '400 error 请求无效',
        401: '401 error 登录失效，请重新登录！',
        403: '403 error 对不起，你没有访问权限！',
        404: '404 Not Found',
        500: message || '500 error 后台错误，请联系管理员',
        502: '502 error 平台环境异常'
    }
    return msgMap[code]
}

const errorHandle = (error): IResponseError => {
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
const getToken = (): string => {
    const DEFAULT_X_CSRFTOKEN = 'NOT_PROVIDED'
    const { cookie } = document
    if (!cookie) return DEFAULT_X_CSRFTOKEN
    // @ts-ignore
    const key = window.CSRF_COOKIE_NAME || 'csrftoken'
    const patten = new RegExp(`^${key}=[\S]*`, 'g')
    const value = cookie.split(';')?.find((item) => patten.test(item.trim()))
    if (!value) return DEFAULT_X_CSRFTOKEN
    return decodeURIComponent(value.split('=')[1] || DEFAULT_X_CSRFTOKEN)
}

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers && (config.headers['X-csrfToken'] = getToken())
    const controller = new AbortController()
    config.signal = controller.signal
    controllers.push(controller)
    return config
})

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data, status } = response
        const { result, message } = data
        // 请求正常时，仅返回需要用到的 data 信息即可
        if (result)	return data
        // 1、对于一些请求正常，但后台处理失败的内容进行拦截，返回对应错误信息
        alert(message || '请求异常，请刷新重试')
        return {
            code: status,
            message: message || '请求异常，请刷新重试',
            result: false
        }
    },
    (error: AxiosError) => {
        return error.response ? errorHandle(error) : Promise.reject(error)
    }
)

export const cancelRequest = () => {
    controllers.forEach(controller => {
        controller.abort()
    })
    controllers = []
}

const ajaxGet = (url: string, params?: any): Promise<AxiosResponse> => instance.get(url, { params })
const ajaxDelete = (url: string, params?: any): Promise<AxiosResponse> => instance.delete(url, { params })
const ajaxPost = (url: string, params: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => instance.post(url, params, config)
const ajaxPut = (url: string, params: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => instance.put(url, params, config)
const ajaxPatch = (url: string, params: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => instance.patch(url, params, config)


export {
    ajaxGet,
    ajaxDelete,
    ajaxPost,
    ajaxPut,
    ajaxPatch
}

// export default instance
