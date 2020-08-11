import express from 'express';
import { promises as fs } from 'fs';
import controller from '../controllers/gradesController.js';

const { readFile, writeFile } = fs;

const router = express.Router();

router.get('/totalGrade', async (req, res) => {
  res.send(
    await controller.totalPerStudentPerSubject(
      req.body.student,
      req.body.subject
    )
  );
});

router.get('/avgGrade', async (req, res) => {
  res.send(
    await controller.avgPerSubjectPerType(req.body.subject, req.body.type)
  );
});

router.get('/bestThree', async (req, res) => {
  res.send(await controller.bestThreeGrades(req.body.subject, req.body.type));
});

router.post('/', async (req, res) => {
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    grade = {
      id: data.nextId++,
      ...grade,
      timestamp: new Date(),
    };
    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const grade = req.body;

    const data = JSON.parse(await readFile(global.fileName));
    if (data.grades.some((a) => a.id === grade.id)) {
      const index = data.grades.findIndex((a) => a.id === grade.id);

      data.grades[index] = {
        ...grade,
        timestamp: data.grades[index].timestamp,
      };

      await writeFile(global.fileName, JSON.stringify(data));

      res.send(data);
    } else {
      res.send('id doesn´t exist');
    }
  } catch (err) {
    res.status(400).send(console.log({ err: err.message }));
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
    logger.info(`DELETE /account/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );
    res.send(grade);
    logger.info('GET /grade/:id');
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );
    res.send(grade);
    logger.info('GET /grade/:id');
  } catch (err) {
    next(err);
  }
});

export default router;
