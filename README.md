# Content-type-to-typescript

This is a tool to convert Contentful Models (Content Types) to the TS Definitions.
Provides a way to automate TS Definitions generation. Could be used as a library or cli tool.

[Try-it-out](https://content-type-to-typescript.netlify.com/)

## Installation

```
$ npm install content-type-to-typescript --save
```

## Usage

1. As CLI 

```
$ ./node_modules/.bin/content-type-typescript --access-token <token> --space <space> --output <filepath>
```

This command will generate TS Definition file. Could also be used as a npm script.

package.json:
```json
"scripts": {
  "sync-contentful-types": "content-type-typescript --access-token <token> --space <space> --output <filepath>"
}
```
Usage:

```
npm run sync-contentful-types
```

2. As a library using JSON preview from Web App

Copy JSON Preview from [Contentful Web App](https://app.contentful.com/)

```js
import { compileFromContentTypes } from 'content-type-to-typescript';

const category = {
    name: 'Category',
    description: null,
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Text',
        required: true,
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



## Example

Input:

```json
{
  "name": "Category",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Text",
      "required": true,
      "omitted": false
    },
    {
      "id": "icon",
      "name": "Icon",
      "type": "Link",
      "required": false,
      "omitted": false,
      "linkType": "Asset"
    },
    {
      "id": "categoryDescription",
      "name": "Description",
      "type": "Text",
      "required": false,
      "omitted": false
    },
    {
      "id": "simpleTextField",
      "name": "Simple text field",
      "type": "Symbol",
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    }
  ]
}
```

Output:

```ts
export interface Category {
  title: string;
  icon?: AssetLink;
  categoryDescription?: string;
  simpleTextField?: string;
}

export interface AssetLink {
  type: string;
  linkType: string;
  id: string;
}
```
## Built with

* [json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript/)
* [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)

## License

MIT License - fork, modify and use however you want.
