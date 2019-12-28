import { apiBase } from '@/services/shopConfig';

//传入Link字符串，返回一个对象：{previous:previous_url,next:next_url}
export function getPagesUrlByLink(Link) {
  const Links = Link.split("<");
  let pagesUrl = { previous: '', next: '' };
  for (let index in Links) {
    if (Links[index].includes("previous")) {
      pagesUrl.previous = Links[index].split(">")[0].replace(/https.*2019-10/, apiBase);
    }
    if (Links[index].includes("next")) {
      pagesUrl.next = Links[index].split(">")[0].replace(/https.*2019-10/, apiBase);
    }
  }
  return pagesUrl;
}
//支付状态标签色
export const paymentStatus_TagColor = {
  authorized: 'cyan',
  paid: 'green',
  pending: 'orange',
  partially_paid: 'lime',
  refunded: 'blue',
  voided: 'magenta',
  partially_refunded: 'geekblue',
  unpaid: 'red',
}
//履行状态标签色
export const fulfillmentStatus_TagColor = {
  shipped: 'lime',
  partial: 'lime',
  unshipped: 'orange',
  unfulfilled: 'red',
  fulfilled: 'green',
}