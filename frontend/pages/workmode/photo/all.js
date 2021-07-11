import SelectPhotoToEdit from '../../../components/SelectPhotoToEdit';
import PleaseSignIn from '../../../components/PleaseSignIn';

export default function AddPhotoPage() {
  return (
    <>
      <PleaseSignIn>
        <SelectPhotoToEdit />
      </PleaseSignIn>
    </>
  );
}
