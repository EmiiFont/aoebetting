# aoebetting

![CI](https://github.com/EmiiFont/aoebetting/workflows/CI/badge.svg)

- *Server directory structure*
- package.json  
- tsconfig.json typescript configuration file
- dist /        will contain the compiled JavaScript files
- node_modules/ packages installed by npm
- src/          will contain all of our TypeScript source code
  - config/         will contain our configuration files
  - controllers/    controller files that handle simple logic of http request of our app
  - services/	    service files that handle communication between api/database and controllers and domain logic
  - database        files that handle the communication with our database and repositories
  - lib/            misc. features that don't belong anywhere else
  - middleware/     middleware functions for our Express app
  - models/         classes to define the models used in our app
- server.ts         class to handle the Express server
- app.ts            Entry point of our app code

*Client directory structure*

-client
-└── src
- └── components
-  ├── component-name  (bet)
-  │   ├── hooks
-  │   │   ├── index.js
-  │   │   └── use-component-name.tsx
-  │   ├── component-name.css
-  │   ├── component-name.scss
-  │   ├── component-name-styles.tsx
-  │   ├── component-name.tsx
-  │   └── index.tsx
-└── index.tsx


to run app:
 1. npm install
    this will install all the dependencies.
    
 2. npm run dev (*run this in the root directory*)
	this will monitor changes in typescript files, compile them and restart the server
  
	default Server port 4000: http://localhost:4000 to see the api request.
  default Client port 4001: http://localhost:4001 to see the react client.

3. you can run Server and client individually by running npm run start inside server and client folder.
