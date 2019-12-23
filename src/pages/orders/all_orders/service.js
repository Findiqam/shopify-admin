import axios from '@/utils/request';
import { apiBase } from '@/services/shopConfig';


export async function queryOrders(parameters) { //根据参数筛选orders并返回结果
    return await axios.get(apiBase + '/orders.json'+parameters)
}

export async function getOrdersCount(parameters) { //根据参数筛选orders并返回总数
    return await axios.get(apiBase + '/orders/count.json'+parameters)
}

export async function queryOrdersPage(url) { //根据url请求orders并返回
    return await axios.get(url)
}
