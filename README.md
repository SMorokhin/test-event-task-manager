# Create empty project and install json-server
https://github.com/typicode/json-server
# 1. add app.js:
```
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
```
# 2. Create db.json file with the following structure:
```
{
  "employee": [
    {
      "id": 1,
      "fls": "fls",
      "photo": "photo path",
      "login": "login"
    }
  ],
  "eventCategory": [
    {
      "id": 1,
      "name": "name",
      "color": "color"
    }
  ],
  "event": [
    {
      "id": 1,
      "name": "name",
      "description": "description",
      "begDate": "begDate",
      "endDate": "endDate",
      "participant": "participant",
      "eventTypeId": 1,
      "repeat": false
    }
  ]
}

```

# Install

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
