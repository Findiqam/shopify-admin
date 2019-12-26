import { queryDetails, queryEvents } from './service';

const Model = {
    namespace: 'abandonedcheckoutdetails',
    state: {
        thisDetails: {},
    },
    effects: {
        *setDetails_e(action, { call, put, select }) {
            const { abandonedcheckouts } = yield select();
            yield put({
                type: 'setDetails_r',
                payload: {
                    thisDetails: abandonedcheckouts.thisDetails,
                }
            });
        },
    },
    reducers: {
        setDetails_r(state, action) {
            return {
                ...state,
                ...action.payload,
            }
        },
    }
}
export default Model;

// line_items: [
//     {
//         title: '',
//         sku: '',
//         line_price: 0,
//         price: 0,

//     }
// ],
// name: '',
// total_price: '',
// subtotal_price: '',
// shipping_address: {
//     first_name: "",
//     address1: "",
//     phone: null,
//     city: "",
//     zip: "",
//     province: "",
//     country: "",
//     last_name: "",
// },
// customer: {
//     email: '',
//     first_name: '',
//     last_name: '',
//     orders_count: 0,
//     phone: '',
// },