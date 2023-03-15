import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jockBo8saeFetchApi, jockBoDetailFetchApi } from '../api';
import JockBoTree from '../components/JockBoTree';
import { UserInfo } from '../store/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import palette from '../utils/palette';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { gyeBoIdState, loopLoadingState } from '../store/atoms';
import Loading from '../components/Loading';

const GoBackIcon = styled(FontAwesomeIcon)`
  color: ${palette.darkBrown};
  &:hover {
    color: black;
  }
`;

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

// 10대 족보 페이지
export default function JockBo8Page() {
  // 추후 id 클릭 시 바뀌도록 설정!!
  const [gyeBoId, setGyeBoId] = useRecoilState<number>(gyeBoIdState);
  const [jockBoTree, setJockBoTree] = useState([]);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isLoading] = useRecoilState<boolean>(loopLoadingState);
  const navigate = useNavigate();

  useEffect(() => {
    jockBoDetailFetchApi(gyeBoId).then((res) => {
      setUserInfo(res);
    });

    jockBo8saeFetchApi(gyeBoId).then((res) => {
      console.log(res);
      setJockBoTree(res);
    });
  }, [gyeBoId]);

  return (
    <>
      <BackgroundWrapper isLoading={isLoading}>
        <GoBackIcon
          icon={faLeftLong}
          className="goBack"
          size={'3x'}
          onClick={() => navigate(-1)}
        />
        <div>
          {userInfo?.myName}({userInfo?.myNamechi})님은 시조로부터{' '}
          {userInfo?.mySae}세입니다. 8촌 가계도는 본인을 기준으로 최대 8촌까지
          보여주는 가계도입니다.
        </div>
        {jockBoTree.length > 0 && (
          <JockBoTree
            jockBo={jockBoTree}
            myId={gyeBoId}
            setGyeBoId={setGyeBoId}
          />
        )}
      </BackgroundWrapper>
      <LoadingSpinnerWrapper>
        {isLoading && <Loading variant={'loop'} />}
      </LoadingSpinnerWrapper>
    </>
  );
}
