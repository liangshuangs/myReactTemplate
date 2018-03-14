/**
 * HTTP请求
 * @module http
 */
import 'whatwg-fetch'
import path from 'lodash/fp/path'
import set from 'lodash/set'

/**
 * @description 计算带参数的url
 * @param {String} url - 处理的url字符串
 * @param {Object} params - 拼接在url后的参数
 * @returns {String}
 */
function queryParams(url, params) {
    if (typeof params !== 'object') {
        return url
    }
    const query = Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&')
    return `${url}${url.indexOf('?') === -1 ? '?' : '&'}${query}`
}

// 解析
function parseFetch(response) {
    const type = response.headers.get('content-type')
    if (type.includes('application/json')) {
        return response.json()
    } else if (type.includes('application/octet-stream')) {
        return response
    } else if (type.includes('text/plain')) {
        return response.text()
    } else if (type.includes('arrayBuffer')) {
        return response.arrayBuffer()
    } else if (type.includes('multipart/form-data')) {
        return response.formData()
    }
    return response
}

/**
 * 全局http请求的基于fetch polyfill的whatwg-fetch库；
 * 第二级参数兼容fetch标准，请求参考下面see标示链接
 * @see {@link https://github.com/github/fetch#post-json}
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch}
 * @see {@link https://github.com/camsong/blog/issues/2}
 * @param {Object} config - 全局请求的配置设置参数
 * @param {String} config.prefixG - 全局设定的请求前缀
 * @param {Object} [config.versionG='v1.0.0'] - 全局默认默认请求版本号
 * @param {Object} callback - token的增删改方法
 * @param {Function} callback.getToken - 获取授权码相关参数token\refreshToken
 * @param {Function} callback.setToken - 设置授权码
 * @param {Function} callback.removeToken - 移除授权码
 * @param {Function} [callback.authRefused] - 授权不通过回调函数
 *
 * @param {String} url - 请求url[注意把前缀除开]
 * @param {Object} [options] - 对fetch标准options参数进行扩展, 单个请求的参数设置在options上
 * @param {String} [options.prefix] - API请求前缀
 * @param {String} [options.version] - API请求版本号
 * @param {Object} [options.params] - url上的query参数
 * @param {Boolean} [options.notWithToken=false] - 是否不附带token认证
 * @param {Number} [options.timeout] - 超时处理，单位ms；
 *
 * @returns {Function(String, Object): *|Promise.<TResult>} - 请求返回处理的promise对象
 * @version v0.01
 */
const invokeApi = ({
                       prefixG,
                       versionG = '',
                   }) => (url, options = {}, type) => {
    if (!prefixG) {
        throw new Error('请设置全局统一网关，即请求前缀')
    }
    const { params, version, prefix, notWithToken, ...opt } = options

    const prefixUrl = `${prefix || prefixG}${version || versionG}`
    const uri = queryParams(`${prefixUrl}${url}`, params)

    // 仅仅对全局最常用的JSON格式的Request数据进行类型矫正为String、其他类型转换后放Body上
    if (path(['headers', 'Content-Type'], opt) === 'application/json' && options.body) {
        opt.body = JSON.stringify(options.body)
    }

    const fetchPromise = async () => {
        try {
            const res = await fetch(uri, opt)
            return res.ok ? {resultCode:'000000',data:'ok'} : Promise.reject(res)
            return res.ok ? parseFetch(res) : Promise.reject(res)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    if (options.timeout) {
        const abortPromise = new Promise((resolve, reject) => {
            setTimeout(() => { reject(new Error('请求超时')) }, options.timeout)
        })
        return Promise.race([fetchPromise(), abortPromise])
    }
    return fetchPromise()
}

/** invokeApi */
export default invokeApi
