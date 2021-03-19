import { nanoid } from 'nanoid';

export async function insertGallery(db, {
  name, story, order, backgroundImage, navColor = 'dark',
}) {
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

export async function getGalleries(db) {
  return db
    .collection('galleries')
    .find()
    .sort({ order: 1 })
    .toArray();
}



export async function updateGalleryByName(db, name, update) {
  console.log('updateGalleryByName ->', name);
  console.log('updateGalleryByName ->', update);
  return db.collection('galleries').findOneAndUpdate(
    { name },
    { $set: update },
    { returnOriginal: false },
  ).then(({ value }) => value);
}
