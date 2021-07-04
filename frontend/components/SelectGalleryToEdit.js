import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { ALL_PUBLISHED_GALLERIES_QUERY } from '../graphql/queries';
import WorkmodeContainer from './WorkmodeContainer';
import WorkmodeNav from './WorkmodeNav';

export default function SelectGalleryToEdit() {
  const { data, error, loading } = useQuery(ALL_PUBLISHED_GALLERIES_QUERY);

  if (loading) return <p>We are loading</p>;
  if (error) return <p>We are error!</p>;

  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Edit Galleries" />
      <section>
        <ul>
          {data.allGalleries.map((gallery) => (
            <li key={gallery.id} value={`${gallery.name}`}>
              <Link href={`/workmode/gallery/${gallery.id}`}>
                {gallery.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p>
          Here is the gallery list. Click on the wrench to go edit the pictures
          in the gallery. Press the 'i' icon to edit meta data (story and stuff)
        </p>
      </section>
    </WorkmodeContainer>
  );
}
