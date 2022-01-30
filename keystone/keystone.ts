/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-6/core';

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schema';

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from './auth';
import { insertSeedData } from './seed-data';

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL || ' ',
      onConnect: async context => { 
        const assetTypes = await context.query.asset_type.findMany({query: 'id name'});
        if(assetTypes.length === 0) //ya seedeamos?
          await insertSeedData(context, true); // TODO: esto quizas podria ser opcional
       },
      // Optional advanced configuration
      enableLogging: undefined,
      useMigrations: false,
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
      }
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
