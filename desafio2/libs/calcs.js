function sumGrades(array) {
  const sum = array.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);
  return sum;
}

function avgGrades(array) {
  const sum = sumGrades(array);
  const avg = sum / array.length;
  return avg;
}

function sortGrades(array) {
  array.sort(function (a, b) {
    return b.value - a.value;
  });
  return array.slice(0, 3);
}

export default { sumGrades, avgGrades, sortGrades };
