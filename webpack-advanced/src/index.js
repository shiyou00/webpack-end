import { forEach } from "lodash";
import $ from "jquery";
import "./index.css";

$(function () {
  forEach([1,2,3],(item)=>{
    console.log(item);
  })
});

// import(/* webpackChunkName: "lodash" */"lodash").then(({default:_})=>{
//   console.log(_.join(["a","b"],"-"));
// })
//
// import(/* webpackChunkName: "jquery" */"jquery").then(({default:$})=>{
//   $(function () {
//     console.log("jquery 已经加载完成");
//   })
// })

// document.addEventListener("click",()=>{
//   import(/* webpackPrefetch: true */ /* webpackChunkName: "lodash" */ "lodash").then(({default:_})=>{
//     console.log(_.join(["a","b"],"-"));
//   });
// },false);