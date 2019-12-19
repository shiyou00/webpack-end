import "./index.css";
import count from "./count";

function num(){
  var btn = document.createElement("button");
  btn.innerHTML = "1";
  document.body.appendChild(btn);
  btn.onclick = function () {
    console.log(parseInt(btn.innerHTML));
    btn.innerHTML = parseInt(btn.innerHTML) + 1;
  }
}

num();
count();

if (module.hot) {
  module.hot.accept('./count.js',function() {
    document.body.removeChild(document.getElementById("count"));
    count();
  })
}
