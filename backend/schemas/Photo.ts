import 'dotenv/config';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { list } from '@keystone-next/keystone/schema';
import {
  text,
  select,
  checkbox,
  relationship,
  integer,
} from '@keystone-next/fields';

export const cloudinary = {
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.CLOUD_KEY,
  apiSecret: process.env.CLOUD_SECRET,
  folder: 'mt',
};

export const Photo = list({
  fields: {
    name: text({
      isRequired: true,
    }),
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    altText: text(),
    backgroundImage: checkbox({
      defaultValue: false,
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
    order: integer(),
    gallery: relationship({
      ref: 'Gallery.photos',
      many: false,
      ui: { labelField: 'helper' },
    }),
  },
});
