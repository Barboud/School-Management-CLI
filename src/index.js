import { parseCommand, commandDispatcher } from './command-parser.js';

import chalk from 'chalk';

import promptSync from 'prompt-sync';
const prompt = promptSync();

console.log(
  chalk.bold('Welcome to the School Management\! \nType your command below.')
);
console.log('To exit the program, type "QUIT" or "q".');

// let input = '';
while (true) {
  const userInput = prompt('> ');
  if (userInput === 'QUIT' || userInput === 'q') {
    console.log('Bye!');
    break;
  } else {
    const command = parseCommand(userInput);
    commandDispatcher(command);
  }
}
