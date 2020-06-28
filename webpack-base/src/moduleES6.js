const arr = [
  new Promise(()=>{}),
  new Promise(()=>{})
];

function handleArr(){
  arr.map((item)=>{
    console.log(item);
  });
}


export default handleArr;
