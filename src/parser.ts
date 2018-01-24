import { compile } from 'json-schema-to-typescript';
import { chain, fromPairs } from 'lodash';
import { AssetLink, buildRef, EntryLink, Location } from './built-in-definitions';
import { ContentType, Field } from './types/contentful';
import { JSONSchema } from './types/json-schema';

function transformTitle(schema: JSONSchema, contentTypeInfo: ContentType) {
  return {
    ...schema,
    title: contentTypeInfo.name,
  };
}

function fieldToJsonSchema(fieldInfo: Field): any {
  let result: any;
  switch (fieldInfo.type) {
    case 'Symbol':
    case 'Text':
    case 'Date':
      result = {
        type: 'string',
      };
      break;
    case 'Number':
    case 'Integer':
      result = {
        type: 'number',
      };
      break;
    case 'Boolean':
      result = {
        type: 'boolean',
      };
      break;
    case 'Location':
      result = {
        $ref: buildRef(Location),
      };
      break;
    case 'Object':
      result = {
        type: 'object',
      };
      break;
    case 'Array':
      if (!fieldInfo.items) {
        throw new Error('Unexpected Content Type structure.');
      }
      result = {
        items: fieldToJsonSchema(fieldInfo.items),
        type: 'array',
      };
      break;
    case 'Link':
      if (fieldInfo.linkType === 'Asset') {
        result = {
          $ref: buildRef(AssetLink),
        };
      } else if (fieldInfo.linkType === 'Entry') {
        result = {
          $ref: buildRef(EntryLink),
        };
      } else {
        throw new Error('Unexpected Content Type structure.');
      }
      break;
    default:
      throw new Error(`Type ${fieldInfo.type} is not yet supported`);
  }

  return result;
}

function transformFields(contentTypeInfo: Partial<ContentType>): JSONSchema {
  const properties = chain(contentTypeInfo.fields)
    .filter((fieldInfo) => !fieldInfo.omitted)
    .map((fieldInfo) => [fieldInfo.id, fieldToJsonSchema(fieldInfo)])
    .fromPairs()
    .value();

  const required = chain(contentTypeInfo.fields)
    .filter((fieldInfo) => fieldInfo.required)
    .map((fieldInfo) => fieldInfo.id)
    .value();

  return {
    properties,
    required,
    additionalProperties: false,
  };
}

export function convertToJSONSchema(contentTypeInfo: Partial<ContentType>): JSONSchema {
  const resultSchema: JSONSchema = {
    title: contentTypeInfo.name,
    description: contentTypeInfo.description || contentTypeInfo.name,
    ...transformFields(contentTypeInfo),
  };

  return resultSchema;
}
