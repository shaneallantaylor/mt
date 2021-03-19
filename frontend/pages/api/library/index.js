import nc from 'next-connect';
import { all } from '@/middlewares/index';

const handler = nc();

/* eslint-disable camelcase */
const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret,
} = new URL(process.env.CLOUDINARY_URL);

handler.use(all);

handler.get(async (req, res) => {
  fetch(`https://${api_key}:${api_secret}@api.cloudinary.com/v1_1/${cloud_name}/resources/image`)
    .then((fr) => fr.json())
    .then((data) => {
      res.send(JSON.stringify(data));
    });
});

export default handler;
