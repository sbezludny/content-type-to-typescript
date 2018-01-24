import program from 'commander';
import compileFromSpace from './compile-from-space';
import { logError } from './log';
// tslint:disable:no-console

const ensureArgNotEmpty = (value: string, message: string): void => {
  if (!value) {
    logError(message);
    process.exit(1);
  }
};

program
  .option(
    '--access-token <accessToken>',
    // tslint:disable-next-line:max-line-length
    'This is the access token for this space. You can generate the token in the Contentful web app. Learn more at https://www.contentful.com/developers/docs/references/authentication/',
  )
  .option('--space <space>', 'This is the space ID')
  .option('--output <output>', 'Output filename: e.g. -o ./types.ts');

program.on('--help', () => {
  console.log('  Examples:');
  console.log('');
  console.log(
    '    $ content-type-to-typescript --access-token <token> --space <space> --output <filename>',
  );
  console.log(
    '    $ content-type-to-typescript --access-token=<token> --space=<space> --output=<filename>',
  );
  console.log('');
});

program.parse(process.argv);

// tslint:disable:no-console

ensureArgNotEmpty(program.accessToken, 'Access token is missing.');
ensureArgNotEmpty(program.space, 'Space is missing.');
ensureArgNotEmpty(program.output, 'Output file path is missing.');

compileFromSpace({
  accessToken: program.accessToken,
  space: program.space,
  output: program.output,
})
  .then(() => process.exit())
  .catch(() => process.exit(1));
