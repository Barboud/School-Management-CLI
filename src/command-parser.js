export function parseCommand(userInput) {
  // TODO: Implement the logic to parse the user input and return an object with the command, subcommand, and arguments

  const trimmedUserInput = userInput.trim();
  const splitUserInput = trimmedUserInput.split(' ');
  if (splitUserInput.length > 5 || splitUserInput.length === 1) {
    return false;
  }
  const command = splitUserInput[0].toUpperCase();
  const subCommand = splitUserInput[1].toUpperCase();

  if (!determineEntities(command)) {
    return false;
  }

  const parameters = splitUserInput.slice(2);

  return {
    command,
    subCommand,
    parameters,
  };
}

function determineEntities(command) {
  if (command === 'TRAINEE' || command === 'COURSE') {
    return true;
  }
  return false;
}
