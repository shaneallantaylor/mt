import gql from 'graphql-tag';

export const ABOUT_QUERY = gql`
  query ABOUT_QUERY {
    about: About(where: { id: "60d7a9cb3dcaf4174f345396" }) {
      text
      background {
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;

export const ALL_PHOTOS_QUERY = gql`
  query ALL_PHOTOS_QUERY {
    allPhotos {
      id
      description
      name
      altText
      image {
        publicUrlTransformed
      }
    }
  }
`;

export const ALL_PUBLISHED_GALLERIES_QUERY = gql`
  query ALL_PUBLISHED_GALLERIES_QUERY {
    allGalleries(where: { status_i: "Published" }, sortBy: name_ASC) {
      id
      description
      name
    }
  }
`;

export const ALL_GALLERIES_QUERY = gql`
  query ALL_GALLERIES_QUERY {
    allGalleries(sortBy: name_ASC) {
      id
      description
      name
    }
  }
`;

export const GALLERY_PHOTOS_BY_NAME_QUERY = gql`
  query GALLERY_PHOTOS_BY_NAME_QUERY($galleryName: String!) {
    allGalleries(where: { name_i: $galleryName }) {
      photos {
        id
        name
        description
        altText
        gallery {
          name
        }
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export const GALLERY_QUERY = gql`
  query GALLERY_QUERY($id: ID!) {
    Gallery(where: { id: $id }) {
      name
      description
      status
      photos {
        name
        id
        order
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export const GALLERY_QUERY_WITH_SORTED_PHOTOS = gql`
  query GALLERY_QUERY_WITH_SORTED_PHOTOS($id: ID!) {
    gallery: Gallery(where: { id: $id }) {
      name
      description
      status
    }
    sortedPhotos: allPhotos(
      where: { gallery: { id: $id } }
      sortBy: order_ASC
    ) {
      name
      id
      order
      image {
        publicUrlTransformed(transformation: { width: "200" })
      }
    }
  }
`;

export const PHOTO_QUERY = gql`
  query PHOTO_QUERY($id: ID!) {
    photo: Photo(where: { id: $id }) {
      name
      description
      altText
      gallery {
        name
      }
      image {
        publicUrlTransformed
      }
    }
  }
`;

export const SEARCH_PHOTOS_QUERY = gql`
  query SEARCH_PHOTOS_QUERY($searchTerm: String!) {
    results: allPhotos(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      description
      name
      image {
        publicUrlTransformed
      }
    }
  }
`;

export const GET_PHOTOS_WITH_NO_GALLERY = gql`
  query GET_PHOTOS_WITH_NO_GALLERY {
    possiblePhotos: allPhotos(
      where: { gallery_is_null: true }
      sortBy: order_ASC
    ) {
      name
      id
      order
      image {
        publicUrlTransformed
      }
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;
