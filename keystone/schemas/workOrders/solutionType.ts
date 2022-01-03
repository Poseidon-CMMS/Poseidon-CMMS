import { list } from '@keystone-6/core';

import { text } from '@keystone-6/core/fields';
import { isAdmin } from '../../utils/accessControl';

export const solutionType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['name'],
    },
  },
  fields: {
    name: text({
        validation: {
            isRequired: true,
        },
        isIndexed: 'unique' 
    }),
  },
  access: {
    operation: {
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    }
  },
});
