import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { jockBoDetailFetchApi } from '../api';
import { UserInfo } from '../store/types';
import Loading from './Loading';
import palette from '../utils/palette';

interface Props {
  gyeBoId: number;
}

const ShowMoreText = styled.span`
  color: ${palette.darkGreen};
  cursor: pointer;
  font-weight: bold;
`;

// 미리 볼 글자 길이
const TEXT_LIMIT = 300;

export default function DetailInfo({ gyeBoId }: Props) {
  const [detailIsLoading, setDetailIsLoading] = useState(false);
  const [detailInfo, setDetailInfo] = useState<UserInfo>();
  const [isShowMore, setIsShowMore] = useState<boolean>(false); // 더보기 열고 닫는 스위치

  // 족보 등재내용 미리보기
  const previewInfo = useMemo(() => {
    // 족보 등재내용이 없는 경우
    if (!detailInfo) {
      return '';
    }

    return detailInfo.ect.slice(0, TEXT_LIMIT); // 원본에서 글자 수만큼 잘라서 짧은 버전을 준비하자
  }, [detailInfo]);

  useEffect(() => {
    setDetailIsLoading(true);
    jockBoDetailFetchApi(gyeBoId).then((res) => {
      setDetailInfo(res);
      setDetailIsLoading(false);
    });
    setIsShowMore(false);
  }, [gyeBoId]);

  return (
    <div style={{ width: '1100px', marginLeft: '30px' }}>
      <h3>
        {detailInfo?.myName}({detailInfo?.myNamechi}) - {detailInfo?.mySae}世
      </h3>
      {detailIsLoading ? (
        <Loading />
      ) : (
        <>
          <h4>족보등재내용</h4>
          {detailInfo &&
            (detailInfo.ect.length <= TEXT_LIMIT ? (
              <span>{detailInfo.ect}</span>
            ) : (
              <>
                {isShowMore ? (
                  <span>{detailInfo.ect}</span>
                ) : (
                  <span>{previewInfo}</span>
                )}{' '}
                <ShowMoreText onClick={() => setIsShowMore(!isShowMore)}>
                  {isShowMore ? '[닫기]' : '...[더보기]'}
                </ShowMoreText>
              </>
            ))}
        </>
      )}
    </div>
  );
}
