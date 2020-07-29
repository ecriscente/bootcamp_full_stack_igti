function sum(a, b) {
  return a + b;
}

console.log(superSum(1, 2));

function compareNumebers(a, b) {
  // return a > b ? 1 : a < b ? -1 : 0;
  return a - b; // Elegante
}

console.log(compareNumebers(1, 1));
console.log(compareNumebers(1, 2));
console.log(compareNumebers(2, 1));

function superSum(from, upTo) {
  var sum = 0;

  for (var i = from; i <= upTo; i++) {
    sum += i;
  }

  return sum;
}

console.log(superSum(1, 10));
console.log(superSum(9, 100));
console.log(superSum(200, 1000));
