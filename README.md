# Driven Pass

Driven Pass is a password manager API to store your passwords so you don't need to memorize all your passwords.

**This is a study project and should not be used as a final product.**

## Build

In order to build this API locally in your machine you'll need to install `node` and `npm`. With this you can clone this repository and execute `npm i` to install all dependencies.

After this you will need to create a `.env` file on the root of the project. There is a `.env.example` file so you know what to put in the `.env` file.

Once you installed the dependencies, and created the `.env` file you can run the development server by running `npm run dev` or, if you choose, you can build it first with `npm run build` and the start with node with `npm start` or `node dist/app.js`.

### Testing

If you are trying to test the API you will need to run `npx prisma migrate dev` to create the database in you machine, note that the env variable `DATABASE_URL` must be filled correctly to do so.

Once you have the database you can start the server and make your requests. If you want my pre-made tests you can import the `thunder-collection_drivenpass.json` file to a collection, create a env and link it to your .env file on thunder client. After this configuration you can _run all_ the collection with the server started.

## Features

On **every** route, if anything breaks internally the route will repond with status code 500.

On **every authenticated** route you will need to send a JWT token on the header of you request:

```js
{
  Authorization: 'Bearer ${token}', // token is a jwt token received on login
}
```

### Create account

You can create an account sending a POST request to `/sign-up` with a body:

```js
{
  email, // string with email format
  password, //string with 10 or more characters
}
```

If the body is sent incorrectly you will receive a 422 status code and a body with the joi validation error. If the email is in use you will receive a 409 with a message. If you succeed you will receive a 201 and a body with:

```js
{
  id, // integer number, identification of your user
  email, // the email you used to create the account
}
```

### Login

You can login to server sending a POST request to `/login` with a body:

```js
{
  email, // string with email format
  password, //string with 10 or more characters
}
```

If the body is sent incorrectly you will receive a 422 status code and a body with the joi validation error. If the email or password is incorrect you will receive a 401 with a message. If you succeed you will receive a 201 and a body with:

```js
{
  token, // string, jwt token
}
```

### Create a credential **authenticated**

You can create a credential of a url by sending a POST request to `/credentials` with a body:

```js
{
  title, // string
  url, // string with uri format
  username, // string
  password, // string
}
```

If the body or header is sent incorrectly you will receive a 422 status code and a body with the joi validation error. If the token is invalid you will receive a 401 with a message. If you succeed you will receive a 201 and a body with:

```js
{
  id, // integer identification of you credential
  title, // string
  url, // string with uri format
  username, // string
  ownerId, // integer, identification of the user linked with the credential
}
```

### Retrieve credentials **authenticated**

You can get a credential list by sending a GET request to `/credentials`.

If the header is sent incorrectly you will receive a 422 status code and a body with the joi validation error. If the token is invalid you will receive a 401 with a message. If you succeed you will receive a 200 and a body with:

```js
[
  {
    id, // integer identification of you credential
    title, // string
    url, // string with uri format
    username, // string
    password, // string decrypted
    ownerId, // integer, identification of the user linked with the credential
  },
  // ...
];
```

You can also get a single credential providing the credentialId to the route `/credentials/:credentialId`. The same status codes will be used plus 404 if the credentialId is not a number or a credential that doesn't exist; or 403 if you try to get a credential from another user. The body is the same except it's not a array.
