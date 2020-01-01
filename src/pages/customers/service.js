import request from '@/utils/request';
import axios from 'axios';

const shopName = 'maqii'; //商店名字
const apiBase = `https://mirror.viralbox.org/${shopName}/admin/api/2019-10`; //api根
const access_token = '6d699c307bc71730981e6eaedba967cd'; //认证

axios.defaults.headers['X-Shopify-Access-Token'] = access_token;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export async function queryCustomers(parameters) {
  return axios.get(apiBase + '/customers.json' + parameters, {
    headers: {
      'X-Shopify-Access-Token': access_token,
    },
  });
}
export async function getCustomers(parameters) {
  return axios.get(apiBase + '/customers/search.json' + parameters, {
    headers: {
      'X-Shopify-Access-Token': access_token,
    },
  });
}
export async function AddCustomers(params) {
  return await axios.post(apiBase + '/customers.json', params);
}
export async function getProducts() {
  return axios.get(apiBase + '/products.json');
}
