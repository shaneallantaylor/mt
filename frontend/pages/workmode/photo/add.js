import CreatePhoto from '../../../components/CreatePhoto';
import PleaseSignIn from '../../../components/PleaseSignIn';

export default function AddPhotoPage() {
  return (
    <>
      <PleaseSignIn>
        <CreatePhoto />
      </PleaseSignIn>
    </>
  );
}
