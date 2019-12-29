import { getPagesUrlByLink } from './util';
import { queryTableData, queryTableDataPage } from './service';
const initialFilter = { //初始filter
    updated_at_min: "",
    updated_at_max: "",
    status: 'open',
};
const initialState = {
    tableData: [],
    filter: initialFilter,
    limit: 5,
    nowPage: 1,
    previous: '',
    next: '',
    thisDetails:'',
}
const Model = {
    namespace: 'drafts',
    state: initialState,
    effects: {
        *setTableData_e(action, { call, put, select }) { //根据filter筛选drafts并返回数据
            const { drafts } = yield select();
            let parameters = "?";
            if (drafts.filter.updated_at_min !== "") {
                parameters = parameters + "updated_at_min=" + drafts.filter.updated_at_min + "&";
            }
            if (drafts.filter.updated_at_max !== "") {
                parameters = parameters + "updated_at_max=" + drafts.filter.updated_at_max + "&";
            }
            if (drafts.filter.status !== "") {
                parameters = parameters + "status=" + drafts.filter.status + "&";
            }

            if (drafts.limit !== 0) {
                parameters = parameters + "limit=" + drafts.limit;
            }

            const res_tableData = yield call(queryTableData, parameters);

            let pagesUrl = { previous: '', next: '' };

            if (res_tableData.headers['link']) { //如果响应头有link，获取并处理返回previous和next
                pagesUrl = getPagesUrlByLink(res_tableData.headers['link']);
            }
            yield put({
                type: 'setTableData_r',
                payload: {
                    tableData: res_tableData.data.draft_orders,
                    nowPage: 1,
                    previous: pagesUrl.previous,
                    next: pagesUrl.next,
                }
            })
        },
        *setFilter_e(action, { call, put, select }) { //设置filter;action.payload={name,value}
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
        *previousPage_e(action, { call, put, select }) { //获取上一页的draft_orders
            const { drafts } = yield select();
            const res_tableData = yield call(queryTableDataPage, drafts.previous);
            let pagesUrl = { previous: '', next: '' };
            if (res_tableData.headers['link']) {
                pagesUrl = getPagesUrlByLink(res_tableData.headers['link']);
            }
            yield put({
                type: 'setTableData_r',
                payload: {
                    tableData: res_tableData.data.draft_orders,
                    nowPage: drafts.nowPage - 1,
                    previous: pagesUrl.previous,
                    next: pagesUrl.next,
                }
            })
        },
        *nextPage_e(action, { call, put, select }) { //获取下一页的orders
            const { drafts } = yield select();
            const res_tableData = yield call(queryTableDataPage, drafts.next);
            let pagesUrl = { previous: '', next: '' };
            if (res_tableData.headers['link']) {
                pagesUrl = getPagesUrlByLink(res_tableData.headers['link']);
            }
            yield put({
                type: 'setTableData_r',
                payload: {
                    tableData: res_tableData.data.draft_orders,
                    nowPage: drafts.nowPage + 1,
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
    },
}
export default Model;