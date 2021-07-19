import SelectPhotoToEdit from '../../../components/SelectPhotoToEdit';
import PleaseSignIn from '../../../components/PleaseSignIn';

export default function AllPhotosPage() {
  return (
    <>
      <PleaseSignIn>
        <SelectPhotoToEdit />
      </PleaseSignIn>
    </>
  );
}
