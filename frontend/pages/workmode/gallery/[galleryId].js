import EditGallery from '../../../components/EditGallery';
import PleaseSignIn from '../../../components/PleaseSignIn';

export default function EditGalleryPage({ query }) {
  return (
    <>
      <PleaseSignIn>
        <EditGallery query={query} />
      </PleaseSignIn>
    </>
  );
}
