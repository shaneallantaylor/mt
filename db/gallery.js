import { nanoid } from 'nanoid';

export async function insertGallery(
  db,
  {
    name, story, order, backgroundImage, navColor = 'dark',
  },
) {
  return db
    .collection('galleries')
    .insertOne({
      _id: nanoid(12),
      name,
      story,
      order,
      backgroundImage,
      navColor,
    })
    .then(({ ops }) => ops[0]);
}
