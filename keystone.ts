/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-6/core';
import dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production') dotenv.config();

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schema';

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from './auth';
import { insertSeedData } from './seed-data';
const bodyParser = require('body-parser');
import { cbCreateHardwareIssue } from './rest/cbCreateHardwareIssue';

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL || ' ',
      onConnect: async context => { 
        const users = await context.query.user.findMany({query: 'id'});
        if(users.length === 0) //es la primera vez que abre keystone?
          await insertSeedData(context, true); // TODO: esto quizas podria ser opcional
       },
      // Optional advanced configuration
      enableLogging: undefined,
      useMigrations: true,
      idField: { kind: 'uuid' },
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    server: {
      cors: {
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        origin: process.env.CORS_FRONTEND_URL,
        credentials: true,
      },
      extendExpressApp: (app, createContext) => {
        app.use('/rest', bodyParser.json());
        app.use('/rest', async (req, res, next) => {
          (req as any).context = await createContext(req, res);
          next();
        });
        app.post('/rest/hardwareIssue', cbCreateHardwareIssue); //TODO autenticacion
      },
    },
    files: {
      upload: 'local',
      local: {
        storagePath: 'public/files',
        baseUrl: '/files',
      },
    },
    images: {
      upload: 'local',
      local: {
        storagePath: 'public/images',
        baseUrl: '/images',
      },
    }
  })
);
