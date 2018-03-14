/**
 * Created by liangshuang on 18/3/13.
 */
import caseReducer from './caseReducer'

const myStateInfoData = {
    getStatementList: {
        pageNo: 1,
        count: 0,
        result: [],
        data:''
    },
}

function login(state, action) {
    console.log('action.response.pageInfo',action)
    return { ...state, getStatementList: action.response }
}


export default caseReducer(myStateInfoData, {
    LOGIN_SUCCESS: login,
})