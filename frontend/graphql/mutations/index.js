import gql from 'graphql-tag';

export const CREATE_PHOTO_MUTATION = gql`
  mutation CREATE_PHOTO_MUTATION(
    #which variables get passed in!
    $name: String!
    $description: String!
    $image: Upload!
  ) {
    createPhoto(
      data: { name: $name, description: $description, image: $image }
    ) {
      id
      description
      image {
        publicUrlTransformed
      }
    }
  }
`;

export const UPDATE_PHOTO_MUTATION = gql`
  mutation UPDATE_PHOTO_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $altText: String
  ) {
    updatePhoto(
      id: $id
      data: { name: $name, description: $description, altText: $altText }
    ) {
      id
      name
      description
      altText
      gallery {
        name
      }
    }
  }
`;

export const DELETE_PHOTO_MUTATION = gql`
  mutation DELETE_PHOTO_MUTATION($id: ID!) {
    deletePhoto(id: $id) {
      name
    }
  }
`;

export const UPDATE_GALLERY_MUTATION = gql`
  mutation UPDATE_GALLERY_MUTATION(
    $galleryId: ID!
    $galleryName: String
    $galleryDescription: String
    $galleryStatus: String
    $photosToConnect: [PhotoWhereUniqueInput]!
    $photosWithOrder: [PhotosUpdateInput]!
  ) {
    updateGallery(
      id: $galleryId
      data: {
        name: $galleryName
        description: $galleryDescription
        status: $galleryStatus
        photos: { disconnectAll: true, connect: $photosToConnect }
      }
    ) {
      id
      status
      name
    }
    updatePhotos(data: $photosWithOrder) {
      id
      name
      order
    }
  }
`;
