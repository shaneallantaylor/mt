import CreatePhoto from '../../../components/CreatePhoto';
import PleaseSignIn from '../../../components/PleaseSignIn';

export default function CreatePhotoPage() {
  return (
    <>
      <PleaseSignIn>
        <CreatePhoto />
      </PleaseSignIn>
    </>
  );
}
