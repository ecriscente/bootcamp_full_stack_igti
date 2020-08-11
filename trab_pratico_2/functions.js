import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function whatState() {
  rl.question(
    'Gostaria de saber quantidade de cidades de qual estado? ',
    (sigla) => {
      const data = JSON.parse(fs.readFile(sigla));
      whatState();
    }
  );
}

export function quantityCitiesInState(state) {
  try {
    whatState();
    function whatState() {
      rl.question(
        'Gostaria de saber quantidade de cidades de qual estado? ',
        (sigla) => {
          if (sigla === 'sair') {
            rl.close();
          } else {
            const data = JSON.parse(fs.readFileSync(`./States/${sigla}.json`));
            const total = data.cidades.length;
            console.log(total);
          }
          // return total;
          whatState();
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export function cityCount(ufstate) {
  try {
    const cities = JSON.parse(fs.readFileSync('./Cidades.json'));
    const states = JSON.parse(fs.readFileSync('./Estados.json'));
    let soma = 0;
    let tmp = '';
    for (var i = 0; i < states.length; i++) {
      if (states[i].Sigla === ufstate) {
        tmp = states[i].ID;
      }
    }

    for (i = 0; i < cities.length; i++) {
      if (cities[i].Estado === tmp) {
        soma = soma + 1;
      }
    }

    return soma;

    /*
    for (i = 0; i < states.length; i++) {
      for (j = 0; j < cities.length; i++) {
        if (city[j].Estado === state[i].ID) {
          city[j].Estado = state[i].Sigla;
          soma++;
        }
        array.push({})
      }
    }
    */
  } catch (err) {
    console.log(err);
  }
}

cityCount('SP');

export default { quantityCitiesInState, cityCount };
