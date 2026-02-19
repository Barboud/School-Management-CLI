import { parseCommand } from './command-parser.js';

import promptSync from 'prompt-sync';
const prompt = promptSync();
// This is the entry point of your application.
// Ask user for input, parse the command, and call the appropriate function from courseCommands.js or traineeCommands.js based on the command.

const userInput = prompt('Type anything! ');

parseCommand(userInput);
