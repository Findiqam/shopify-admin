import { queryCustomers, createCustomer, updateDraftOrder, queryProducts, queryDetails, queryImages, deleteDraftOrder } from './service';

const initial_customers = {
    first_name: "",
    last_name: "",
    email: '',
    company: '',
    phone: '',
    address1: "",
    city: "",
    country: "",
    province: "",
    zip: ""
}
const initial_shipping_address = {
    first_name: "",
    last_name: "",
    company: '',
    phone: '',
    address1: "",
    city: "",
    country: "",
    province: "",
    zip: ""
}
const initial_billing_address = {
    first_name: "",
    last_name: "",
    company: '',
    phone: '',
    address1: "",
    city: "",
    country: "",
    province: "",
    zip: ""
}

const Model = {
    namespace: 'draftorderdetails',
    state: {
        thisDetails: '',
        customers: [],
        products: [],
        customer: '',
        shipping_address: initial_shipping_address,
        billing_address: initial_billing_address,
        line_items: [],
        note: '',
    },
    effects: {
        *setDetails_e(action, { call, put, select }) {
            const { drafts } = yield select();
            if (drafts.thisDetails === '') {
                return
            }
            const res_details = yield call(queryDetails, drafts.thisDetails);
            let line_items = res_details.data.draft_order.line_items.map((item) => {
                return {
                    id: item.variant_id,
                    product_id: item.product_id,
                    title: item.variant_title,
                    sku: item.sku,
                    price: item.price,
                    inventory_quantity: 1,
                    product_title: item.title,
                    image_src: '',
                    quantity: item.quantity,
                }
            });
            if (res_details.data.draft_order.customer === null) {
                yield put({
                    type: 'setDetails_r',
                    payload: {
                        thisDetails: res_details.data.draft_order,
                        line_items: line_items,
                        note: res_details.data.draft_order.note,
                    }
                })
            } else {
                yield put({
                    type: 'setDetails_r',
                    payload: {
                        thisDetails: res_details.data.draft_order,
                        customer: res_details.data.draft_order.customer,
                        shipping_address: res_details.data.draft_order.shipping_address,
                        billing_address: res_details.data.draft_order.billing_address ? res_details.data.draft_order.billing_address : initial_billing_address,
                        line_items: line_items,
                        note: res_details.data.draft_order.note,
                    }
                })
            }
            let productsImages = {};
            let res_Images;
            for (let item of res_details.data.draft_order.line_items.values()) {
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
            console.log(line_items)
            yield put({
                type: 'setDetails_r',
                payload: {
                    line_items: line_items,
                }
            })
        },
        *setCustomers_e(action, { call, put, select }) {
            const res_customers = yield call(queryCustomers);
            yield put({
                type: 'setCustomers_r',
                payload: res_customers.data.customers,
            })
        },
        *setProducts_e(action, { call, put, select }) {
            const res_products = yield call(queryProducts);
            const products = res_products.data.products.map(
                (item) => {
                    const variants = item.variants.map(
                        (varItem) => {
                            if (varItem.image_id === null) {
                                return {
                                    id: varItem.id,
                                    product_id: varItem.product_id,
                                    title: varItem.title,
                                    sku: varItem.sku,
                                    price: varItem.price,
                                    inventory_quantity: varItem.inventory_quantity,
                                    product_title: item.title,
                                    image_src: item.image.src,
                                    quantity: 1,
                                }
                            } else {
                                return {
                                    id: varItem.id,
                                    product_id: varItem.product_id,
                                    title: varItem.title,
                                    sku: varItem.sku,
                                    price: varItem.price,
                                    inventory_quantity: varItem.inventory_quantity,
                                    product_title: item.title,
                                    image_src: item.images[item.images.findIndex(imgItem => (imgItem.id === varItem.image_id))].src,
                                    quantity: 1,
                                }
                            }
                        }
                    )
                    return {
                        ...item,
                        variants,
                    }
                }
            )
            yield put({
                type: 'setProducts_r',
                payload: products,
            })
        },
        *setCustomer_e(action, { call, put, select }) {
            const { draftorderdetails } = yield select();
            let customer;
            for (customer of draftorderdetails.customers.values()) {
                if (customer.id === action.payload) {
                    break;
                }
            }
            yield put({
                type: 'setCustomer_r',
                payload: customer,
            });
            const { first_name, last_name, company, phone, address1, city, country, province, zip } = customer.default_address;
            yield put({
                type: 'setShippingAddress_r',
                payload: {
                    first_name: first_name,
                    last_name: last_name,
                    company: company,
                    phone: phone,
                    address1: address1,
                    city: city,
                    country: country,
                    province: province,
                    zip: zip,
                },
            });
            yield put({
                type: 'setBillingAddress_r',
                payload: {
                    first_name: first_name,
                    last_name: last_name,
                    company: company,
                    phone: phone,
                    address1: address1,
                    city: city,
                    country: country,
                    province: province,
                    zip: zip,
                },
            });
        },
        *createCustomer_e(action, { call, put, select }) {
            // console.log(action.payload)
            const res_customer = yield call(createCustomer, action.payload);
            if (res_customer === null) {
                alert("创建失败")
            } else {
                yield put({
                    type: 'setCustomer_r',
                    payload: res_customer.data.customer,
                });
                const { first_name, last_name, company, phone, address1, city, country, province, zip } = res_customer.data.customer.default_address;
                yield put({
                    type: 'setShippingAddress_r',
                    payload: {
                        first_name: first_name,
                        last_name: last_name,
                        company: company,
                        phone: phone,
                        address1: address1,
                        city: city,
                        country: country,
                        province: province,
                        zip: zip,
                    },
                });
                yield put({
                    type: 'setBillingAddress_r',
                    payload: {
                        first_name: first_name,
                        last_name: last_name,
                        company: company,
                        phone: phone,
                        address1: address1,
                        city: city,
                        country: country,
                        province: province,
                        zip: zip,
                    },
                });
            }
        },
        *setLineItemsQuantity_e(action, { call, put, select }) {
            const { draftorderdetails } = yield select();
            const line_items = draftorderdetails.line_items.map((item) => {
                if (item.id === action.payload.id) {
                    item = {
                        ...item,
                        quantity: action.payload.quantity,
                    }
                }
                return item;
            });
            yield put({
                type: 'setLineItemsQuantity_r',
                payload: line_items,
            })
        },
        *removeItem_e(action, { call, put, select }) {
            // console.log("test")
            const { draftorderdetails } = yield select();
            const line_items = [...draftorderdetails.line_items];
            line_items.splice(line_items.findIndex((item) => (item.id === action.payload)), 1)
            yield put({
                type: 'removeItem_r',
                payload: line_items,
            })
        },
        *updateDraftOrder_e(action, { call, put, select }) {
            const { draftorderdetails } = yield select();
            let params = {};
            const { thisDetails, shipping_address, billing_address, note } = draftorderdetails;
            const line_items = draftorderdetails.line_items.map((item) => ({
                variant_id: item.id,
                quantity: item.quantity,
            }));
            if (draftorderdetails.customer !== '') {
                const customer = {
                    id: draftorderdetails.customer.id
                }
                params = {
                    draft_order: {
                        id: thisDetails.id,
                        line_items,
                        customer,
                        shipping_address,
                        billing_address,
                        note,
                    }
                }
            } else {
                params = {
                    draft_order: {
                        id: thisDetails.id,
                        line_items,
                        customer: null,
                        shipping_address: null,
                        billing_address: null,
                        note,
                    }
                }
            }
            const res_draftorder = yield call(updateDraftOrder, thisDetails.id, params);
            if (res_draftorder === null) {
                alert("更新草稿订单失败！")
            } else {
                alert("更新草稿订单成功！")
                console.log(res_draftorder)
                yield put({
                    type: 'resetState_r',
                })
            }
            // console.log(JSON.stringify(params))
        },
        *deleteDraftOrder_e(action, { call, put, select }) {
            yield call(deleteDraftOrder, action.payload);
            location.hash = '/orders/draft_orders';
        }
    },
    reducers: {
        setDetails_r(state, action) {
            return {
                ...state,
                ...action.payload,
            }
        },
        resetState_r(state, action) {
            return {
                ...state,
                thisDetails: '',
                customer: '',
                shipping_address: initial_shipping_address,
                billing_address: initial_billing_address,
                line_items: [],
                note: '',
            }
        },
        setCustomer_r(state, action) {
            return {
                ...state,
                customer: action.payload,
            }
        },
        setCustomers_r(state, action) {
            return {
                ...state,
                customers: action.payload,
            }
        },
        setProducts_r(state, action) {
            return {
                ...state,
                products: action.payload,
            }
        },
        setShippingAddress_r(state, action) {
            return {
                ...state,
                shipping_address: action.payload,
            }
        },
        setBillingAddress_r(state, action) {
            return {
                ...state,
                billing_address: action.payload,
            }
        },
        setLineItems_r(state, action) {
            return {
                ...state,
                line_items: state.line_items.concat(action.payload),
            }
        },
        setLineItemsQuantity_r(state, action) {
            return {
                ...state,
                line_items: action.payload,
            }
        },
        removeItem_r(state, action) {
            return {
                ...state,
                line_items: action.payload,
            }
        },
        setNote_r(state, action) {
            return {
                ...state,
                note: action.payload,
            }
        }
    }
}
export default Model;

// const item={
//     id,
//     product_id,
//     product_title,
//     title,
//     sku,
//     quantity,
//     price,
//     image_src,
//     inventory_quantity,
// }