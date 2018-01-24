import { ContentType, createClient } from 'contentful';
import fs from 'fs';
import { compileFromContentTypes } from './content-type-to-typescript';
import { logError, logSuccess } from './log';

async function fetchContentTypes({
  accessToken,
  space,
}: {
  accessToken: string;
  space: string;
}): Promise<ContentType[]> {
  try {
    const client = createClient({
      accessToken,
      space,
    });
    const { items: contentTypes } = await client.getContentTypes();
    return contentTypes;
  } catch (err) {
    logError(err.response.data.message);

    throw err;
  }
}

async function compile(contentTypes: ContentType[]): Promise<string> {
  try {
    const ts = await compileFromContentTypes(contentTypes);
    return ts;
  } catch (err) {
    logError(err.message);
    throw err;
  }
}

function writeFile(output: string, ts: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(output, ts, (err) => {
      if (err) {
        logError(err.message);
        reject(err);
      } else {
        logSuccess('TypeScript Definitions were successfully created!');
        resolve();
      }
    });
  });
}

export default async function({
  accessToken,
  space,
  output,
}: {
  accessToken: string;
  space: string;
  output: string;
}) {
  const contentTypes = await fetchContentTypes({ accessToken, space });

  const ts = await compile(contentTypes);

  await writeFile(output, ts);
}
