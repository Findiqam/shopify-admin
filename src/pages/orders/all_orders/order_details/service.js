import axios from '@/utils/request';
import { apiBase } from '@/services/shopConfig';

export async function queryDetails(id) { 
    return await axios.get(apiBase + '/orders/'+id+'.json')
}

export async function queryEvents(id) { 
    return await axios.get(apiBase + '/orders/'+id+'/events.json')
}
