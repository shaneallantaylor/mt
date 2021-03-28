import { photos, galleries } from './data';

export async function insertSeedData(ks: any) {
  // Keystone API changed, so we need to check for both versions to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

  const { mongoose } = adapter;

  console.log(`🌱 Inserting Seed Data: ${photos.length} Photos`);
  for (const photo of photos) {
    console.log(`  🛍️ Adding Photo : ${photo.name}`);
    await mongoose.model('Photo').create(photo);
  }
  console.log(`✅ Seed Data Inserted: ${photos.length} Photos`);

  console.log(`🌱 Inserting Seed Data: ${galleries.length} Galleries`);
  for (const gallery of galleries) {
    console.log(`  🛍️ Adding gallery : ${gallery.name}`);
    await mongoose.model('Gallery').create(gallery);
  }
  console.log(`✅ Seed Data Inserted: ${galleries.length} Galleries`);

  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
