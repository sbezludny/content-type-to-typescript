import { ContentType, Field } from 'contentful/index';
import { compile, Options } from 'json-schema-to-typescript';
import { chain, defaults, fromPairs, get, orderBy } from 'lodash';
import { buildRef, getByRef } from './built-in-definitions';
import { convertToJSONSchema } from './parser';
import { JSONSchema } from './types/json-schema';

const BANNER_COMMENT = `/**
* This file was automatically generated.
* DO NOT MODIFY IT BY HAND.
*/`;

export async function compileFromContentTypes(
  contentTypes: Array<Partial<ContentType>>,
  options: Partial<Options> = {},
): Promise<string> {
  const settings = defaults(
    {
      bannerComment: BANNER_COMMENT,
    },
    options,
  );

  const allDefinitions = includeRequiredDefinitions(
    contentTypes.map((ct) => convertToJSONSchema(ct)),
  );

  const resultSchema = {
    anyOf: allDefinitions.map((def) => ({ $ref: buildRef(def) })),
    definitions: chain(allDefinitions)
      .map((def) => [def.title, def])
      .fromPairs()
      .value(),
  };

  const res = await compile(resultSchema, EPHEMERAL_ROOT, settings);

  return cleanupEphemeralRoot(res);
}

const EPHEMERAL_ROOT = 'EphemeralContentfulSchemaRoot1';

function cleanupEphemeralRoot(input: string): string {
  return input.replace(new RegExp(`\n.+${EPHEMERAL_ROOT}.+`, 'gm'), '');
}

function getRefs(definition: JSONSchema): JSONSchema[] {
  return chain(definition.properties)
    .map((propSchema) => get(propSchema, '$ref'))
    .compact()
    .map((s) => getByRef(s))
    .compact()
    .value();
}

function includeRequiredDefinitions(definitions: JSONSchema[]): JSONSchema[] {
  const requiredBuiltInDefinitions: JSONSchema[] = chain(definitions)
    .map((def) => getRefs(def))
    .flatten()
    .value();

  const alphabetizedDefinitions = orderBy(definitions, ['title'], ['asc']);

  return alphabetizedDefinitions.concat(requiredBuiltInDefinitions);
}
