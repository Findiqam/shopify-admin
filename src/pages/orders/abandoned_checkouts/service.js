import axios from '@/utils/request';
import { apiBase } from '@/services/shopConfig';

export async function queryTableData(parameters) { //根据参数筛选draft_orders并返回
    return await axios.get(apiBase + '/checkouts.json'+parameters)
}

export async function queryTableDataPage(url) { //根据url请求orders并返回
    return await axios.get(url)
}