import { queryDetails, queryEvents, queryImages } from './service';

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
                let line_items = res_details.data.order.line_items.map((item) => {
                    return {
                        id: item.variant_id,
                        variant_id: item.variant_id,
                        product_id: item.product_id,
                        title: item.title,
                        variant_title: item.variant_title,
                        sku: item.sku,
                        price: item.price,
                        quantity: item.quantity,
                        fulfillment_status: item.fulfillment_status,
                        image_src: '',
                    }
                });
                yield put({
                    type: 'setDetails_r',
                    payload: {
                        thisDetails: res_details.data.order,
                        thisEvents: res_events.data.events,
                        unfulfilled: line_items.filter((item) => (item.fulfillment_status === null)),
                        fulfilled: line_items.filter((item) => (item.fulfillment_status === 'fulfilled')),
                        note: res_details.data.order.note,
                        customer: res_details.data.order.customer,
                        contact_information: {
                            email: res_details.data.order.email,
                            phone: res_details.data.order.phone,
                        },
                        shipping_address: res_details.data.order.shipping_address ? res_details.data.order.shipping_address : null,
                        billing_address: res_details.data.order.billing_address ? res_details.data.order.billing_address : null,
                    }
                });
                let productsImages = {};
                let res_Images;
                for (let item of res_details.data.order.line_items.values()) {
                    res_Images = yield call(queryImages, item.product_id);
                    productsImages = {
                        ...productsImages,
                        [item.product_id + 'v' + item.variant_id]: res_Images.data.images[0].src,
                    }
                    for (let image of res_Images.data.images) {
                        if (image.variant_ids.includes(item.variant_id)) {
                            productsImages = {
                                ...productsImages,
                                [item.product_id + 'v' + item.variant_id]: image.src,
                            }
                        }
                    }
                }
                line_items = line_items.map((item) => {
                    return {
                        ...item,
                        image_src: productsImages[item.product_id + 'v' + item.id],
                    }
                });
                yield put({
                    type: 'setDetails_r',
                    payload: {
                        unfulfilled: line_items.filter((item) => (item.fulfillment_status === null)),
                        fulfilled: line_items.filter((item) => (item.fulfillment_status === 'fulfilled')),
                    }
                });
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