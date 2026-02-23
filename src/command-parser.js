import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';

export function parseCommand(userInput) {
  const splitUserInput = userInput.trim().split(' ');

  const command = splitUserInput[0];
  const subCommand = splitUserInput[1];
  const args = splitUserInput.slice(2);

  return {
    command,
    subCommand,
    args,
  };
}

function validateCommand(command) {
  return command.command === 'TRAINEE' || command.command === 'COURSE';
}

function validateArguments(command) {
  return command.args.length < 4;
}

export function commandDispatcher(command) {
  if (!validateCommand(command) || !validateArguments(command)) {
    console.error('Enter a valid command!');
    return false;
  } else {
    if (command.command === 'TRAINEE') {
      return handleTraineeCommand(command.subCommand, command.args);
    } else {
      return handleCourseCommand(command.subCommand, command.args);
    }
  }
}
