import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import { ALL_PHOTOS_QUERY } from '../graphql/queries';
import { CREATE_PHOTO_MUTATION } from '../graphql/mutations';

export default function CreatePhoto() {
  const { inputs, handleChange } = useForm({
    name: '',
    description: '',
  });

  const [createPhoto, { loading, error, data }] = useMutation(
    CREATE_PHOTO_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PHOTOS_QUERY }],
    }
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createPhoto();
      }}
    >
      <label htmlFor="name">
        Name
        <input
          disabled={loading}
          aria-busy={loading}
          type="text"
          id="name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          id="description"
          name="description"
          value={inputs.description}
          onChange={handleChange}
          placeholder="description"
        />
      </label>
      <label htmlFor="image">
        Image
        <input type="file" id="image" name="image" onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
