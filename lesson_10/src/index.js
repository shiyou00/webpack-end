function getComponent(){
  return import('lodash').then(({default: _})=>{
    var element = document.createElement('div');
    element.innerHTML = _.join(['hello','webpack'],'-');
    return element;
  })
}

getComponent().then(component=>{
  document.body.appendChild(component);
});
