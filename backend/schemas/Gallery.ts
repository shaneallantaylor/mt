import { list } from '@keystone-next/keystone/schema';
import { text, select, relationship } from '@keystone-next/fields';

export const Gallery = list({
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
    photos: relationship({
      ref: 'Photo.gallery',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'image', 'order'],
        linkToItem: true,
        hideCreate: true,
        removeMode: 'disconnect',
        listView: {
          fieldMode: () => 'read',
        },
      },
    }),
  },
});
