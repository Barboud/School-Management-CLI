import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';

export function parseCommand(userInput) {
  const splitUserInput = userInput.trim().split(' ');

  const command = splitUserInput[0];
  const subCommand = splitUserInput[1];
  const parameters = splitUserInput.slice(2);

  return {
    command,
    subCommand,
    parameters,
  };
}

function validateCommand(command) {
  return command.command === 'TRAINEE' || command.command === 'COURSE';
}

function validateParameters(command) {
  return command.parameters.length < 4;
}

export function commandDispatcher(command) {
  if (!validateCommand(command) || !validateParameters(command)) {
    console.error('Enter a valid command!');
    return false;
  } else {
    if (command.command === 'TRAINEE') {
      return handleTraineeCommand(command.subCommand, command.parameters);
    } else {
      return handleCourseCommand(command.subCommand, command.parameters);
    }
  }
}
