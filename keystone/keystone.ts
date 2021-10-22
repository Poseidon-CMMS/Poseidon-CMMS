import { config } from '@keystone-next/keystone';
import { statelessSessions } from '@keystone-next/keystone/session';

import { lists } from './schema';
import { withAuth, sessionSecret } from './auth';
import { insertSeedData } from './seed-data';

let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
});

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL || ' ',
      onConnect: async context => { 
        await insertSeedData(context); // TODO: esto quizas podria ser opcional
       },
      // Optional advanced configuration
      enableLogging: true,
      useMigrations: false,
      idField: { kind: 'uuid' },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
