# Customer Support Center

This application is aimed to showcase a customer support center where customers can return products through a form, customer support can add, edit and remove Support Agents and be able to assign Support agents to a specific case.

## Tech stack

Mern stack with Typescript is used.
TypeScript, NodeJS w/ express, React & MongoDB

## Run the application (Backend is run on port 4000 and the UI on port 3000)

First of all you need to add env files to corresponding folders. In the env file in the api folder, add the following properties:

### `PORT=4000`

### `DB_NAME=mongodb+srv://admin:admin@cluster0.vjwtamg.mongodb.net/customer-support-center?retryWrites=true&w=majority`

then run the following commands:

### `npm i`
### `npm run dev`

Secondly, add the following properties in the env file in UI folder:

### `REACT_APP_API_BASE_URL=http://localhost:4000/api/v1`

### `APP_BASE_URL=http://localhost:3000/`

then run the following commands:

### `npm i`

### `npm start`

## Navigation

Actor (Customer Support):
When the app is running correctly, you should be prompted with the index page and a sidebar menu.
From the sidebar menu you can add Support Agents which will be shown as a list below. After adding your first agent
you'll be redirected to that agent's detail page. From there you can do multiple actions - edit, delete and assign
an agent to a ticket. When an agent is assigned to a ticket, the resolve button will be enabled and if pressed, the
agent has resolved it and is available for the next ticket.

Actor (Customer):

- Navigate to http://localhost:3000/support
- From there you will be prompted with a form for returning products
- When clicking "post ticket" button you will be redirected to a thank you page.

Actor (Support Agent / Customer Support):
- Navigate back to localhost:3000
- Created ticket will be shown in the dropdown list

------------------
It took me roughly ~16 hours to do this. Given limitations due to work and other circumstances,
the following scenarios are left to do.

### Todo
Clear inputs and validations in frontend,
Handle automatically assigned ticket (could use websockets)
Unit tests
Improved typing
More refactoring