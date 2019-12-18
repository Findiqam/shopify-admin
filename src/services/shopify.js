import request from '@/utils/request';
import axios from 'axios';
import { apiBase, access_token } from '@/services/shopConfig';


export async function queryOrders(parameters) {
    return await axios.get(apiBase + '/orders.json'+parameters,{
        headers:{
            'X-Shopify-Access-Token':access_token
        }
    })
}
export async function getOrdersCount(parameters) {
    return await axios.get(apiBase + '/orders/count.json'+parameters,{
        headers:{
            'X-Shopify-Access-Token':access_token
        }
    })
}
export async function queryAllCustomers() {
    return request(apiBase + '/customers.json');
}
export async function queryAllProducts() {
    return request(apiBase + '/products.json');
}