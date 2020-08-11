import { promises as fs } from 'fs';
import { quantityCitiesInState, cityCount } from './functions.js';
import pkg from 'readdir';
import * as path from 'path';

//init();
createDocumentStates();
topFiveUF();
//leastFiveUF();
biggestNames();
smalestNames();
//UFsComMaisCidades();
quantityCitiesInState();
//firstAndLast5States();

//list.then();

async function createDocumentStates() {
  try {
    const states = await JSON.parse(await fs.readFile('Estados.json'));
    const cities = await JSON.parse(await fs.readFile('Cidades.json'));

    states.forEach((state) => {
      const arrayCity = [];
      cities.forEach((city) => {
        if (city.Estado === state.ID) {
          arrayCity.push(city);
        }
        //console.log(arrayCity);
      });

      let obj = {
        uf: state.Sigla,
        cidades: arrayCity,
      };

      const name = state.Sigla;
      fs.writeFile(`./States/${name}.json`, JSON.stringify(obj));
    });
  } catch (err) {
    console.log(err);
  }
}

async function topFiveUF() {
  const ufs = JSON.parse(await fs.readFile('./Estados.json'));
  const fiveMor = [0, 0, 0, 0, 0];
  for (let i = 0; i < ufs.length; i++) {
    let uf = ufs[i].Sigla;
    let num = await cityCount(uf);
    fiveMor.push({ uf: uf, cities: num });
  }
  fiveMor.sort(function (a, b) {
    return b.cities - a.cities;
  });
  console.log(fiveMor);
}

async function leastFiveUF() {
  const ufs = JSON.parse(await fs.readFile('./Estados.json'));
  const fiveLess = [0, 0, 0, 0, 0];
  for (let i = 0; i < ufs.length; i++) {
    let uf = ufs[i].Sigla;
    let num = await cityCount(uf);
    if (i < 5) {
      fiveLess[i] = { uf: uf, cities: num };
    } else {
      fiveLess.sort(function (a, b) {
        return a.cities - b.cities;
      });
      if (num > fiveLess[4].cities) {
        fiveLess[4].cities = num;
      }
    }
  }
  //console.log(fiveLess);
}

async function biggestNames() {
  try {
    const dataE = JSON.parse(await fs.readFile('./Estados.json'));
    const dataC = JSON.parse(await fs.readFile('./Cidades.json'));
    let allCities = [];
    let biggestNamesPerState = [];
    for (var j = 0; j < dataE.length; j++) {
      for (var i = 0; i < dataC.length; i++) {
        if (dataC[i].Estado === dataE[j].ID) {
          allCities.push({
            name: dataC[i].Nome,
            uf: dataE[j].Sigla,
            chars: dataC[i].Nome.length,
          });
        }
      }
      allCities.sort(
        await function (a, b) {
          return b.chars - a.chars;
        }
      );
    }
    for (i = 0; i < dataE.length; i++) {
      allCities.sort(
        await function (a, b) {
          return b.chars - a.chars;
        }
      );
      let element = allCities.find((city) => city.uf === dataE[i].Sigla);
      biggestNamesPerState.push(element);
      //console.log(element);
    }
    biggestNamesPerState.sort(
      await function (a, b) {
        return b.chars - a.chars;
      }
    );
    allCities.sort(
      await function (a, b) {
        return b.chars - a.chars;
      }
    );
    //console.log(allCities);
    console.log(biggestNamesPerState);
  } catch (err) {
    console.log(err);
  }
}

async function smalestNames() {
  try {
    const dataE = JSON.parse(await fs.readFile('./Estados.json'));
    const dataC = JSON.parse(await fs.readFile('./Cidades.json'));
    let allCities = [];
    let smalestNamesPerState = [];
    for (var j = 0; j < dataE.length; j++) {
      for (var i = 0; i < dataC.length; i++) {
        if (dataC[i].Estado === dataE[j].ID) {
          allCities.push({
            name: dataC[i].Nome,
            uf: dataE[j].Sigla,
            chars: dataC[i].Nome.length,
          });
        }
      }
      allCities.sort(
        await function (a, b) {
          return a.chars - b.chars;
        }
      );
    }
    for (i = 0; i < dataE.length; i++) {
      allCities.sort(
        await function (a, b) {
          return a.chars - b.chars;
        }
      );
      let element = allCities.find((city) => city.uf === dataE[i].Sigla);
      smalestNamesPerState.push(element);
      //console.log(element);
    }
    smalestNamesPerState.sort(
      await function (a, b) {
        return a.chars - b.chars;
      }
    );
    allCities.sort(
      await function (a, b) {
        return a.chars - b.chars;
      }
    );
    //console.log(allCities);
    console.log(smalestNamesPerState);
  } catch (err) {
    console.log(err);
  }
}

/*
async function UFsComMenosCidades() {
  
  const fileEstados = fs.readFileSync("Estados.json");
  const data = await JSON.parse(fileEstados);
 

  for (estado of data) {
    qtdCidadesPorUF(estado.Sigla).then((total) => {
      
      eventEmitter.emit("ufSumarizada", {
        uf: estado.Sigla,
        qtdCidades: total,
    });
    });
  });
}

async function countCities(uf) {
  const state = JSON.parse(await fs.readFile(uf + '.json'));
  return state.selectedCities.length;
}

allCitiesAndStates.forEach(async (state) => {
      try {
        let cities = await countCities(state.Sigla);
        top5Tabulation.push({
          state: state.Sigla,
          cidades: cities,
        });


async function teste() {
  try {
    let list = [];
    //passsing directoryPath and callback function
    fs.readdir('./States', (files) => {
      //handling error
      //listing all files using forEach
      for (file of files) {
        // Do whatever you want to do with the file
        list.push(file);
      }
      console.log(list);
    });
  } catch (err) {
    console.log(err);
  }
}


async function firstAndLast5States() {
  try {
    const allTextFilesFilter = ['*.js'];
    const options = ABSOLUTE_PATHS + CASELESS_SORT;
    const allStates = './States/';
    const list = [];

    // as an async/await
    for (var estado in allStates) {
      let file = JSON.parse(await fs.readFile(`${allStates}${estado}`));
      list.push(file);
    }
    console.log(list);
  } catch (err) {
    console.log(err);
  }
}


let array = firstAndLast5States();
console.log(array); // Promise { <pending> }

array.then(function (result) {
  console.log(result); // "Some User token"
});


(async () => {
  // Our starting point
  try {
    // Get the files as an array
    const files = fs.promises.readdir('./States');
    let totalCidadesEstados = [];

    // Loop them all with the new for...of
    for (const file of files) {
      // Get the full paths
      data = JSON.parse(await fs.readFile(`${file}.json`));
      totalCidadesEstados.push(data.cidades.length);
    } // End for...of

    console.log(totalCidadesEstados);
  } catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
})(); // Wrap in parenthesis and call now


async function UFsComMaisCidades() {
  const fileEstados = await fs.readFileSync('Estados.json');
  const data = await JSON.parse(fileEstados);

  await data.forEach((estado) => {
    qtdCidadesPorUF(estado.Sigla).then((total) => {
      eventEmitter.emit('ufSumarizada', {
        uf: estado.Sigla,
        qtdCidades: total,
      });
    });
  });
}


async function firstAndLast5States() {
  try {
    const sorted = [];
    const firstBig5 = [];
    const lastLitle5 = [];

    fs.readdir('./States', (err, list) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        for (var i = 0; i < list.length; i++) {
          // Get the contents of each file on iteration.
          var fileName = list[i];
          sorted.push(fileName);

          fs.readFile(`./States/ + ${fileName}`, (data) => {
            const parsedData = JSON.parse(data);
            const temp = parsedData.cidades.length;
          });
        }
      }
    });
    //sorted.sort();
    //console.log(temp);
  } catch (err) {
    console.log(err);
  }
}
*/
