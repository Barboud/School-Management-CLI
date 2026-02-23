import { saveCourseData, loadCourseData } from './storage.js';
import chalk from 'chalk';

function addCourse(args) {
  if (validateArguments(args, 2) && validateDate(args, 1)) {
    const courses = loadCourseData();
    const uniqueId = generateUniqueId();

    const newCourse = {
      id: uniqueId,
      name: args[0],
      startDate: args[1],
      participants: [],
    };

    courses.push(newCourse);

    if (saveCourseData(courses)) {
      return console.log(
        chalk.green(
          `CREATED: ${newCourse.id} ${newCourse.name} ${newCourse.startDate}`
        )
      );
    }
  }
}

function updateCourse(args) {
  // TODO: Implement logic
  console.log(args);
}

function deleteCourse(args) {
  // TODO: Implement logic
  console.log(args);
}

function joinCourse(args) {
  // TODO: Implement logic
  console.log(args);
}

function leaveCourse(args) {
  // TODO: Implement logic
  console.log(args);
}

function getCourse(args) {
  // TODO: Implement logic
  console.log(args);
}

function getAllCourses() {
  const courses = loadCourseData().sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );
  console.log(chalk.bold('Courses:'));
  for (const course of courses) {
    const { id, name, startDate, participants } = course;

    let courseStatus = null;
    if (isCourseFull(participants)) {
      courseStatus = chalk.bgRed.white(`FULL`);
    } else {
      courseStatus = '';
    }

    console.log(`${id}. ${chalk.cyan(name)} - ${startDate} ${courseStatus}`);
  }
  console.log(`\nTotal : ${courses.length}`);
}

function isCourseFull(participants) {
  return participants.length > 19;
}

export function handleCourseCommand(subcommand, args) {
  switch (subcommand) {
    case 'ADD':
      return addCourse(args);

    case 'UPDATE':
      updateCourse(args);

    case 'DELETE':
      return deleteCourse(args);

    case 'JOIN':
      return joinCourse(args);

    case 'LEAVE':
      return leaveCourse(args);

    case 'GET':
      return getCourse(args);

    case 'GETALL':
      if (getArgumentsLength(args) !== 0) {
        return console.log(
          chalk.bold.red('Error: GETALL does not take any arguments.')
        );
      } else {
        return getAllCourses();
      }

    default:
      console.log(chalk.bold.red('Error: Invalid course subcommand.'));
  }
}

function validateArguments(args, number) {
  if (args.length !== number) {
    const argWord = number === 1 ? 'argument' : 'arguments';
    console.log(
      chalk.bold.red(`Error: You must provide exactly ${number} ${argWord}.`)
    );
    return false;
  }
  return true;
}

function getArgumentsLength(args) {
  return args.length;
}

function validateDate(args, index) {
  const splitDate = args[index].split('-');
  const year = Number(splitDate[0]);
  const month = Number(splitDate[1]);
  const day = Number(splitDate[2]);

  if (splitDate.length !== 3 || args[index].length !== 10) {
    console.log(
      chalk.bold.red('Error: Please provide a date in the format yyyy-MM-dd')
    );
    return false;
  } else if (year < 2020 || year > 3000) {
    console.log(
      chalk.bold.red('Error: Please provide a year between 2020 and 2999')
    );
    return false;
  } else if (month > 12 || month < 1) {
    console.log(chalk.bold.red('Error: Please provide a valid month (01-12)'));
    return false;
  } else if (day > 31 || day < 1) {
    console.log(chalk.bold.red('Error: Please provide a valid day (01-31)'));
    return false;
  }
  return true;
}

// I use this to insure is there a course
function getCourseByID() {}

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
