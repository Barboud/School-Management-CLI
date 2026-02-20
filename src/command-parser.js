export function parseCommand(userInput) {
  // TODO: Implement the logic to parse the user input and return an object with the command, subcommand, and arguments

  const trimmedUserInput = userInput.trim();
  const splitUserInput = trimmedUserInput.split(' ');
  if (
    splitUserInput[0].toUpperCase() !== 'TRAINEE' &&
    splitUserInput[0].toUpperCase() !== 'COURSE'
  ) {
    return false;
  }
  return true;
}
