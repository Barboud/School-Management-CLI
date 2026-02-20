import { parseCommand } from './command-parser.js';

import chalk from 'chalk';

import promptSync from 'prompt-sync';
const prompt = promptSync();

console.log(
  chalk.bold('Welcome to the School Management\! \nType your command below.')
);
console.log('To exit the program, type "exit".');

// let input = '';
while (true) {
  const userInput = prompt('> ');
  if (userInput === 'exit') {
    console.log('Bye!');
    break;
  } else {
    console.log(parseCommand(userInput));
  }
}
