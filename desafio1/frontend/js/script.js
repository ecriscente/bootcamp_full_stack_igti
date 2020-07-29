window.addEventListener('load', start());

let globalUsers = [];
let filteredUsers = [];
let filteredArray = [];
let totalUsers = 0;
let searchBar = '';

async function start() {
  console.log('teste');
  await fetchUsers();
  await filterUsers();
  await render();
}

async function fetchUsers() {
  const resource = await fetch('http://localhost:3001/results');
  const json = await resource.json();

  globalUsers = json.map(({ login, name, picture, dob, gender }) => {
    return {
      id: login.uuid,
      name: `${name.first} ${name.last}`,
      picture: picture.large,
      age: dob.age,
      gender: gender,
    };
  });

  console.log(globalUsers);
}

async function filterUsers() {
  searchBar = document.querySelector('#search-box');
  searchBar.addEventListener('keyup', function (event) {
    let term = event.target.value.toLowerCase();
    console.log(term);

    searchButton = document.querySelector('#search-button');
    searchButton.addEventListener('click', function () {
      filteredUsers = globalUsers.filter((user) => {
        return user.name.toLowerCase().includes(searchBar.value);
      });
      filteredArray = Array.from(filteredUsers);
      console.log(filteredArray);

      render();
    });
  });
}

function render() {
  const divUsers = document.querySelector('#users');

  divUsers.innerHTML = `
  <div id="users">
  <h4>${filteredUsers.length} usuário(s) encontrado(s)</h4>
    ${filteredUsers.map(function (user) {
      return `
      <div>
        
        <div>
        <img src='${user.picture}' />
        </div>
        <div>
        ${user.name}
        </div>
        <div>
        ${user.age}
        </div>
      </div>
      
      `;
    })}
  </div>
  
  `;

  const divStatistics = document.querySelector('#statistics');

  const men = filteredUsers.filter((person) => {
    return person.gender === 'male';
  });

  const women = filteredUsers.filter((person) => {
    return person.gender === 'female';
  });

  const totalAges = filteredUsers.reduce((accumulator, currentUser) => {
    return accumulator + currentUser.age;
  }, 0);

  const averageAges = totalAges / filteredArray.length;

  divStatistics.innerHTML = `
  <div id="statistics">
  <h4>Estatísticas</h4>
    <div>
    <p>Sexo Masculino: ${men.length}</p>
    <p>Sexo Feminino: ${women.length}</p>
    <p>Soma das idades: ${totalAges}</p>
    <p>Média das idades: ${averageAges}</p>

    </div>

  </div>
  
  `;
}
