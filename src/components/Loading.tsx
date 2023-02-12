import { FadeLoader } from 'react-spinners';
import styled from 'styled-components';
import palette from '../utils/palette';
import searchLoadingSpinner from '../assets/searchLoadingSpinner.gif';

interface Props {
  variant: 'loop' | 'search'; // 종류
}
const SpinnerWrapper = styled.div`
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
`;

export default function Loading({ variant }: Props) {
  return (
    <SpinnerWrapper>
      {variant === 'loop' && (
        <FadeLoader
          color={palette.darkBrown}
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      )}
      {variant === 'search' && <img src={searchLoadingSpinner} alt="검색중" />}
    </SpinnerWrapper>
  );
}
