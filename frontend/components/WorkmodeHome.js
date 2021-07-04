import Link from 'next/link';
import styled from 'styled-components';

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

const WorkList = styled.ul`
  list-style: none;
  padding: 0 0 40px 0;
  margin: 40px auto 0;
  max-width: 800px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const WorkItem = styled.li`
  color: black;
  background: white;
  border: 1px solid #e6e6e6;
  outline: 0px inset black;
  box-shadow: var(--bs);
  border-radius: 3px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: var(--black);
  }
`;

const WorkCard = styled.div`
  cursor: pointer;
  position: relative;

  h6 {
    margin: 0;
    padding: 20px 20px 10px;
    font-size: 1.6rem;
  }

  p {
    font-size: 0.8rem;
    margin: 0;
    padding: 0 20px 20px;
    color: #5f5f5f;
  }
`;

const CardContentContainer = styled.div`
  padding-right: 80px;
`;

const RightCaret = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 50%;
  right: 30px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  transform: translateY(-50%) rotate(45deg) skew(10deg, 10deg);
  transition: 0.2s ease;

  ${WorkCard}:hover & {
    /* border-top-color: var(--primary); */
    /* border-right-color: var(--primary); */
    transform: translateY(-50%) rotate(45deg) skew(10deg, 10deg)
      translate(5px, -5px);
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
