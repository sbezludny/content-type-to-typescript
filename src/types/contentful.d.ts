import { Field } from 'contentful/index';

export { ContentType } from 'contentful/index';

export interface Field extends Field {
  items?: Field;
}
