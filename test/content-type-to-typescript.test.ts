import { ContentType } from 'contentful';
import { compileFromContentTypes } from '../src/content-type-to-typescript';

import allFields from './resources/all-fields.json';
import omittedField from './resources/omitted-fields.json';

async function macro(message: string, contentType: ContentType): Promise<void> {
  test(message, async () => {
    const actual = await compileFromContentTypes([contentType]);
    expect(actual).toMatchSnapshot();
  });
}

macro('All fields', allFields);
macro('Content Type with omitted field', omittedField);
