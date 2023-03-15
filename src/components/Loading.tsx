import styled from 'styled-components';
import searchLoadingSpinner from '../assets/searchLoadingSpinner.gif';
import loopLoadingSpinner from '../assets/loopLoadingSpinner.gif';
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
      {variant === 'loop' && <img src={loopLoadingSpinner} alt="로딩중" />}
      {variant === 'search' && <img src={searchLoadingSpinner} alt="검색중" />}
    </SpinnerWrapper>
  );
}
