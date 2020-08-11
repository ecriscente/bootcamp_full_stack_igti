import fs from 'fs';

const cities = JSON.parse(fs.readFileSync('./Cidades.json'));
const states = JSON.parse(fs.readFileSync('./Estados.json'));
let soma = 0;
let tmp = '';
for (var i = 0; i < states.length; i++) {
  if (states[i].Sigla === 'SP') {
    tmp = states[i].ID;
  }
}
console.log(tmp);

for (i = 0; i < cities.length; i++) {
  if (cities[i].Estado === tmp) {
    soma = soma + 1;
  }
}

console.log(soma);
