import 'dotenv/config';
import { list } from '@keystone-next/keystone/schema';
import { relationship, text } from '@keystone-next/fields';

export const About = list({
  fields: {
    text: text({
      ui: {
        displayMode: 'textarea',
      },
      isRequired: true,
    }),
    background: relationship({
      ref: 'Photo',
      many: false,
      ui: { labelField: 'helper' },
    }),
  },
});
