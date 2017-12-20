# Content-type-to-typescript

This is a library to convert Contentful Content Types to the TS Definitions.

## Example

Input:

```json
{
  "name": "Category",
  "description": null,
  "displayField": "title",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Text",
      "localized": false,
      "required": true,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "icon",
      "name": "Icon",
      "type": "Link",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "linkType": "Asset"
    },
    {
      "id": "categoryDescription",
      "name": "Description",
      "type": "Text",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "simpleTextField",
      "name": "Simple text field",
      "type": "Symbol",
      "localized": true,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    }
  ],
  "sys": {
    "space": {
      "sys": {
        "type": "Link",
        "linkType": "Space",
        "id": "vu21149elxz0"
      }
    },
    "id": "6XwpTaSiiI2Ak2Ww0oi6qa",
    "type": "ContentType",
    "createdAt": "2017-10-02T14:42:27.014Z",
    "updatedAt": "2017-11-15T09:47:53.743Z",
    "createdBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "6mAdPrXPkyREm4vMnIbdQ8"
      }
    },
    "updatedBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "6mAdPrXPkyREm4vMnIbdQ8"
      }
    },
    "publishedCounter": 3,
    "version": 6,
    "publishedBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "6mAdPrXPkyREm4vMnIbdQ8"
      }
    },
    "publishedVersion": 5,
    "firstPublishedAt": "2017-10-02T14:42:27.614Z",
    "publishedAt": "2017-11-15T09:47:53.743Z"
  }
}
```

Output:

```ts
export interface AssetLink {
  type: string;
  linkType: string;
  id: string;
}

export interface Category {
  title: string;
  icon?: AssetLink;
  categoryDescription?: string;
  simpleTextField?: string;
}
```

## Installation

```
npm install content-type-to-typescript --save
```

## Usage

1. Using [contentful.js](https://github.com/contentful/contentful.js)

```js
const { createClient } = require('contentful');
const { compileFromContentTypes } = require('content-type-to-typescript');

const client = createClient({
    accessToken: ACCESS_TOKEN,
    space: SPACE_ID,
  });

const contentTypes = await client.getContentTypes();

const typings = await compileFromContentTypes(contentTypes.items);

console.log(typings);
```

2. Using JSON preview

Copy JSON Preview from [Contentful Web App](https://app.contentful.com/)

```js
import { compileFromContentTypes } from 'content-type-to-typescript';

const category = {
    name: 'Category',
    description: null,
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Text',
        localized: false,
        required: true,
        validations: [],
        disabled: false,
        omitted: false,
      },
    ],
  }

const typings = await compileFromContentTypes([category]);

console.log(typings);
```

```ts
compileFromContentTypes(
  contentTypes: Array<Partial<ContentType>>,
  options?: Partial<Options>
): Promise<string>
```

### ContentType

The structure of the Content Type is described here [Contentful data model](https://www.contentful.com/developers/docs/concepts/data-model/).

### Options

| Property      | Type   | Required? | Description                          |
| :------------ | :----- | :-------: | :----------------------------------- |
| bannerComment | String |           | A comment at the top of the response |

## Built with

* [json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript/)
* [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)

## License

MIT License - fork, modify and use however you want.
