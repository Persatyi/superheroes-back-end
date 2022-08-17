# superheroes-back-end

-Overview

This app allows the creation back-end for adding superheroes along with possibility to change pictures

### API

# Get all heroes `GET` /api/heroes/

- Parameters: No parameters
- Media type: aplication/json
- Response example value:

```javascript
[
  {
    _id: "62a86a9b3fc333ef2a601319",
    nickname: "Flash",
    realName: "Barry Allen",
    superpowers: "super speed",
    originDescription: "The Flash is a superhero",
    catchPhrase: "I am the fastest man alive",
    images: [{ name: "filename", path: "filepath", id: "file id" }],
  },
];
```

# Add new character `POST` /api/heroes/

- Paramaters: `body` -
  ```javascript
  {
    nickname: "Flash", <=== `required`
    realName: "Barry Allen", <=== `required`
    superpowers: "super speed", <=== `required`
    originDescription: "The Flash is a superhero", <=== `required`
    catchPhrase: "I am the fastest man alive", <=== `required`
    images: "your files" <=== `required`
  }
  ```
- Media type: multipart/form-data
- Response example value:

```javascript
[
  {
    _id: "62a86a9b3fc333ef2a601319",
    nickname: "Flash",
    realName: "Barry Allen",
    superpowers: "super speed",
    originDescription: "The Flash is a superhero",
    catchPhrase: "I am the fastest man alive",
    images: [{ name: "filename", path: "filepath", id: "file id" }],
  },
];
```

# Add new picture to character `PUT` /api/heroes/`:heroId`

- Paramaters: `heroId`, `body` -

```javascript
  {
  "image": "your file"
  }
```

- Media type: multipart/form-data
- Response example value:

```javascript
  {
  _id: "62a86a9b3fc333ef2a601319",
    nickname: "Flash",
    realName: "Barry Allen",
    superpowers: "super speed",
    originDescription: "The Flash is a superhero",
    catchPhrase: "I am the fastest man alive",
    images: [{ name: "filename", path: "filepath", id: "file id" }],
  }
```

# Remove picture from hero `DELETE` /api/heroes/`:heroId&:pictureName`

- Paramaters: `contactId&image`
- Media type: aplication/json
- Response example value:

```javascript
  {
  _id: "62a86a9b3fc333ef2a601319",
    nickname: "Flash",
    realName: "Barry Allen",
    superpowers: "super speed",
    originDescription: "The Flash is a superhero",
    catchPhrase: "I am the fastest man alive",
    images: [{ name: "filename", path: "filepath", id: "file id" }],
  }
```

# Remove hero `DELETE` /api/heroes/`:heroId`

- Paramaters: `contactId`
- Media type: aplication/json
- Response example value:

```javascript
{
  message: "Hero removed";
}
```
