import EditPhoto from '../../../components/EditPhoto';
import PleaseSignIn from '../../../components/PleaseSignIn';

export default function EditPhotoPage({ query }) {
  return (
    <>
      <PleaseSignIn>
        <EditPhoto query={query} />
      </PleaseSignIn>
    </>
  );
}
