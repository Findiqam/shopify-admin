import { queryOrders, getOrdersCount } from '@/services/shopify';
import { getPagesUrlByLink } from '@/services/shopfiyUtils';
const initialFilter = {
    name: '',
    limit: 10,
    created_at_min: "",
    created_at_max: "",
    updated_at_min: "",
    updated_at_max: "",
    status: 'any',
    financial_status: [],
    fulfillment_status: [],
};
const initialSort = {
    order: '',
    sort: '',
}
const OrdersModel = {
    namespace: 'orders',
    state: {
        ordersData: [],
        filter: initialFilter,
        sort: initialSort,
        ordersCount:0,
        pageCount: 0,
        nowPage: 0,
        previous: '',
        next: '',
    },
    effects: {
        *getOrders(action, { call, put, select }) {
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

            const res_orders_count = yield call(getOrdersCount, parameters);

            if (orders.sort.order !== "") {
                parameters = parameters + "order=" + orders.sort.order + " " + orders.sort.sort + "&";
            }
            if(orders.filter.limit!==0){
                parameters = parameters + "limit=" + orders.filter.limit;
            }
            
            const res_orders = yield call(queryOrders, parameters);

            let pagesUrl={previous:'',next:''};

            if(res_orders.headers['link']){
                pagesUrl = getPagesUrlByLink(res_orders.headers['link']);
            }
            yield put({
                type: 'setOrders',
                payload: {
                    ordersData: res_orders.data.orders,
                    ordersCount:res_orders_count.data.count,
                    pageCount: parseInt(res_orders_count.data.count/10+1),
                    nowPage: 1,
                    previous: pagesUrl.previous,
                    next: pagesUrl.next,
                }
            })
        },
        *getFilter(action, { call, put, select }) {
            yield put({
                type: 'setFilter',
                payload: action.payload
            });
            yield put({
                type: 'orders/getOrders'
            })
        }
    },
    reducers: {
        setOrders(state, action) {
            return {
                ...state,
                ...action.payload,
            }
        },
        setFilter(state, action) {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.name]: action.payload.value
                }
            }
        }
    }
}

export default OrdersModel;