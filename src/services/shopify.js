import request from '@/utils/request';

const shopName = 'maqii';

const apiBase = `https://mirror.viralbox.org/${shopName}/admin/api/2019-10`;

export async function queryAllOrders() {
    return request(apiBase + '/orders.json');
}
export async function queryAllCustomers() {
    return request(apiBase + '/customers.json');
}
export async function queryAllProducts() {
    return request(apiBase + '/products.json');
}