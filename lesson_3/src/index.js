import styles from "./index.scss";
import Icon from './icon.png';

function component() {
  var element = document.createElement('div');

  element.className = styles.test;
  element.innerHTML = "hello webpack";

  var myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
