import { promises as fs, read } from 'fs';
import calc from '../libs/calcs.js';

const { readFile, writeFile } = fs;

async function totalPerStudentPerSubject(stud, subj) {
  const json = JSON.parse(await readFile(global.fileName));

  let grades = json.grades.filter((grade) => {
    const alumni = grade.student;
    const discipline = grade.subject;
    return alumni === stud && discipline === subj;
  });

  grades = grades.map((grade) => {
    return grade.value;
  });

  return { total: calc.sumGrades(grades) };
}

async function avgPerSubjectPerType(subj, tp) {
  const json = JSON.parse(await readFile(global.fileName));

  let grades = json.grades.filter((grade) => {
    const discipline = grade.subject;
    const kind = grade.type;
    return discipline === subj && kind === tp;
  });

  grades = grades.map((grade) => {
    return grade.value;
  });

  return { mean: calc.avgGrades(grades) };
}

async function bestThreeGrades(subj, tp) {
  const json = JSON.parse(await readFile(global.fileName));

  let grades = json.grades.filter((grade) => {
    const discipline = grade.subject;
    const kind = grade.type;
    return discipline === subj && kind === tp;
  });

  let tmp = calc.sortGrades(grades);

  let best3 = JSON.stringify(tmp);

  return best3;
}

export default {
  totalPerStudentPerSubject,
  avgPerSubjectPerType,
  bestThreeGrades,
};
