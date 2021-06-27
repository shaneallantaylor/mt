import styled from 'styled-components';

const SocialLogo = styled.img`
  width: 20px;
  height: 20px;
`;

const IgLogo = styled(SocialLogo)`
  filter: grayscale(1) invert(1);
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 216px;
`;

const FlexSocials = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;

  a {
    line-height: 20px;
  }
`;

const EmailContainer = styled.div`
  text-align: center;
  overflow: hidden;
  font-size: 0.8rem;
  user-select: none;
`;

export default function SocialMedia() {
  return (
    <FlexContainer>
      <FlexSocials>
        <a
          href="https://www.instagram.com/meganpicturetaker"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IgLogo src="/ig.png" alt="Instagram" />
        </a>
        <a
          href="https://www.facebook.com/meganpicturetakerthompson"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialLogo src="/fb.png" alt="Facebook" />
        </a>
        <a
          href="https://twitter.com/meganthompson"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialLogo src="/tw.png" alt="Twitter" />
        </a>
        <a
          href="https://vimeo.com/user3589164"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialLogo src="/vm.png" alt="Vimeo" />
        </a>
      </FlexSocials>
      <EmailContainer>meganpicturetaker@gmail.com</EmailContainer>
    </FlexContainer>
  );
}
