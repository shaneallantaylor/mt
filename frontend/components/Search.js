import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import debounce from 'lodash.debounce';
import { SEARCH_PHOTOS_QUERY } from '../graphql/queries';

export default function Search() {
  const [findPhotos, { loading, data, error }] = useLazyQuery(
    SEARCH_PHOTOS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const photos = data?.results || [];
  const findPhotosButChill = debounce(findPhotos, 400);
  resetIdCounter();
  const {
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    items: photos,
    onInputValueChange() {
      findPhotosButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange() {
      console.log('you SELECTED!');
    },
    itemToString: (item) => item?.name || '',
  });

  return (
    <>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for pictures by name!',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <div {...getMenuProps()}>
        {photos.map((photo) => (
          <div key={photo.id} {...getItemProps({ item: photo })}>
            {photo.name}
          </div>
        ))}
      </div>
    </>
  );
}
