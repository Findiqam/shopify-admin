
import { apiBase } from '@/services/shopConfig';

//传入Link字符串，返回一个对象：{previous:previous_url,next:next_url}
export function getPagesUrlByLink(Link) {
    const Links=Link.split("<");
    let pagesUrl={previous:'',next:''};
    for(let index in Links){
      if(Links[index].includes("previous")){
        pagesUrl.previous=Links[index].split(">")[0].replace(/https.*2019-10/,apiBase);
      }
      if(Links[index].includes("next")){
        pagesUrl.next=Links[index].split(">")[0].replace(/https.*2019-10/,apiBase);
      }
    }
    return pagesUrl;
}