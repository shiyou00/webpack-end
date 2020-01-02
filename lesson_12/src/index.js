// import _ from 'lodash';
//
// var element = document.createElement('div');
// element.innerHTML = _.join(['hello','webpack'],'-');
// document.body.appendChild(element);

function getComponent(){
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({default: _})=>{
    var element = document.createElement('div');
    element.innerHTML = _.join(['hello','webpack'],'-');
    return element;
  })
}

document.addEventListener('click',()=>{
  getComponent().then(component=>{
    document.body.appendChild(component);
  });
});


