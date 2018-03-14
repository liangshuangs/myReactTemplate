/**
 * Created by liangshuang on 18/3/13.
 */
import { httpApi } from '../http/reduxRequestMiddleware'
// eslint-disable-next-line import/prefer-default-export
// 查询接口
export function login(queryParam) {
    return {
        [httpApi]: {
            url: '/posts',
            options: {
                method: 'POST',
                body: {
                    title: 'foo',
                    body: 'bar',
                    userId: 1}
            },
            types: ['LOGIN_SUCCESS'],
        },
    }
}