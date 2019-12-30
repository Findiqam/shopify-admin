import { queryDetails, queryEvents } from './service';

const Model = {
    namespace: 'orderdetails',
    state: {
        thisDetails: '',
        thisEvents: [],
        unfulfilled: [],
        fulfilled: [],
        note: '',
        customer: null,
        contact_information: null,
        shipping_address: null,
        billing_address: null,
    },
    effects: {
        *setDetails_e(action, { call, put, select }) {
            const { orders } = yield select();
            if (orders.thisDetails !== '') {
                const [res_details, res_events] = yield [
                    call(queryDetails, orders.thisDetails),
                    call(queryEvents, orders.thisDetails),
                ];
                yield put({
                    type: 'setDetails_r',
                    payload: {
                        thisDetails: res_details.data.order,
                        thisEvents: res_events.data.events,
                        unfulfilled: res_details.data.order.line_items.filter((item) => (item.fulfillment_status === null)),
                        fulfilled: res_details.data.order.line_items.filter((item) => (item.fulfillment_status === 'fulfilled')),
                        note: res_details.data.order.note,
                        customer: res_details.data.order.customer,
                        contact_information: {
                            email: res_details.data.order.email,
                            phone: res_details.data.order.phone,
                        },
                        shipping_address: res_details.data.order.shipping_address ? res_details.data.order.shipping_address : null,
                        billing_address: res_details.data.order.billing_address ? res_details.data.order.billing_address : null,
                    }
                })
            }
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