import { saveCourseData, loadCourseData } from './storage.js';
import { getTraineeById, isTraineeExist } from './traineeCommands.js';
import chalk from 'chalk';

function addCourse(args) {
  if (args.length !== 2) {
    console.log(
      chalk.bold.red('ERROR: Must provide course name and start date')
    );
    return false;
  }

  if (validateDate(args, 1)) {
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
  if (args.length !== 3) {
    console.log(chalk.bold.red(`ERROR: Must provide ID, name and start date.`));
    return false;
  }
  const id = Number(args[0]);
  if (isCourseExist(id) !== true) {
    console.log(
      chalk.bold.red(`ERROR: Course with ID ${args[0]} does not exist`)
    );
    return false;
  }

  const courses = loadCourseData();

  const oldCourseDetails = courses.filter((course) => course.id === id);
  const coursesAfterDelete = courses.filter(
    (course) => course.id !== oldCourseDetails[0].id
  );

  const newCourseDetails = {
    id: oldCourseDetails[0].id,
    name: args[1],
    startDate: args[2],
    participants: oldCourseDetails[0].participants,
  };

  coursesAfterDelete.push(newCourseDetails);

  if (saveCourseData(coursesAfterDelete)) {
    return console.log(chalk.green(`UPDATED: ${id} ${args[1]} ${args[2]}`));
  }
}

function deleteCourse(args) {
  if (args.length !== 1) {
    console.log(chalk.bold.red(`ERROR: Must provide a Id`));
    return false;
  }
  const id = Number(args);
  if (isCourseExist(id) !== true) {
    console.log(chalk.bold.red(`ERROR: Course with ID ${args} does not exist`));
    return false;
  }

  const courses = loadCourseData();
  const courseName = courses.filter((course) => course.id === id);
  const newCoursesAfterDelete = courses.filter((course) => course.id !== id);

  if (saveCourseData(newCoursesAfterDelete)) {
    return console.log(chalk.green(`DELETED: ${id} ${courseName[0].name}`));
  }
}

function joinCourse(args) {
  if (args.length !== 2) {
    console.log(chalk.bold.red(`ERROR: Must provide course ID and trainee ID`));
    return false;
  }
  const idCourse = Number(args[0]);
  if (isCourseExist(idCourse) !== true) {
    console.log(
      chalk.bold.red(`ERROR: Course with ID ${args[0]} does not exist`)
    );
    return false;
  }
  const idTrainee = Number(args[1]);
  if (isTraineeExist(idTrainee) !== true) {
    console.log(
      chalk.bold.red(`ERROR: Trainee with ID ${args[0]} does not exist`)
    );
    return false;
  }

  const courses = loadCourseData();
  const course = courses.filter((course) => course.id === idCourse);

  let count = 0;
  for (const course of courses) {
    for (let i = 0; i < course.participants.length; i++) {
      if (course.participants[i] === idTrainee) {
        count = count + 1;
      }
    }
  }
  if (count > 4) {
    console.log(
      chalk.bold.red(
        `ERROR: A trainee is not allowed to join more than 5 courses.`
      )
    );
    return false;
  }

  for (let i = 0; i < course[0].participants.length; i++) {
    if (idTrainee === course[0].participants[i]) {
      console.log(
        chalk.bold.red(`ERROR: The Trainee has already joined this course`)
      );
      return false;
    }
  }

  if (isCourseFull(course[0].participants)) {
    console.log(chalk.bold.red(`ERROR: Course is full`));
    return false;
  }

  const newCourses = courses.map((course) => {
    if (course.id === idCourse) {
      return {
        ...course,
        participants: [...course.participants, ...[idTrainee]],
      };
    }
    return course;
  });

  const traineeDetails = getTraineeById(idTrainee);
  if (saveCourseData(newCourses)) {
    return console.log(
      chalk.green(`${traineeDetails[0].firstName} Joined ${course[0].name}`)
    );
  }
}

function leaveCourse(args) {
  // TODO: Implement logic
}

function getCourse(args) {
  const id = Number(args);
  if (args.length !== 1) {
    console.log(chalk.bold.red(`ERROR: Must provide a ID`));
    return false;
  }
  if (isCourseExist(id) !== true) {
    console.log(chalk.bold.red(`ERROR: Course with ID ${args} does not exist`));
    return false;
  }

  const courses = loadCourseData();
  const course = courses.filter((course) => course.id === id);

  console.log(`${course[0].id} ${course[0].name} ${course[0].startDate}`);

  console.log(`Participants (${course[0].participants.length}):`);

  const allParticipantsIds = course[0].participants;

  let traineeDetails = [];
  for (let i = 0; i < allParticipantsIds.length; i++) {
    traineeDetails = getTraineeById(allParticipantsIds[i]);
    console.log(
      `- ${allParticipantsIds[i]} ${traineeDetails[0].firstName} ${traineeDetails[0].lastName}`
    );
  }
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
      return updateCourse(args);

    case 'DELETE':
      return deleteCourse(args);

    case 'JOIN':
      return joinCourse(args);

    case 'LEAVE':
      return leaveCourse(args);

    case 'GET':
      return getCourse(args);

    case 'GETALL':
      if (args.length !== 0) {
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

function validateDate(args, index) {
  const splitDate = args[index].split('-');
  const year = Number(splitDate[0]);
  const month = Number(splitDate[1]);
  const day = Number(splitDate[2]);

  if (splitDate.length !== 3 || args[index].length !== 10) {
    console.log(
      chalk.bold.red('ERROR: Invalid start date. Must be in yyyy-MM-dd format')
    );
    return false;
  } else if (year < 2020 || year > 3000) {
    console.log(
      chalk.bold.red('ERROR: Please provide a year between 2020 and 2999')
    );
    return false;
  } else if (month > 12 || month < 1) {
    console.log(chalk.bold.red('ERROR: Please provide a valid month (01-12)'));
    return false;
  } else if (day > 31 || day < 1) {
    console.log(chalk.bold.red('ERROR: Please provide a valid day (01-31)'));
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

function isCourseExist(id) {
  const courses = loadCourseData();
  const course = courses.filter((course) => course.id === id);
  if (course.length === 0) {
    return false;
  }
  return true;
}
