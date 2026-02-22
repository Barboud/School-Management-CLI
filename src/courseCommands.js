import { saveCourseData, loadCourseData } from './storage.js';
import chalk from 'chalk';

function addCourse(args) {
  // TODO: Implement logic
  console.log(args);
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
  console.log(chalk.bold('\nCourses:'));
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
  console.log(`\nTotal : ${courses.length}\n`);
}

function isCourseFull(participants) {
  return participants.length > 4;
}

export function handleCourseCommand(subcommand, args) {
  switch (subcommand) {
    case 'ADD':
      if (getArgumentsLength(args) !== 2) {
        return console.log(
          chalk.bold.red(
            'Error: You must provide exactly 2 arguments to add a course.\n'
          )
        );
      } else {
        return addCourse(args);
      }

    case 'UPDATE':
      if (getArgumentsLength(args) !== 3) {
        return console.log(
          chalk.bold.red(
            'Error: You must provide exactly 3 arguments to update a course.\n'
          )
        );
      } else {
        return updateCourse(args);
      }

    case 'DELETE':
      if (getArgumentsLength(args) !== 1) {
        return console.log(
          chalk.bold.red(
            'Error: You must provide exactly 1 arguments to update a course.\n'
          )
        );
      } else {
        return deleteCourse(args);
      }

    case 'JOIN':
      if (getArgumentsLength(args) !== 2) {
        return console.log(
          chalk.bold.red(
            'Error: You must provide exactly 2 arguments to join a course.\n'
          )
        );
      } else {
        return joinCourse(args);
      }

    case 'LEAVE':
      if (getArgumentsLength(args) !== 2) {
        return console.log(
          chalk.bold.red(
            'Error: You must provide exactly 2 arguments to leave a course.\n'
          )
        );
      } else {
        return leaveCourse(args);
      }

    case 'GET':
      if (getArgumentsLength(args) !== 1) {
        return console.log(
          chalk.bold.red(
            'Error: You must provide exactly 1 arguments to get a course.\n'
          )
        );
      } else {
        return getCourse(args);
      }

    case 'GETALL':
      if (getArgumentsLength(args) !== 0) {
        return console.log(
          chalk.bold.red('Error: GETALL does not take any arguments.\n')
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
    return console.log(
      chalk.bold.red(`Error: You must provide exactly ${number} ${argWord}.\n`)
    );
  }
}

function getArgumentsLength(args) {
  return args.length;
}

// I use this to insure is there a course
function getCourseByID() {}
