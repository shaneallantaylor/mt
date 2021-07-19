import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import arrayMove from 'array-move';
import EasySortNav from './EasySortNav';
import { Button, ExtraInfo } from '../styles';
import { UPDATE_GALLERY_ORDER_MUTATION } from '../graphql/mutations';
import { ALL_PUBLISHED_GALLERIES_QUERY } from '../graphql/queries';
import { renderSuccessToast } from './toasts';
import WorkmodeContainer from './WorkmodeContainer';
import WorkmodeNav from './WorkmodeNav';

const Instructions = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #8e8e8e;
  border-bottom: 1px solid #8e8e8e;
  margin-bottom: 20px;
  padding-bottom: 30px;
`;

export default function EditNavigation() {
  const { data: queryData, error: queryError } = useQuery(
    ALL_PUBLISHED_GALLERIES_QUERY
  );

  const [navList, setNavList] = useState(queryData?.allGalleries);
  const onSortEnd = (oldIndex, newIndex) => {
    setNavList((array) => arrayMove(array, oldIndex, newIndex));
  };

  const [
    updateNavItems,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_GALLERY_ORDER_MUTATION);

  async function handleSubmit(e) {
    e.preventDefault();
    const navItemsWithOrder = navList.map((navItem, idx) => ({
      id: navItem.id,
      data: {
        order: idx,
      },
    }));

    await updateNavItems({
      variables: { navItemsWithOrder },
      refetchQueries: [{ query: ALL_PUBLISHED_GALLERIES_QUERY }],
    });

    renderSuccessToast();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  if (queryError || mutationError) return null;
  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Edit Navigation" />
      <Instructions>
        <strong>Instructions:</strong> Below are your published galleries. Drag
        and drop them into the order you want. When you're done, click "Save
        Changes".
      </Instructions>
      <form onSubmit={handleSubmit} disabled={mutationLoading}>
        <EasySortNav onSortEnd={onSortEnd} navItems={navList} />
        <Button loading={mutationLoading.toString()} type="submit">
          {mutationLoading ? 'Working...' : 'Save Changes'}
        </Button>
      </form>
      <ExtraInfo>
        <p>
          Don't see a gallery here that you expected to see?{' '}
          <Link href="/workmode/gallery">Go edit your galleries</Link>!
        </p>
        <p>
          Oh, and 'About' will always be last. Yell at Shane if you want that
          changed.
        </p>
      </ExtraInfo>
    </WorkmodeContainer>
  );
}

EditNavigation.propTypes = {};
