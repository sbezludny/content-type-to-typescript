import { ContentType } from 'contentful';
import { range } from 'lodash';

export const createContentTypes = (length = 20): ContentType[] =>
  range(0, length).map((_, index) => {
    return {
      name: `ContentType${index}a`,
      description: `ContentType${index}a`,
      fields: [
        {
          id: 'singleLine',
          name: 'Single Line',
          type: 'Text',
          required: false,
          omitted: false,
        },
      ],
    } as ContentType;
  });
