import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { ALL_GALLERIES_QUERY } from '../graphql/queries';
import WorkmodeNav from './WorkmodeNav';
import {
  ExtraInfo,
  RightCaret,
  WorkCard,
  WorkItem,
  WorkList,
  WorkmodeContainer,
} from '../styles';

export default function SelectGalleryToEdit() {
  const { data } = useQuery(ALL_GALLERIES_QUERY);

  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Edit Galleries" />
      <section>
        <WorkList>
          {data?.allGalleries.map((gallery) => (
            <WorkItem key={gallery.id}>
              <Link href={`/workmode/gallery/${gallery.id}`}>
                <WorkCard gallery published={gallery.status === 'PUBLISHED'}>
                  <h6>{gallery.name}</h6>
                  <RightCaret />
                </WorkCard>
              </Link>
            </WorkItem>
          ))}
        </WorkList>
      </section>
      <ExtraInfo>
        <p>
          Need to make a new gallery?{' '}
          <Link href="/workmode/gallery/add">Create one here</Link>!
        </p>
      </ExtraInfo>
    </WorkmodeContainer>
  );
}
