import { fromPairs, map } from 'lodash';
import { JSONSchema } from './types/json-schema';

export const Location: JSONSchema = {
  title: 'Location',
  properties: {
    lon: {
      type: 'number',
      description: '',
      additionalProperties: false,
      required: [],
    },
    lat: {
      type: 'number',
      description: '',
      additionalProperties: false,
      required: [],
    },
  },
  required: ['lat', 'lon'],
  additionalProperties: false,
};

export const AssetLink: JSONSchema = {
  title: 'AssetLink',
  properties: {
    type: {
      type: 'string',
      description: '',
      additionalProperties: false,
      required: [],
    },
    linkType: {
      type: 'string',
      description: '',
      additionalProperties: false,
      required: [],
    },
    id: {
      type: 'string',
      additionalProperties: false,
      required: [],
    },
  },
  required: ['type', 'linkType', 'id'],
  additionalProperties: false,
};

export const EntryLink: JSONSchema = {
  title: 'EntryLink',
  properties: {
    type: {
      type: 'string',
      description: '',
      additionalProperties: false,
      required: [],
    },
    linkType: {
      type: 'string',
      description: '',
      additionalProperties: false,
      required: [],
    },
    id: {
      type: 'string',
      additionalProperties: false,
      required: [],
    },
  },
  required: ['type', 'linkType', 'id'],
  additionalProperties: false,
};

export const buildRef = (schema: JSONSchema) => {
  return `#/definitions/${schema.title}`;
};

export const getByRef = (ref: string): JSONSchema => {
  const lookup = fromPairs(map([Location, EntryLink, AssetLink], (def) => [buildRef(def), def]));

  return lookup[ref];
};
