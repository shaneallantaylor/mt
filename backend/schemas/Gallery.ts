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
  hooks: {
    afterChange: (afterChangeProps) => {
      console.log('afterChangeProps fired', afterChangeProps);
      if (true) {
        console.log('true was true and you changed a gallery!');
      }
    },
    resolveInput: (resolveInputProps) => {
      console.log('resolveInputProps is', resolveInputProps);
      if (resolveInputProps.resolvedData.photos) {
        console.log(
          'you changed the photos! Here are their IDs',
          resolveInputProps.resolvedData.photos
        );
      }
      return resolveInputProps.resolvedData;
    },
  },
});
