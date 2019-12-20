import request from '@/utils/request';
import axios from 'axios';

const shopName = 'maqii'; //我的商店名字
const apiBase = `https://mirror.viralbox.org/${shopName}/admin/api/2019-10`; //api根
const access_token = '6d699c307bc71730981e6eaedba967cd'; //认证

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
export async function getProducts() {
  return axios.get(apiBase + '/products.json');
}
