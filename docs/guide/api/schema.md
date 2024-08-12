# BEPP API

> Version 1.3.2

API documentation for BEPP - A Cross-Browser Extension Builder

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| POST | [/exts/convert](#postextsconvert) | Convert extension Data to selected browser extensions |
| GET | [/exts/convert/get](#getextsconvertget) | Get all converted extensions IDS |
| GET | [/exts/convert/get/{id}](#getextsconvertgetid) | Get converted Zip extensions by passing ID |
| GET | [/exts/download](#getextsdownload) | Download File or directory from server [COMING SOON] |
| POST | [/exts/get](#postextsget) | Get extension Data from URL or from local File |
| GET | [/exts/search](#getextssearch) | Get extensions data array from Chrome, Firefox and edge webstores |
| GET | [/facts/all](#getfactsall) | Get all facts |
| GET | [/facts/random](#getfactsrandom) | Get Random fact |
| GET | [/health](#gethealth) | Check api health status |

## Reference Table

| Name | Path | Description |
| --- | --- | --- |

## Path Details

***

### [POST]/exts/convert

- Summary  
Convert extension Data to selected browser extensions

- Description  
Convert your extension to any browser using BEPP.

#### RequestBody

- application/json

```ts
{
  data: Partial({
     title: string
     manifestVersion: Partial(number) & Partial(number)
     type: Partial(string) & Partial(string)
     browsersAllowed: {
     }
     files: string
     iconURL?: string
     from: enum[local]
     data: {
       path?: string
     }
   }) & Partial({
     title: string
     manifestVersion: Partial(number) & Partial(number)
     type: Partial(string) & Partial(string)
     browsersAllowed: {
     }
     files: string
     iconURL?: string
     from: enum[url]
     data: {
       store: Partial(string) & Partial(string) & Partial(string)
       url: string
     }
   })
  outputPath?: string
  zip?: boolean
  remove?: boolean
}
```

#### Responses

- 200 Successfully fetched data

`text/plain`

```ts
{
  "type": "string"
}
```

- 400 Bad request

`application/json`

```ts
{
  status: enum[400]
  id: string
  message: string
  error: {
  }
  help: string
}
```

- 500 Internal Server Error

`application/json`

```ts
{
  status: enum[500]
  id: string
  message: string
  error: {
  }
  help: string
}
```

***

### [GET]/exts/convert/get

- Summary  
Get all converted extensions IDS

#### Responses

- 200 Successfully fetched data

`application/json`

```ts
string[]
```

- 400 Bad request

`application/json`

```ts
{
  status: enum[400]
  id: string
  message: string
  error: {
  }
  help: string
}
```

- 500 Internal Server Error

`application/json`

```ts
{
  status: enum[500]
  id: string
  message: string
  error: {
  }
  help: string
}
```

***

### [GET]/exts/convert/get/{id}

- Summary  
Get converted Zip extensions by passing ID

- Description  
Get the converted Zip extensions by passing the corresponding ID created in the conversion process

#### Responses

- 200 Successfull request

`application/zip`

```ts
{}
```

- 400 Bad request

`application/json`

```ts
{
  status: enum[400]
  id: string
  message: string
  error: {
  }
  help: string
}
```

- 500 Internal Server Error

`application/json`

```ts
{
  status: enum[500]
  id: string
  message: string
  error: {
  }
  help: string
}
```

***

### [GET]/exts/download

- Summary  
Download File or directory from server [COMING SOON]

- Description  
Use this function only if your backend is separated from your front for download extension ZIP.

#### Parameters(Query)

```ts
downloadPath?: string
```

#### Responses

- 200 Successfully fetched data

`application/json`

```ts
{
  ok: enum[true]
  downloadPath?: string
}
```

- 400 Bad request

`application/json`

```ts
{
  status: enum[400]
  id: string
  message: string
  error: {
  }
  help: string
}
```

- 500 Internal Server Error

`application/json`

```ts
{
  status: enum[500]
  id: string
  message: string
  error: {
  }
  help: string
}
```

***

### [POST]/exts/get

- Summary  
Get extension Data from URL or from local File

- Description  
Get extension Data from URL or from local File

#### RequestBody

- application/json

```ts
{
  "anyOf": [
    {
      "type": "object",
      "properties": {
        "value": {
          "type": "object",
          "properties": {
            "fileName": {
              "type": "string"
            },
            "fileType": {
              "type": "string"
            },
            "fileBase64Data": {
              "type": "string"
            }
          },
          "required": [
            "fileName",
            "fileType",
            "fileBase64Data"
          ]
        },
        "from": {
          "type": "string",
          "enum": [
            "local"
          ]
        }
      },
      "required": [
        "value",
        "from"
      ]
    },
    {
      "type": "object",
      "properties": {
        "value": {
          "anyOf": [
            {
              "type": "object",
              "properties": {
                "store": {
                  "type": "string",
                  "enum": [
                    "mozilla"
                  ]
                },
                "title": {
                  "type": "string"
                },
                "id": {
                  "type": "string"
                },
                "url": {
                  "type": "string"
                },
                "version": {
                  "type": "string"
                },
                "categories": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                },
                "rating": {
                  "type": "object",
                  "properties": {
                    "average": {
                      "type": "number"
                    },
                    "url": {
                      "type": "string"
                    },
                    "comments": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "average",
                    "url",
                    "comments"
                  ]
                },
                "authors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "url": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "name",
                      "url"
                    ]
                  }
                },
                "users": {
                  "type": "number"
                },
                "downloadURL": {
                  "type": "string"
                },
                "iconURL": {
                  "type": "string"
                }
              },
              "required": [
                "store",
                "title",
                "id",
                "url",
                "version",
                "categories",
                "description",
                "rating",
                "authors",
                "users",
                "downloadURL"
              ]
            },
            {
              "type": "object",
              "properties": {
                "store": {
                  "type": "string",
                  "enum": [
                    "mozilla"
                  ]
                },
                "title": {
                  "type": "string"
                },
                "id": {
                  "type": "string"
                },
                "url": {
                  "type": "string"
                },
                "version": {
                  "type": "string"
                },
                "categories": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                },
                "rating": {
                  "type": "object",
                  "properties": {
                    "average": {
                      "type": "number"
                    },
                    "url": {
                      "type": "string"
                    },
                    "comments": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "average",
                    "url",
                    "comments"
                  ]
                },
                "authors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "url": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "name",
                      "url"
                    ]
                  }
                },
                "users": {
                  "type": "number"
                },
                "downloadURL": {
                  "type": "string"
                },
                "iconURL": {
                  "type": "string"
                }
              },
              "required": [
                "store",
                "title",
                "id",
                "url",
                "version",
                "categories",
                "description",
                "rating",
                "authors",
                "users",
                "downloadURL"
              ]
            },
            {
              "type": "object",
              "properties": {
                "store": {
                  "type": "string",
                  "enum": [
                    "edge"
                  ]
                },
                "id": {
                  "type": "string"
                },
                "url": {
                  "type": "string"
                },
                "downloadURL": {
                  "type": "string"
                },
                "title": {
                  "type": "string"
                },
                "iconURL": {
                  "type": "string"
                },
                "rating": {
                  "type": "object",
                  "properties": {
                    "average": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "average"
                  ]
                },
                "description": {
                  "type": "string"
                }
              },
              "required": [
                "store",
                "id",
                "url",
                "downloadURL",
                "title",
                "iconURL",
                "rating",
                "description"
              ]
            },
            {
              "type": "object",
              "properties": {
                "store": {
                  "type": "string",
                  "enum": [
                    "edge"
                  ]
                },
                "id": {
                  "type": "string"
                },
                "title": {
                  "type": "string"
                },
                "url": {
                  "type": "string"
                },
                "downloadURL": {
                  "type": "string"
                }
              },
              "required": [
                "store",
                "id",
                "title",
                "url",
                "downloadURL"
              ]
            },
            {
              "type": "object",
              "properties": {
                "store": {
                  "type": "string",
                  "enum": [
                    "edge"
                  ]
                },
                "id": {
                  "type": "string"
                },
                "url": {
                  "type": "string"
                },
                "downloadURL": {
                  "type": "string"
                },
                "title": {
                  "type": "string"
                },
                "iconURL": {
                  "type": "string"
                },
                "rating": {
                  "type": "object",
                  "properties": {
                    "average": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "average"
                  ]
                },
                "description": {
                  "type": "string"
                }
              },
              "required": [
                "store",
                "id",
                "url",
                "downloadURL",
                "title",
                "iconURL",
                "rating",
                "description"
              ]
            },
            {
              "type": "object",
              "properties": {
                "store": {
                  "type": "string",
                  "enum": [
                    "chrome"
                  ]
                },
                "title": {
                  "type": "string"
                },
                "id": {
                  "type": "string"
                },
                "url": {
                  "type": "string"
                },
                "category": {
                  "type": "string"
                },
                "categoryNo": {
                  "type": "string"
                },
                "coverURL": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "ifEstablish": {
                  "type": "string"
                },
                "ifFeatured": {
                  "type": "string"
                },
                "rating": {
                  "type": "string"
                },
                "reviewCount": {
                  "type": "string"
                },
                "userCount": {
                  "type": "string"
                },
                "downloadURL": {
                  "type": "string"
                },
                "iconURL": {
                  "type": "string"
                }
              },
              "required": [
                "store",
                "title",
                "id",
                "url",
                "category",
                "categoryNo",
                "coverURL",
                "description",
                "ifEstablish",
                "ifFeatured",
                "rating",
                "reviewCount",
                "userCount",
                "downloadURL"
              ]
            },
            {
              "type": "object",
              "properties": {
                "store": {
                  "type": "string",
                  "enum": [
                    "chrome"
                  ]
                },
                "id": {
                  "type": "string"
                },
                "title": {
                  "type": "string"
                },
                "url": {
                  "type": "string"
                },
                "downloadURL": {
                  "type": "string"
                }
              },
              "required": [
                "store",
                "id",
                "title",
                "url",
                "downloadURL"
              ]
            },
            {
              "type": "object",
              "properties": {
                "store": {
                  "type": "string",
                  "enum": [
                    "chrome"
                  ]
                },
                "title": {
                  "type": "string"
                },
                "id": {
                  "type": "string"
                },
                "url": {
                  "type": "string"
                },
                "category": {
                  "type": "string"
                },
                "categoryNo": {
                  "type": "string"
                },
                "coverURL": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "ifEstablish": {
                  "type": "string"
                },
                "ifFeatured": {
                  "type": "string"
                },
                "rating": {
                  "type": "string"
                },
                "reviewCount": {
                  "type": "string"
                },
                "userCount": {
                  "type": "string"
                },
                "downloadURL": {
                  "type": "string"
                },
                "iconURL": {
                  "type": "string"
                }
              },
              "required": [
                "store",
                "title",
                "id",
                "url",
                "category",
                "categoryNo",
                "coverURL",
                "description",
                "ifEstablish",
                "ifFeatured",
                "rating",
                "reviewCount",
                "userCount",
                "downloadURL"
              ]
            }
          ]
        },
        "from": {
          "type": "string",
          "enum": [
            "url"
          ]
        }
      },
      "required": [
        "value",
        "from"
      ]
    }
  ]
}
```

#### Responses

- 200 Successfully fetched data

`application/json`

```ts
{
  "anyOf": [
    {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "manifestVersion": {
          "anyOf": [
            {
              "type": "number",
              "enum": [
                2
              ]
            },
            {
              "type": "number",
              "enum": [
                3
              ]
            }
          ]
        },
        "type": {
          "anyOf": [
            {
              "type": "string",
              "enum": [
                "chromium"
              ]
            },
            {
              "type": "string",
              "enum": [
                "firefox"
              ]
            }
          ]
        },
        "browsersAllowed": {
          "type": "object",
          "additionalProperties": {
            "type": "boolean"
          }
        },
        "files": {
          "type": "string"
        },
        "iconURL": {
          "type": "string"
        },
        "from": {
          "type": "string",
          "enum": [
            "local"
          ]
        },
        "data": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          }
        }
      },
      "required": [
        "title",
        "manifestVersion",
        "type",
        "browsersAllowed",
        "files",
        "from",
        "data"
      ]
    },
    {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "manifestVersion": {
          "anyOf": [
            {
              "type": "number",
              "enum": [
                2
              ]
            },
            {
              "type": "number",
              "enum": [
                3
              ]
            }
          ]
        },
        "type": {
          "anyOf": [
            {
              "type": "string",
              "enum": [
                "chromium"
              ]
            },
            {
              "type": "string",
              "enum": [
                "firefox"
              ]
            }
          ]
        },
        "browsersAllowed": {
          "type": "object",
          "additionalProperties": {
            "type": "boolean"
          }
        },
        "files": {
          "type": "string"
        },
        "iconURL": {
          "type": "string"
        },
        "from": {
          "type": "string",
          "enum": [
            "url"
          ]
        },
        "data": {
          "type": "object",
          "properties": {
            "store": {
              "anyOf": [
                {
                  "type": "string",
                  "enum": [
                    "chrome"
                  ]
                },
                {
                  "type": "string",
                  "enum": [
                    "edge"
                  ]
                },
                {
                  "type": "string",
                  "enum": [
                    "mozilla"
                  ]
                }
              ]
            },
            "url": {
              "type": "string"
            }
          },
          "required": [
            "store",
            "url"
          ]
        }
      },
      "required": [
        "title",
        "manifestVersion",
        "type",
        "browsersAllowed",
        "files",
        "from",
        "data"
      ]
    }
  ]
}
```

- 400 Bad request

`application/json`

```ts
{
  status: enum[400]
  id: string
  message: string
  error: {
  }
  help: string
}
```

- 500 Internal Server Error

`application/json`

```ts
{
  status: enum[500]
  id: string
  message: string
  error: {
  }
  help: string
}
```

***

### [GET]/exts/search

- Summary  
Get extensions data array from Chrome, Firefox and edge webstores

#### Parameters(Query)

```ts
// Add value to search
value: string
```

#### Responses

- 200 Successfully fetched data

`application/json`

```ts
undefined?: Partial({
   store: enum[mozilla]
   title: string
   id: string
   url: string
   version: string
   categories?: string[]
   description: string
   rating: {
     average: number
     url: string
     comments: number
   }
   authors: {
     name: string
     url: string
   }[]
   users: number
   downloadURL: string
   iconURL?: string
 }) & Partial({
   store: enum[mozilla]
   title: string
   id: string
   url: string
   version: string
   categories?: string[]
   description: string
   rating: {
     average: number
     url: string
     comments: number
   }
   authors: {
     name: string
     url: string
   }[]
   users: number
   downloadURL: string
   iconURL?: string
 }) & Partial({
   store: enum[edge]
   id: string
   url: string
   downloadURL: string
   title: string
   iconURL: string
   rating: {
     average: string
   }
   description: string
 }) & Partial({
   store: enum[edge]
   id: string
   title: string
   url: string
   downloadURL: string
 }) & Partial({
   store: enum[edge]
   id: string
   url: string
   downloadURL: string
   title: string
   iconURL: string
   rating: {
     average: string
   }
   description: string
 }) & Partial({
   store: enum[chrome]
   title: string
   id: string
   url: string
   category: string
   categoryNo: string
   coverURL: string
   description: string
   ifEstablish: string
   ifFeatured: string
   rating: string
   reviewCount: string
   userCount: string
   downloadURL: string
   iconURL?: string
 }) & Partial({
   store: enum[chrome]
   id: string
   title: string
   url: string
   downloadURL: string
 }) & Partial({
   store: enum[chrome]
   title: string
   id: string
   url: string
   category: string
   categoryNo: string
   coverURL: string
   description: string
   ifEstablish: string
   ifFeatured: string
   rating: string
   reviewCount: string
   userCount: string
   downloadURL: string
   iconURL?: string
 })[]
```

- 400 Bad request

`application/json`

```ts
{
  status: enum[400]
  id: string
  message: string
  error: {
  }
  help: string
}
```

- 500 Internal Server Error

`application/json`

```ts
{
  status: enum[500]
  id: string
  message: string
  error: {
  }
  help: string
}
```

***

### [GET]/facts/all

- Summary  
Get all facts

#### Parameters(Query)

```ts
// Select language es,ca,en
lang?: Partial(string) & Partial(string) & Partial(string)
```

#### Responses

- 200 Successfully fetched data

`application/json`

```ts
{
  phrase: string
  link: string
}[]
```

- 400 Bad request

`application/json`

```ts
{
  status: enum[400]
  id: string
  message: string
  error: {
  }
  help: string
}
```

- 500 Internal Server Error

`application/json`

```ts
{
  status: enum[500]
  id: string
  message: string
  error: {
  }
  help: string
}
```

***

### [GET]/facts/random

- Summary  
Get Random fact

#### Parameters(Query)

```ts
// Select language es,ca,en
lang?: Partial(string) & Partial(string) & Partial(string)
```

#### Responses

- 200 Successfully fetched data

`application/json`

```ts
{
  phrase: string
  link: string
}
```

- 400 Bad request

`application/json`

```ts
{
  status: enum[400]
  id: string
  message: string
  error: {
  }
  help: string
}
```

- 500 Internal Server Error

`application/json`

```ts
{
  status: enum[500]
  id: string
  message: string
  error: {
  }
  help: string
}
```

***

### [GET]/health

- Summary  
Check api health status

- Description  
Check if your API goes into trouble.

#### Responses

- 200 Successfully fetched data

`application/json`

```ts
{
  ok: enum[true]
  bepp: enum[true]
}
```

- 400 Bad request

`application/json`

```ts
{
  status: enum[400]
  id: string
  message: string
  error: {
  }
  help: string
}
```

- 500 Internal Server Error

`application/json`

```ts
{
  status: enum[500]
  id: string
  message: string
  error: {
  }
  help: string
}
```

## References