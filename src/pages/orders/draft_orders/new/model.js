import { queryCustomers, createCustomer, createDraftOrder } from './service';

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
        customer: '',
        shipping_address: initial_shipping_address,
        billing_address: initial_billing_address,
    },
    effects: {
        *setCustomers_e(action, { call, put, select }) {
            const res_customers = yield call(queryCustomers);
            yield put({
                type: 'setCustomers_r',
                payload: res_customers.data.customers,
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
            console.log(action.payload)
            const res_customer = yield call(createCustomer, action.payload);
            if (res_customer === null) {
                alert("创建失败")
            }else{
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
    },
    reducers: {
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
    }
}
export default Model;
