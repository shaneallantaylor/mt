import { list } from '@keystone-next/keystone/schema';
import { text, relationship, select } from '@keystone-next/fields';

export const Photo = list({
  // access
  fields: {
    name: text({
      isRequired: true,
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    status: select({
      options: [
        { label: 'Published', value: 'PUBLISHED' },
        { label: 'Hidden', value: 'HIDDEN' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
  },
});
