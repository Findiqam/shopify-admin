import { queryAllCustomers } from '@/services/shopify';

const CustomersModel = {
    namespace: 'customers',
    state: {
        allCustomers:[]
    },
    effects:{
        *getAllCustomers(action, { call, put }){
            const response = yield call(queryAllCustomers);
            yield put({
                type:'setAllCustomers',
                payload:response.customers
            })
        }
    },
    reducers:{
        setAllCustomers(state, action){
            return {
                ...state,
                allCustomers:action.payload
            }
        }
    }
}

export default CustomersModel;