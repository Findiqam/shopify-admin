import { queryDetails, queryEvents, queryImages } from './service';

const Model = {
    namespace: 'abandonedcheckoutdetails',
    state: {
        thisDetails: "",
        productsImages: "",
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
            let productsImages = {};
            let res_Images;
            for (let item of abandonedcheckouts.thisDetails.line_items.values()) {
                res_Images = yield call(queryImages, item.product_id);
                for (let image of res_Images.data.images) {
                    if (image.variant_ids.includes(item.variant_id)) {
                        productsImages = {
                            ...productsImages,
                            [item.product_id + 'v' + item.variant_id]: image.src,
                        }
                    }
                }
            }
            yield put({
                type: 'setDetails_r',
                payload: {
                    productsImages: productsImages,
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