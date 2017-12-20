// tslint:disable:object-literal-sort-keys
import { ContentType, Field } from 'contentful';
import { compileFromContentTypes } from '../src/content-type-to-typescript';
// tslint:disable-next-line:no-var-requires
const allFields = require('./helpers/allFields.json');

const DISCLAIMER = `/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND OR YOU WILL BE FIRED.
 */
`;

async function macro(message: string, json: Partial<ContentType>): Promise<void> {
  test(message, async () => {
    const actual = await compileFromContentTypes([json]);
    expect(actual).toMatchSnapshot();
  });
}

macro('all fields', allFields);

function fieldTestMacro(message: string, fieldInfo: Field, expectedFieldDef: string) {
  const json = {
    name: 'Brand',
    description: null,
    displayField: 'companyName',
    fields: [fieldInfo],
  };

  return macro(
    message,
    json,
    `export interface Brand {
  ${expectedFieldDef}
}`,
  );
}

describe('Text', () => {
  fieldTestMacro(
    'required',
    {
      id: 'companyName',
      name: 'Company name',
      type: 'Text',
      localized: false,
      required: true,
      // validations: [],
      disabled: false,
      omitted: false,
    },
    'companyName: string;',
  );

  fieldTestMacro(
    'not required',
    {
      id: 'companyName',
      name: 'Company name',
      type: 'Text',
      localized: false,
      required: false,
      // validations: [],
      disabled: false,
      omitted: false,
    },
    `companyName?: string;`,
  );
});

describe('Symbol', () => {
  fieldTestMacro(
    'required',
    {
      id: 'companyName',
      name: 'Company name',
      type: 'Symbol',
      localized: false,
      required: true,
      // validations: [],
      disabled: false,
      omitted: false,
    },
    'companyName: string;',
  );

  fieldTestMacro(
    'not required',
    {
      id: 'companyName',
      name: 'Company name',
      type: 'Symbol',
      localized: false,
      required: false,
      // validations: [],
      disabled: false,
      omitted: false,
    },
    `companyName?: string;`,
  );
});

describe('Link', () => {
  macro(
    'not required',
    {
      sys: {},
      name: 'Brand',
      description: null,
      displayField: 'companyName',
      fields: [
        {
          id: 'icon',
          name: 'Icon',
          type: 'Link',
          localized: false,
          required: false,
          disabled: false,
          omitted: false,
          linkType: 'Asset',
        },
      ],
    },
    `export interface Brand {
  icon?: IContentfulAssetLink;
}
export interface IContentfulAssetLink {
  /**
   * Link
   */
  type: string;
  /**
   * Asset
   */
  linkType: string;
  id: string;
}`,
  );
});
