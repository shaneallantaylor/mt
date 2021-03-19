import nc from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { all } from '@/middlewares/index';
import { updateUserById } from '@/db/index';
import { extractUser } from '@/lib/api-helpers';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
});
// const upload = multer({ dest: '/tmp' });
const upload = multer({ storage });
const handler = nc();

/* eslint-disable camelcase */
const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret,
} = new URL(process.env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

handler.use(all);

handler.get(async (req, res) => {
  // Filter out password
  if (!req.user) return res.json({ user: null });
  const { password, ...u } = req.user;
  res.json({ user: u });
});

handler.patch(upload.single('profilePicture'), async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  console.log({ req });

  let profilePicture;
  if (req.file) {
    console.log('we got a file you jackass');
    const contextMap = new Map();
    contextMap.set('alt', 'My alt text');
    contextMap.set('caption', 'my CAPTION text');
    // console.log('we got ourselves a file! Here is ther req:', req);
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 400,
      height: 400,
      crop: 'limit',
      use_filename: true,
      unique_filename: false,
      overwrite: false,
      format: 'webP',
      eager: [
        { width: 500, crop: 'scale' },
      ],
      tags: ['animal', 'party', '2020'],
    });
    profilePicture = image.secure_url;
  }
  const { name, bio } = req.body;

  const user = await updateUserById(req.db, req.user._id, {
    ...(name && { name }),
    ...(typeof bio === 'string' && { bio }),
    ...(profilePicture && { profilePicture }),
  });

  res.json({ user: extractUser(user) });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
