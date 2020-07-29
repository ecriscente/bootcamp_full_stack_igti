window.addEventListener('load', start);

var input = document.querySelectorAll('input');

var redValue = document.querySelector('#textRed');
var greenValue = document.querySelector('#textGreen');
var blueValue = document.querySelector('#textBlue');

redValue.value = 123;
greenValue.value = 123;
blueValue.value = 123;

function start() {
  console.log('seletor de cor');
}

function seletorRGB() {
  var red = document.querySelector('#red').value;
  var green = document.querySelector('#green').value;
  var blue = document.querySelector('#blue').value;

  redValue.value = red;
  greenValue.value = green;
  blueValue.value = blue;

  var display = document.querySelector('#color');
  display.style.background = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

for (var i = 0; i < input.length; i++) {
  input[i].addEventListener('input', seletorRGB);
}
