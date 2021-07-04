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

export const UPDATE_ABOUT_MUTATION = gql`
  mutation UPDATE_ABOUT_MUTATION($text: String!, $newBackgroundId: ID!) {
    updateAbout(
      id: "60d7a9cb3dcaf4174f345396"
      data: { text: $text, background: { connect: { id: $newBackgroundId } } }
    ) {
      text
      background {
        image {
          publicUrlTransformed
        }
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

export const UPDATE_GALLERY_ORDER_MUTATION = gql`
  mutation UPDATE_GALLERY_ORDER_MUTATION(
    $navItemsWithOrder: [GalleriesUpdateInput]!
  ) {
    updateGalleries(data: $navItemsWithOrder) {
      id
      name
      order
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;
