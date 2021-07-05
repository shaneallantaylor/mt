import Link from 'next/link';
import styled from 'styled-components';
import {
  CardContentContainer,
  RightCaret,
  WorkList,
  WorkItem,
  WorkCard,
} from '../styles';

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WorkHeadline = styled.div`
  border: 7px solid #00d800;
  margin-top: 30px;
  padding: 30px;
  font-size: 50px;
  aspect-ratio: 1;
  width: auto;
  white-space: pre;
  height: 230px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    padding-bottom: 16px;
  }
`;

export default function WorkmodeHome() {
  return (
    <>
      <FlexContainer>
        <WorkHeadline>
          <h1>🧪🥼🧪</h1>
        </WorkHeadline>
      </FlexContainer>
      <WorkList>
        <WorkItem>
          <Link href="/workmode/gallery">
            <WorkCard>
              <CardContentContainer>
                <h6>Edit Galleries</h6>
                <p>
                  Change the <strong>photos in the gallery</strong>, the{' '}
                  <strong>names of the galleries</strong>, the{' '}
                  <strong>publication status of the galleries</strong> and more.
                </p>
              </CardContentContainer>
              <RightCaret />
            </WorkCard>
          </Link>
        </WorkItem>
        <WorkItem>
          <Link href="/workmode/gallery">
            <WorkCard>
              <CardContentContainer>
                <h6>Add Gallery</h6>
                <p>Make a new gallery!</p>
              </CardContentContainer>
              <RightCaret />
            </WorkCard>
          </Link>
        </WorkItem>
        <WorkItem>
          <Link href="/workmode/photo/all">
            <WorkCard>
              <CardContentContainer>
                <h6>Edit Photos</h6>
                <p>
                  Change the{' '}
                  <strong>names and publication status of photos</strong> and
                  more.
                </p>
              </CardContentContainer>
              <RightCaret />
            </WorkCard>
          </Link>
        </WorkItem>
        <WorkItem>
          <Link href="/workmode/photo/add">
            <WorkCard>
              <CardContentContainer>
                <h6>Add Photo</h6>
                <p>Make a new photo appear on the site!</p>
              </CardContentContainer>
              <RightCaret />
            </WorkCard>
          </Link>
        </WorkItem>
        <WorkItem>
          <Link href="/workmode/about">
            <WorkCard>
              <CardContentContainer>
                <h6>Edit About Page</h6>
                <p>
                  Change the <strong>words</strong> and the{' '}
                  <strong>background photo</strong>.
                </p>
              </CardContentContainer>
              <RightCaret />
            </WorkCard>
          </Link>
        </WorkItem>
        <WorkItem>
          <Link href="/workmode/navigation">
            <WorkCard>
              <CardContentContainer>
                <h6>Edit Navigation</h6>
                <p>
                  Change the <strong>order of the galleries</strong> in the{' '}
                  <strong>navigation bar</strong>.
                </p>
              </CardContentContainer>
              <RightCaret />
            </WorkCard>
          </Link>
        </WorkItem>
        <WorkItem>
          <Link href="/workmode/gallery">
            <WorkCard>
              <CardContentContainer>
                <h6>Edit Homepage Background(s)</h6>
                <p>
                  Change the <strong>background image</strong> on the{' '}
                  <strong>homepage</strong>.
                </p>
              </CardContentContainer>
              <RightCaret />
            </WorkCard>
          </Link>
        </WorkItem>
      </WorkList>
    </>
  );
}
