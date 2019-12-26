import { queryDetails, queryEvents } from './service';

const Model = {
    namespace: 'orderdetails',
    state: {
        thisDetails: {},
        thisEvents: [],
    },
    effects: {
        *setDetails_e(action, { call, put, select }) {
            const { orders } = yield select();
            const res_details = yield call(queryDetails, orders.thisDetails);
            const res_events = yield call(queryEvents, orders.thisDetails);
            yield put({
                type: 'setDetails_r',
                payload: {
                    thisDetails: res_details.data.order,
                    thisEvents: res_events.data.events,
                }
            })
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