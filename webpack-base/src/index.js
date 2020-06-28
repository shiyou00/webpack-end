import React,{Component} from 'react';
import ReactDom from 'react-dom';

class App extends Component{
  render(){
    const arr = [1,2,3,4];
    return (
      arr.map((item)=><p>num: {item}</p>)
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));

// import moduleA from "./moduleA";
//
// if (module.hot) {
//   module.hot.accept('./moduleA.js', function() {
//     console.log("moduleA 支持热更新拉");
//     console.log(moduleA());
//   })
// }
