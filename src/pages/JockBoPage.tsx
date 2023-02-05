import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jockBo10saeFetchApi, jockBoDetailFetchApi } from '../api';
import JockBoList from '../components/JockBoList';
import { UserInfo } from '../store/types';

export default function JockBoPage() {
  const { userId, kind } = useParams();
  // 추후 id 클릭 시 바뀌도록 설정!!
  const [myId, setMyId] = useState(0);
  const [jockBoTree, setJockBoTree] = useState([]);
  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    if (!userId) {
      return;
    }

    jockBoDetailFetchApi(Number(userId)).then((res) => {
      setUserInfo(res);
    });

    if (kind === '10dae') {
      jockBo10saeFetchApi(Number(userId)).then((res) => {
        setJockBoTree(res);
      });
    }
  }, []);

  return (
    <>
      <div>
        {userInfo?.myName}({userInfo?.myNamechi})님은 시조로부터{' '}
        {userInfo?.mySae}세입니다. 10代가계도는 본인을 기준으로 위로 5代, 아래로
        5代를 보여주는 가계도입니다.
      </div>
      {jockBoTree.length > 0 && userId && (
        <JockBoList
          jockBo={jockBoTree}
          myId={Number(userId)}
          setGyeBoId={setMyId}
        />
      )}
    </>
  );
}
