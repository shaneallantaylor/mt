import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { getGalleries, insertGallery, updateGalleryByName } from '@/db/index';

const handler = nc();

handler.use(all);

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
  const galleries = await getGalleries(req.db);
  if (req.query.from && galleries.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of posts
    res.setHeader('cache-control', `public, max-age=${maxAge}`);
  }

  res.send({ galleries });
});

handler.post(async (req, res) => {
  // if (!req.user) {
  //   return res.status(401).send('unauthenticated');
  // }

  // !TODO: Write error handling to ensure Megan inputs everything!
  // if (!req.body.content) return res.status(400).send('You must write something');
  // name, story, order, backgroundImage, navColor = 'dark',
  const gallery = await insertGallery(req.db, {
    name: req.body.name,
    story: req.body.story,
    order: req.body.order,
    backgroundImage: req.body.backgroundImage,
    navColor: req.body.navColor,
  });

  return res.json({ gallery });
});

handler.patch(async (req, res) => {
  // TODO: Right now, the images get added as a sting (via postman).
  // It should be an array of strings

  const { images } = req.body;
  const updatedGallery = await updateGalleryByName(req.db, req.body.name, {
    ...(images && { images }),
  });

  return res.json({ updatedGallery });
});

export default handler;
