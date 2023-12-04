<div align="center">

# Crud_App

> Webapp with crud operations built on top of **MERN** Stack

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Sunny-unik/Crud_App)

</div>

## Description

This app focused on implementing [**CRUD**](## "Create, Read, Update, Delete") operations. Users can create, update, list & delete student records.

## For Setup

### Prerequisites

- Node installed on your machine.
- MongoDB URI to connect with the Database.
- Check the extensions.json file in the .vscode directory some of these extensions are required to maintain code consistency.

### Setup Environment Variables on client side

Create a file named `.env` paste following variables:

```env
REACT_APP_API_URL=your_server_url
```

### Install frontend dependencies

Open a terminal in the project directory then run:

```bash
cd client
npm i
```

### Run development server for frontend

Run the following command inside client directory:

```bash
npm start
```

this command serves frontend on [http://localhost:3000](http://localhost:3000)

### Setup Environment Variables on server side

Create a file named `.env` paste following variables:

```env
MONGO_URI=your_mongodb_uri
PORT=4000
```

### Install backend dependencies

Open another terminal in the project directory then run:

```bash
cd server
npm i
```

### Run development server for backend

Run the following command inside server directory:

```bash
npm run watch
```

this command serves backend on [http://localhost:4000](http://localhost:4000)

## ⚖️ LICENSE

MIT © [Sunny-unik/Crud_App](LICENSE)
