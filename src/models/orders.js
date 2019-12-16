import { queryAllOrders } from '@/services/shopify';

const OrdersModel = {
    namespace: 'orders',
    state: {
        ordersData:[]
    },
    effects:{
        *getAllOrders(action, { call, put }){
            const response = yield call(queryAllOrders);
            yield put({
                type:'setAllOrders',
                payload:response.orders
            })
        }
    },
    reducers:{
        setAllOrders(state, action){
            return {
                ...state,
                ordersData:action.payload
            }
        }
    }
}

export default OrdersModel;