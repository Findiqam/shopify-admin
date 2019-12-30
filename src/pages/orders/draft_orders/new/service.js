import axios from '@/utils/request';
import { apiBase } from '@/services/shopConfig';

export async function queryCustomers() {
    return await axios.get(apiBase + '/customers.json')
}

export async function createCustomer(params) {
    return await axios.post(apiBase + '/customers.json',params)
}

export async function createDraftOrder(params) {
    return await axios.post(apiBase + '/draft_orders.json',params)
}

export async function queryProducts() {
    return await axios.get(apiBase + '/products.json?fields=id,title,variants,image,images')
}

