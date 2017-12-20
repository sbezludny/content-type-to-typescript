export interface JSONSchema {
  type?: string;
  title?: string;
  description?: string;
  additionalItems?: boolean | JSONSchema;
  additionalProperties: boolean | JSONSchema;
  items?: JSONSchema | JSONSchema[];
  definitions?: {
    [k: string]: JSONSchema;
  };
  properties?: {
    [k: string]: JSONSchema;
  };
  patternProperties?: {
    [k: string]: JSONSchema;
  };
  dependencies?: {
    [k: string]: JSONSchema | string[];
  };
  allOf?: JSONSchema[];
  anyOf?: JSONSchema[];
  oneOf?: JSONSchema[];
  not?: JSONSchema;
  required: string[];
}
