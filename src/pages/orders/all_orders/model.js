import { queryTableData, getListCount, queryTableDataPage } from './service';
import { getPagesUrlByLink } from './util';

const initialFilter = { //初始filter
    name: '',
    created_at_min: "",
    created_at_max: "",
    updated_at_min: "",
    updated_at_max: "",
    status: 'any',
    financial_status: [],
    fulfillment_status: [],
};
const initialSort = { //初始sort
    order: '',
    sort: '',
}
const initialState = { //初始state
    tableData: [],
    filter: initialFilter,
    sort: initialSort,
    limit: 5,
    listCount: 0,
    pageCount: 1,
    nowPage: 1,
    previous: '',
    next: '',
    thisDetails:'',
}
const Model = { //orders model
    namespace: 'orders',
    state: initialState,
    effects: {
        *setTableData_e(action, { call, put, select }) {  //根据filter筛选orders并返回数据
            const { orders } = yield select();
            let parameters = "?";
            if (orders.filter.name !== "") {
                parameters = parameters + "name=" + orders.filter.name + "&";
            }
            if (orders.filter.created_at_min !== "") {
                parameters = parameters + "created_at_min=" + orders.filter.created_at_min + "&";
            }
            if (orders.filter.created_at_max !== "") {
                parameters = parameters + "created_at_max=" + orders.filter.created_at_max + "&";
            }
            if (orders.filter.updated_at_min !== "") {
                parameters = parameters + "updated_at_min=" + orders.filter.updated_at_min + "&";
            }
            if (orders.filter.updated_at_max !== "") {
                parameters = parameters + "updated_at_max=" + orders.filter.updated_at_max + "&";
            }
            if (orders.filter.status !== "") {
                parameters = parameters + "status=" + orders.filter.status + "&";
            }
            if (orders.filter.financial_status.length !== 0) {
                parameters = parameters + "financial_status=" + orders.filter.financial_status + "&";
            }
            if (orders.filter.fulfillment_status.length !== 0) {
                parameters = parameters + "fulfillment_status=" + orders.filter.fulfillment_status + "&";
            }

            const res_listCount = yield call(getListCount, parameters); //获取在该filter下的orders总数响应

            if (orders.sort.order !== "") {
                parameters = parameters + "order=" + orders.sort.order + " " + orders.sort.sort + "&";
            }

            if (orders.limit !== 0) {
                parameters = parameters + "limit=" + orders.limit;
            }

            const res_tabledata = yield call(queryTableData, parameters); //获取在该filter下的orders响应

            let pagesUrl = { previous: '', next: '' };

            if (res_tabledata.headers['link']) { //如果响应头有link，获取并处理返回previous和next
                pagesUrl = getPagesUrlByLink(res_tabledata.headers['link']);
            }
            yield put({ //设置在该filter下的state
                type: 'setTableData_r',
                payload: {
                    tableData: res_tabledata.data.orders,
                    listCount: res_listCount.data.count,
                    pageCount: parseInt(res_listCount.data.count / 10 + 1),
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
        *previousPage_e(action, { call, put, select }) { //获取上一页的orders
            const { orders } = yield select();
            const res_tabledata = yield call(queryTableDataPage, orders.previous);
            let pagesUrl = { previous: '', next: '' };
            if (res_tabledata.headers['link']) {
                pagesUrl = getPagesUrlByLink(res_tabledata.headers['link']);
            }
            yield put({
                type: 'setTableData_r',
                payload: {
                    tableData: res_tabledata.data.orders,
                    nowPage: orders.nowPage - 1,
                    previous: pagesUrl.previous,
                    next: pagesUrl.next,
                }
            })
        },
        *nextPage_e(action, { call, put, select }) { //获取下一页的orders
            const { orders } = yield select();
            const res_tabledata = yield call(queryTableDataPage, orders.next);
            let pagesUrl = { previous: '', next: '' };
            if (res_tabledata.headers['link']) {
                pagesUrl = getPagesUrlByLink(res_tabledata.headers['link']);
            }
            yield put({
                type: 'setTableData_r',
                payload: {
                    tableData: res_tabledata.data.orders,
                    nowPage: orders.nowPage + 1,
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
        setSort_r(state, action) { //设置排序;action.payload={order,sort}
            return {
                ...state,
                sort: {
                    order: action.payload.order,
                    sort: action.payload.sort,
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