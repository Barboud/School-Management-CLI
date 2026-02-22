import { saveCourseData, loadCourseData } from './storage.js';
import chalk from 'chalk';

function addCourse() {
  // TODO: Implement logic
}

function updateCourse() {
  // TODO: Implement logic
}

function deleteCourse() {
  // TODO: Implement logic
}

function joinCourse() {
  // TODO: Implement logic
}

function leaveCourse() {
  // TODO: Implement logic
}

function getCourse() {
  // TODO: Implement logic
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
  // Read the subcommand and call the appropriate function with the arguments
  return getAllCourses();
}

function validateSubCommand(subcommand) {
  // ADD UPDATE DELETE JOIN LEAVE GET GETALL
  switch (key) {
    case value:
      break;

    default:
      break;
  }
}

// I use this to insure is there a course
function getCourseByID() {}
