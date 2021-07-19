import { list } from '@keystone-next/keystone/schema';
import { text, select, relationship, integer } from '@keystone-next/fields';
import slugify from '../utils/slugify.js';

export const Gallery = list({
  // access
  fields: {
    name: text({
      isUnique: true,
      isRequired: true,
    }),
    slug: text({
      isUnique: true,
      ui: {
        itemView: {
          fieldMode: () => 'hidden',
        },
        displayMode: 'input',
      },
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    order: integer(),
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
  hooks: {
    resolveInput: ({ resolvedData }) => {
      const { name } = resolvedData;
      if (name) {
        resolvedData.slug = slugify(name);
      }
      return resolvedData;
    },
  },
});
