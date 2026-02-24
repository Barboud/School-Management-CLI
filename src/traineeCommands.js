import { saveTraineeData, loadTraineeData } from './storage.js';
import { loadCourseData } from './storage.js';

import chalk from 'chalk';

function addTrainee(args) {
  if (args.length !== 2) {
    console.log(chalk.bold.red('ERROR: Must provide first and last name'));
    return false;
  }

  const trainees = loadTraineeData();
  const uniqueId = generateUniqueId();

  const newTrainee = {
    id: uniqueId,
    firstName: args[0],
    lastName: args[1],
  };

  trainees.push(newTrainee);

  if (saveTraineeData(trainees)) {
    return console.log(
      chalk.green(
        `CREATED: ${newTrainee.id} ${newTrainee.firstName} ${newTrainee.lastName}`
      )
    );
  }
}

function updateTrainee(args) {
  if (args.length !== 3) {
    console.log(
      chalk.bold.red(`ERROR: Must provide ID, first name and last name`)
    );
    return false;
  }
  const id = Number(args[0]);
  if (isTraineeExist(id) !== true) {
    console.log(
      chalk.bold.red(`ERROR: Trainee with ID ${args[0]} does not exist`)
    );
    return false;
  }

  const trainees = loadTraineeData();

  const oldTraineeDetails = trainees.filter((course) => course.id === id);
  const traineesAfterDelete = trainees.filter(
    (trainee) => trainee.id !== oldTraineeDetails[0].id
  );

  const newTraineeDetails = {
    id: oldTraineeDetails[0].id,
    firstName: args[1],
    lastName: args[2],
  };

  traineesAfterDelete.push(newTraineeDetails);

  if (saveTraineeData(traineesAfterDelete)) {
    return console.log(chalk.green(`UPDATED: ${id} ${args[1]} ${args[2]}`));
  }
}

function deleteTrainee(args) {
  if (args.length !== 1) {
    console.log(chalk.bold.red(`ERROR: Must provide a Id`));
    return false;
  }
  const id = Number(args);
  if (isTraineeExist(id) !== true) {
    console.log(
      chalk.bold.red(`ERROR: Trainee with ID ${args} does not exist`)
    );
    return false;
  }

  const trainees = loadTraineeData();
  const traineeDetails = trainees.filter((course) => course.id === id);
  const newTraineesAfterDelete = trainees.filter(
    (trainee) => trainee.id !== id
  );

  if (saveTraineeData(newTraineesAfterDelete)) {
    return console.log(
      chalk.green(
        `DELETED: ${id} ${traineeDetails[0].firstName} ${traineeDetails[0].lastName}`
      )
    );
  }
}

export function fetchTrainee(args) {
  const id = Number(args);
  if (args.length !== 1) {
    console.log(chalk.bold.red(`ERROR: Must provide a ID`));
    return false;
  }
  if (isTraineeExist(id) !== true) {
    console.log(
      chalk.bold.red(`ERROR: Trainee with ID ${args} does not exist`)
    );
    return false;
  }

  const trainees = loadTraineeData();
  const trainee = trainees.filter((trainee) => trainee.id === id);

  console.log(
    `${trainee[0].id} ${trainee[0].firstName} ${trainee[0].lastName}`
  );

  const courses = loadCourseData();
  let traineeCourses = [];
  for (const course of courses) {
    if (course.participants.includes(trainee[0].id)) {
      traineeCourses.push(course.name);
    }
  }

  if (traineeCourses.length === 0) {
    console.log('Courses: None');
  } else {
    console.log(`Courses: ${traineeCourses.join(', ')}`);
  }
}

function fetchAllTrainees() {
  const trainees = loadTraineeData().sort((a, b) =>
    a.lastName > b.lastName ? 1 : -1
  );
  console.log(chalk.bold('Trainees:'));
  for (const trainee of trainees) {
    const { id, firstName, lastName } = trainee;

    console.log(`${id}. ${chalk.cyan(firstName, lastName)}`);
  }
  console.log(`\nTotal : ${trainees.length}`);
}

export function handleTraineeCommand(subcommand, args) {
  switch (subcommand) {
    case 'ADD':
      return addTrainee(args);

    case 'UPDATE':
      return updateTrainee(args);

    case 'DELETE':
      return deleteTrainee(args);

    case 'GET':
      return fetchTrainee(args);

    case 'GETALL':
      if (args.length !== 0) {
        return console.log(
          chalk.bold.red('Error: GETALL does not take any arguments.')
        );
      } else {
        return fetchAllTrainees();
      }

    default:
      console.log(chalk.bold.red('Error: Invalid trainee subcommand.'));
  }
}

export function isTraineeExist(id) {
  const trainees = loadTraineeData();
  const trainee = trainees.filter((trainee) => trainee.id === id);
  if (trainee.length === 0) {
    return false;
  }
  return true;
}

function generateUniqueId() {
  function getUniqueId() {
    return Math.floor(Math.random() * 99999) + 1;
  }

  const courses = loadCourseData();
  const courseIds = courses.map((course) => course.id);

  let uniqueId = getUniqueId();
  for (let i = 0; i < courseIds.length; i++) {
    while (uniqueId === courseIds[i]) {
      uniqueId = getUniqueId();
      i = 0;
    }
  }

  return uniqueId;
}

export function getTraineeById(args) {
  const id = Number(args);

  const trainees = loadTraineeData();
  const trainee = trainees.filter((trainee) => trainee.id === id);

  return trainee;
}
