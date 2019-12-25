import axios from '@/utils/request';
import { apiBase } from '@/services/shopConfig';


export async function queryTableData(parameters) { //根据参数筛选orders并返回结果
    return await axios.get(apiBase + '/orders.json'+parameters)
}

export async function getListCount(parameters) { //根据参数筛选orders并返回总数
    return await axios.get(apiBase + '/orders/count.json'+parameters)
}

export async function queryTableDataPage(url) { //根据url请求orders并返回
    return await axios.get(url)
}
