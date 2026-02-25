import { describe, expect, test } from 'vitest';
import {
  parseCommand,
  validateCommand,
  validateArguments,
} from '../src/command-parser.js';

describe('Test command-parser functions', () => {
  test('should ignore leading and trailing spaces', () => {
    const command = '    TRAINEE ADD Nasser Salaaam    '; // Arrange
    const result = parseCommand(command); // Act
    // Assert
    expect(result.command).toBe('TRAINEE');
    expect(result.subCommand).toBe('ADD');
    expect(result.args).toEqual(['Nasser', 'Salaaam']);
  });

  test('returns false for lowercase command input', () => {
    const command = { command: 'Course', subCommand: 'GET', args: ['91234'] }; // Arrange
    const result = validateCommand(command); // Act
    expect(result).toBe(false); // Assert
  });
});

describe('Test validateArguments with real user commands', () => {
  test('COURSE GET 91234', () => {
    const command = { args: ['91234'] }; // Arrange
    const result = validateArguments(command); // Act
    expect(result).toBe(true); // Assert
  });

  test('should return false when args more than 3', () => {
    const command = { args: ['66116', 'Nasser', 'Ali', '2027-02-15'] }; // Arrange
    const result = validateArguments(command); // Act
    expect(result).toBe(false); // Assert
  });
});
