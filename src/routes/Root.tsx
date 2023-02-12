import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import NavBar from './NavBar';
import { useRecoilState } from 'recoil';
import { searchState } from '../store/atoms';
import styled from 'styled-components';

const BackgroundWrapper = styled.div<{ isLoading: boolean }>`
  opacity: ${(props) => (props.isLoading ? 0.3 : null)};
  z-index: ${(props) => (props.isLoading ? 9999 : null)};
  pointer-events: ${(props) => (props.isLoading ? 'none' : null)};
`;

const SearchLoadingSpinnerWrapper = styled.div`
  position: fixed;
  top: 45%;
  left: 45%;
`;

export default function Root() {
  const [searchIsLoading] = useRecoilState<boolean>(searchState);

  return (
    <div>
      <BackgroundWrapper isLoading={searchIsLoading}>
        {/* <h1 style={{ display: 'inline' }}>安東張氏 利川伯派 南海宗親會</h1> */}
        <h1 style={{ display: 'inline' }}>안동장씨 이천백파 남해종친회</h1>
        <nav>
          <NavBar />
        </nav>
        <Outlet />
      </BackgroundWrapper>
      <SearchLoadingSpinnerWrapper>
        {searchIsLoading && <Loading variant={'search'} />}
      </SearchLoadingSpinnerWrapper>
    </div>
  );
}
