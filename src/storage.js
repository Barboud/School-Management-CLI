import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/courses.json';

export function loadTraineeData() {
  try {
    const jsonString = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf8');
    const trainees = JSON.parse(jsonString);
    return trainees;
  } catch (error) {
    // file not exitis
    if (error.code === 'ENOENT') {
      console.log('File (trainees.json) not found');
      const trainees = [];
      return trainees;
    } else if (error.name === 'SyntaxError') {
      console.log('Invalid JSON format in trainees.json');
      const trainees = [];
      return trainees;
    }
  }
}

export function saveTraineeData() {
  // Use the fs module to write the updated trainee data back to the trainees.json file
}

export function loadCourseData() {
  try {
    const jsonString = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf8');
    const courses = JSON.parse(jsonString);
    return courses;
  } catch (error) {
    // file not exitis
    if (error.code === 'ENOENT') {
      console.log('File (courses.json) not found');
      const courses = [];
      return courses;
    } else if (error.name === 'SyntaxError') {
      console.log('Invalid JSON format in courses.json');
      const courses = [];
      return courses;
    }
  }
}

export function saveCourseData() {
  // TODO: Implement
}

console.log(loadTraineeData());
console.log(loadCourseData());
