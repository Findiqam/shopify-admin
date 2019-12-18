import request from '@/utils/request';
import axios from 'axios';
import { apiBase, access_token } from '@/services/shopConfig';

//根据参数筛选orders并返回结果
export async function queryOrders(parameters) {
    return await axios.get(apiBase + '/orders.json'+parameters,{
        headers:{
            'X-Shopify-Access-Token':access_token
        }
    })
}
//根据参数筛选orders并返回总数
export async function getOrdersCount(parameters) {
    return await axios.get(apiBase + '/orders/count.json'+parameters,{
        headers:{
            'X-Shopify-Access-Token':access_token
        }
    })
}
//根据url请求orders并返回
export async function queryOrdersPage(url) {
    return await axios.get(url,{
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