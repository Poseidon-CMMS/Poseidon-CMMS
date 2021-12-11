import { list } from '@keystone-6/core';

import { text } from '@keystone-6/core/fields';

export const gpsAntennaType = list({
  ui: {
    isHidden: true,
    listView: {
      initialColumns: ['name'],
    },
  },
  fields: {
    name: text({           validation: {
            isRequired: true,
          }, isIndexed: 'unique' }),
  },
});
