export default function generateLogin(){
  const element = document.createElement('div');
  element.innerHTML = "login";
  element.style.width = '100px';
  element.style.height = '100px';
  element.style.background = 'yellow';
  element.style.position = 'fixed';
  element.style.left = '50%';
  element.style.top = '50%';
  element.style.transform = 'translate(-50%,-50%)';
  document.body.appendChild(element);
}
