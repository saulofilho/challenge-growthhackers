# :star: My Favorites api :star:

The API is [REST API](https://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful").
Currently, return format for all endpoints is [JSON](https://json.org/ "JSON").

##  Technologies

This project was developed with the following technologies:

- [express](https://expressjs.com/)
- [jsonwebtoken](https://www.jsonwebtoken.io/)
- [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]

## How to use it?

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js][nodejs] or higher + [Yarn][yarn] or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/saulofilho/challenge-growthhackers

# Go into the repository
$ cd challenge-growthhackers && cd api

# Install dependencies
$ yarn

# Run the app
$ yarn dev
```

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

## API Rest

Post session to get token: `POST /login`

URL to query                   | Description
------------------------------ | ---------------------------
<code>POST</code> `/login`     | Return token.


## Example
**Request**

    POST /login

**Return**
``` json
  {
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5NTYxOTYxLCJleHAiOjE2MTk1NjI0NjF9.Ep9ouzPZzLs42xYHnADU5_IgVnDiBmPra7BirMJU2-Q"
  }
```

## Creator

**Saulo Filho**
- <https://github.com/saulofilho>
