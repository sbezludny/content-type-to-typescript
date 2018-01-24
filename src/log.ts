import chalk from 'chalk';

// tslint:disable:no-console
export const log = (message: string) => console.log(message);
export const logError = (message: string) => console.error(chalk.redBright(message));
export const logSuccess = (message: string) => console.log(chalk.greenBright(message));
