import { parseCommand } from './command-parser.js';

import promptSync from 'prompt-sync';
const prompt = promptSync();
// This is the entry point of your application.
// Ask user for input, parse the command, and call the appropriate function from courseCommands.js or traineeCommands.js based on the command.

console.log('Welcome to the School Management\! \nType your command below.');
console.log('To exit the program, type "exit".');

// let input = '';
while (true) {
  const userInput = prompt('');
  if (userInput === 'exit') {
    console.log('Bye!');
    break;
  } else {
    console.log(parseCommand(userInput));
  }
}
