import { queryCustomers, createCustomer, createDraftOrder, queryProducts } from './service';

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
    namespace: 'newdrafts',
    state: {
        customers: [],
        products: [],
        customer: '',
        shipping_address: initial_shipping_address,
        billing_address: initial_billing_address,
        line_items: [],
        note: '',
    },
    effects: {
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
                                    ...varItem,
                                    product_title: item.title,
                                    image_src: item.image.src,
                                    quantity: 1,
                                }
                            } else {
                                return {
                                    ...varItem,
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
            const { newdrafts } = yield select();
            let customer;
            for (customer of newdrafts.customers.values()) {
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
            const { newdrafts } = yield select();
            const line_items = newdrafts.line_items.map((item) => {
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
            const { newdrafts } = yield select();
            const line_items = [...newdrafts.line_items];
            line_items.splice(line_items.findIndex((item) => (item.id === action.payload)), 1)
            yield put({
                type: 'removeItem_r',
                payload: line_items,
            })
        },
        *createDraftOrder_e(action, { call, put, select }) {
            const { newdrafts } = yield select();
            let params = {};
            const { shipping_address, billing_address, note } = newdrafts;
            const line_items = newdrafts.line_items.map((item) => ({
                variant_id: item.id,
                quantity: item.quantity,
            }));
            if (newdrafts.customer !== '') {
                const customer = {
                    id: newdrafts.customer.id
                }
                params = {
                    draft_order: {
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
                        line_items,
                        note,
                    }
                }
            }
            const res_draftorder = yield call(createDraftOrder, params);
            if (res_draftorder === null) {
                alert("创建草稿订单失败！")
            } else {
                alert("创建订单成功！")
                console.log(res_draftorder.data.draft_order)
                yield put({
                    type: 'resetState_r',
                })
            }
            // console.log(JSON.stringify(params))
        },
    },
    reducers: {
        resetState_r(state, action) {
            return {
                ...state,
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
