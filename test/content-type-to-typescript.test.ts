import { ContentType } from 'contentful';
import { compileFromContentTypes } from '../src/content-type-to-typescript';

import allFields from './resources/all-fields.json';
import description from './resources/description.json';
import { createContentTypes } from './resources/helpers';
import multipleTypes2 from './resources/multiple-types-with-non-unique-field-ids.json';
import multipleTypes from './resources/multiple-types.json';
import omittedField from './resources/omitted-fields.json';

async function macro(message: string, contentTypes: ContentType[]): Promise<void> {
  test(message, async () => {
    const actual = await compileFromContentTypes(contentTypes);
    expect(actual).toMatchSnapshot();
  });
}

macro('All fields', [allFields]);
macro('Content Type with omitted field', [omittedField]);
macro('Multiple types', multipleTypes);
macro('Multiple types with non unique field id', multipleTypes2);
macro('100 content types', createContentTypes(100));
macro('Parse descirption', [description]);
