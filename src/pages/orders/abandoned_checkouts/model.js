import { getPagesUrlByLink } from './util';
import { queryTableData, queryTableDataPage } from './service';

const initialFilter = { //初始filter
    created_at_min: "",
    created_at_max: "",
    updated_at_min: "",
    updated_at_max: "",
    status: 'any',
};
const initialState = {
    tableData: [],
    filter: initialFilter,
    limit: 5,
    nowPage: 1,
    previous: '',
    next: '',
    thisDetails:"",
}
const Model = {
    namespace: 'abandonedcheckouts',
    state: initialState,
    effects: {
        *setTableData_e(action, { call, put, select }) { //根据filter筛选drafts并返回数据
            const { abandonedcheckouts } = yield select();
            let parameters = "?";
            if (abandonedcheckouts.filter.created_at_min !== "") {
                parameters = parameters + "created_at_min=" + abandonedcheckouts.filter.created_at_min + "&";
            }
            if (abandonedcheckouts.filter.created_at_max !== "") {
                parameters = parameters + "created_at_max=" + abandonedcheckouts.filter.created_at_max + "&";
            }
            if (abandonedcheckouts.filter.updated_at_min !== "") {
                parameters = parameters + "updated_at_min=" + abandonedcheckouts.filter.updated_at_min + "&";
            }
            if (abandonedcheckouts.filter.updated_at_max !== "") {
                parameters = parameters + "updated_at_max=" + abandonedcheckouts.filter.updated_at_max + "&";
            }
            if (abandonedcheckouts.filter.status !== "") {
                parameters = parameters + "status=" + abandonedcheckouts.filter.status + "&";
            }

            if (abandonedcheckouts.limit !== 0) {
                parameters = parameters + "limit=" + abandonedcheckouts.limit;
            }

            const res_tabledata = yield call(queryTableData, parameters);

            let pagesUrl = { previous: '', next: '' };

            if (res_tabledata.headers['link']) { //如果响应头有link，获取并处理返回previous和next
                pagesUrl = getPagesUrlByLink(res_tabledata.headers['link']);
            }
            yield put({
                type: 'setTableData_r',
                payload: {
                    tableData: res_tabledata.data.checkouts,
                    nowPage: 1,
                    previous: pagesUrl.previous,
                    next: pagesUrl.next,
                }
            })
        },
        *setFilter_e(action, { call, put, select }) { //设置filter;action.payload={name,value}
            if (action.payload.name === "created_at_min" || action.payload.name === "created_at_max") { //如果传入的created_at相关，先重置一次created_at相关
                yield put({
                    type: 'resetFilterCreated_r',
                });
            }
            if (action.payload.name === "updated_at_min" || action.payload.name === "updated_at_max") { //如果传入的updated_at相关，先重置一次updated_at相关
                yield put({
                    type: 'resetFilterUpdated_r',
                });
            }

            yield put({
                type: 'setFilter_r',
                payload: action.payload
            });
        },
        *previousPage_e(action, { call, put, select }) { //获取上一页的abandoned checkout
            const { abandonedcheckouts } = yield select();
            const res_tabledata = yield call(queryTableDataPage, abandonedcheckouts.previous);
            let pagesUrl = { previous: '', next: '' };
            if (res_tabledata.headers['link']) {
                pagesUrl = getPagesUrlByLink(res_tabledata.headers['link']);
            }
            yield put({
                type: 'setTableData_r',
                payload: {
                    tableData: res_tabledata.data.checkouts,
                    nowPage: abandonedcheckouts.nowPage - 1,
                    previous: pagesUrl.previous,
                    next: pagesUrl.next,
                }
            })
        },
        *nextPage_e(action, { call, put, select }) { //获取下一页的abandoned checkout
            const { abandonedcheckouts } = yield select();
            const res_tabledata = yield call(queryTableDataPage, abandonedcheckouts.next);
            let pagesUrl = { previous: '', next: '' };
            if (res_tabledata.headers['link']) {
                pagesUrl = getPagesUrlByLink(res_tabledata.headers['link']);
            }
            yield put({
                type: 'setTableData_r',
                payload: {
                    tableData: res_tabledata.data.checkouts,
                    nowPage: abandonedcheckouts.nowPage + 1,
                    previous: pagesUrl.previous,
                    next: pagesUrl.next,
                }
            })
        },
        
    },
    reducers: {
        setTableData_r(state, action) { //设置state
            return {
                ...state,
                ...action.payload,
            }
        },
        setFilter_r(state, action) { //设置filter;action.payload={name,value}
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.name]: action.payload.value
                }
            }
        },
        resetFilter_r(state, action) { //重置filter
            return {
                ...state,
                filter: initialFilter,
            }
        },
        resetFilterCreated_r(state, action) { //重置filter.created_at_
            return {
                ...state,
                filter: {
                    ...state.filter,
                    created_at_min: "",
                    created_at_max: "",
                }
            }
        },
        resetFilterUpdated_r(state, action) { //重置filter.updated_at_
            return {
                ...state,
                filter: {
                    ...state.filter,
                    updated_at_min: "",
                    updated_at_max: "",
                }
            }
        },
        setLimit_r(state, action) { //设置每页获取的订单数
            return {
                ...state,
                limit: action.payload,
            }
        },
        setDetails_r(state, action){
            return {
                ...state,
                thisDetails: action.payload,
            }
        },
    }
}
export default Model;