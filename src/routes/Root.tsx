import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import NavBar from './NavBar';
import { useRecoilState } from 'recoil';
import { searchLoadingState, loopLoadingState } from '../store/atoms';
import styled from 'styled-components';

const BackgroundWrapper = styled.div<{ isLoading: boolean }>`
  opacity: ${(props) => (props.isLoading ? 0.3 : null)};
  z-index: ${(props) => (props.isLoading ? 9999 : null)};
  pointer-events: ${(props) => (props.isLoading ? 'none' : null)};
`;

const LoadingSpinnerWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 45%;
`;

export default function Root() {
  const [searchIsLoading] = useRecoilState<boolean>(searchLoadingState);
  const [loopIsLoading] = useRecoilState<boolean>(loopLoadingState);

  return (
    <div>
      <BackgroundWrapper isLoading={searchIsLoading || loopIsLoading}>
        {/* <h1 style={{ display: 'inline' }}>安東張氏 利川伯派 南海宗親會</h1> */}
        <h1 style={{ display: 'inline' }}>안동장씨 이천백파 남해종친회</h1>
        <nav>
          <NavBar />
        </nav>
        <Outlet />
      </BackgroundWrapper>
      <LoadingSpinnerWrapper>
        {searchIsLoading ? ( // 검색 중이면 검색 로딩
          <Loading variant={'search'} />
        ) : (
          // 검색이 아니면 loop 로딩이 실행중인지 확인 후 loop 로딩
          loopIsLoading && <Loading variant={'loop'} />
        )}
      </LoadingSpinnerWrapper>
    </div>
  );
}
