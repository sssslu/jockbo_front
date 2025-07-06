import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { jockBoDetailFetchApi } from '../api';
import { UserInfo } from '../store/types';
import Loading from './Loading';
import palette from '../utils/palette';
import { Button, Modal } from '@mui/material';
import DetailChangeForm from './DetailChangeForm';
import { Link } from 'react-router-dom';

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
  // 변경할 모달 오픈
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 족보 등재내용 미리보기
  const previewInfo = useMemo(() => {
    // 족보 등재내용이 없는 경우
    if (!detailInfo || !detailInfo.ect) {
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
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <h3>
          {detailInfo?.myName}({detailInfo?.myNamechi}) - {detailInfo?.mySae}世
        </h3>
        {detailInfo && (
          <Link
            to={`/eBook/${Math.floor((detailInfo.mySae - 1) / 5) + 1}/${
              detailInfo._id
            }`}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: palette.orange,
                ':hover': { bgcolor: 'orange' },
                marginLeft: 5,
              }}
            >
              족보 E-BOOK
            </Button>
          </Link>
        )}
      </div>
      {detailIsLoading ? (
        <Loading variant="loop" />
      ) : (
        <>
          <h4>족보등재내용</h4>
          {detailInfo &&
            detailInfo.ect &&
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
           {/* {detailInfo && detailInfo.ect && (
            <Button onClick={handleOpen}>수정</Button>
          )}  */}
        </>
      )}
      {detailInfo && detailInfo.ect && (
        <Modal open={open} onClose={handleClose}>
          <DetailChangeForm
            detailInfo={detailInfo}
            setDetailInfo={setDetailInfo}
            handleClose={handleClose}
          />
        </Modal>
      )}
    </div>
  );
}
