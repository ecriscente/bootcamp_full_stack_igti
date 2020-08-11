import express from 'express';
import gradesControlRouter from './routes/grades-control-api.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use('/gradesControl', gradesControlRouter);

global.fileName = 'grades.json';

app.listen(3000, async () => {
  try {
    await readFile('grades.json');
    console.log('API Started!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      grades: [],
    };
    writeFile('grades.json', JSON.stringify(initialJson))
      .then(() => {
        console.log('API Started!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
