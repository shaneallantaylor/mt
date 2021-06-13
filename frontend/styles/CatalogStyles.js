import styled from 'styled-components';

const CatalogStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 100vw;
  grid-gap: 10px;

  img {
    max-width: 100%;
  }
`;

export default CatalogStyles;
