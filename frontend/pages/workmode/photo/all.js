import AllPhotos from '../../../components/AllPhotos';
import PleaseSignIn from '../../../components/PleaseSignIn';

export default function AddPhotoPage() {
  return (
    <>
      <PleaseSignIn>
        <AllPhotos />
      </PleaseSignIn>
    </>
  );
}
