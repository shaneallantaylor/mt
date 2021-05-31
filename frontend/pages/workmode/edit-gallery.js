import { useLazyQuery } from '@apollo/client';
import Dnd from '../../components/Dnd';
import SelectGallery from '../../components/SelectGallery';
import { GALLERY_PHOTOS_BY_NAME_QUERY } from '../../components/Gallery';

export default function OldEditGalleryPage() {
  const [getPhotos, { data, error, loading }] = useLazyQuery(
    GALLERY_PHOTOS_BY_NAME_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  function handleOnChange(e) {
    const selectedGallery = e.currentTarget.value;
    getPhotos({ variables: { galleryName: selectedGallery } });
  }
  const photos = data?.allGalleries[0]?.photos || [];

  return (
    <div>
      <SelectGallery handleOnChange={handleOnChange} />
      <Dnd photos={photos} />
    </div>
  );
}
