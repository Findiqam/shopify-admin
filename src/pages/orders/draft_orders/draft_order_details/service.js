import axios from '@/utils/request';
import { apiBase } from '@/services/shopConfig';

export async function queryCustomers() {
    return await axios.get(apiBase + '/customers.json')
}

export async function createCustomer(params) {
    return await axios.post(apiBase + '/customers.json', params)
}

export async function updateDraftOrder(draft_order_id, params) {
    return await axios.put(apiBase + '/draft_orders/' + draft_order_id + '.json', params)
}

export async function queryProducts() {
    return await axios.get(apiBase + '/products.json?fields=id,title,variants,image,images')
}

export async function queryDetails(id) {
    return await axios.get(apiBase + '/draft_orders/' + id + '.json')
}
export async function queryImages(product_id) {
    return await axios.get(apiBase + '/products/' + product_id + '/images.json')
}

export async function deleteDraftOrder(draft_order_id) {
    return await axios.delete(apiBase + '/draft_orders/' + draft_order_id + '.json')
}