const element = document.createElement('button');
element.innerHTML = "登录";
element.onclick = function(){
  import(/* webpackPrefetch: true */ /* webpackChunkName: "login" */ "./login.js").then(({default:loginFunc})=>{
    loginFunc();
  })
};
document.body.appendChild(element);
