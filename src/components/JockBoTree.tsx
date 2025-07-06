import { Stack } from '@mui/material';
import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { JockBoTreeItemInfo } from '../store/types';
import styled from 'styled-components';
import Xarrow, { Xwrapper } from 'react-xarrows';
import _ from 'lodash';
import CustomContainer from './CustomContainer';
import palette from '../utils/palette';
import { useRecoilState } from 'recoil';
import { loopLoadingState } from '../store/atoms';

interface Props {
  jockBo: JockBoTreeItemInfo[];
  myId: number;
  setGyeBoId: React.Dispatch<React.SetStateAction<number>>;
}

const JockBoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 1.7rem;
  font-size: 13px;
  line-height: 120%;
  background: ${palette.brown};
  margin: 0.5rem;
  padding: 0.5rem;
  color: white;
  box-shadow: 3px 3px 9px 3px ${palette.darkBrown};
  border-radius: 10%;

  &:hover {
    background: ${palette.darkBrown};
    transition: 0.5s;
  }
  cursor: pointer;
`;

const SaeItem = styled(JockBoItem)`
  width: 2rem;
  background: ${palette.brown2};
  pointer-events: none;
`;

export default function JockBoTree({ jockBo, myId, setGyeBoId }: Props) {
  // 세의 시작과 끝 값
  const saeStartValue = useRef(0);
  const saeLastValue = useRef(0);

  const [jockBoComponent, setJockBoComponent] = useState(<div></div>);

  const [isLoading, setIsLoading] = useRecoilState<boolean>(loopLoadingState);

  const userChangeClickHandler = (id: number) => {
    // 본인을 눌렀을 때 아무 일도 일어나지 않도록 설정
    if (id === myId) {
      return;
    }
    setIsLoading(true);
    setGyeBoId(id);
  };

  // 족보 생성
  const JockBoTreeRecur = useCallback(
    (cur: number, items: JockBoTreeItemInfo[], prv: number) => {
      let sibling = -1;
      let newSibling = -1;
      // 세 시작과 끝 값 찾기(표의 왼쪽 칼럼을 정의하기 위함)
      if (cur === 0) {
        saeStartValue.current = items[0].mySae;
        saeLastValue.current = items[0].mySae;
      } else if (saeLastValue.current < items[0].mySae) {
        saeLastValue.current = items[0].mySae;
      }

      return (
        <Stack direction="row">
          {items.map((item, idx) => {
            sibling = newSibling;
            newSibling = item._id;
            return (
              <Stack key={item._id}>
                <JockBoItem
                  id={`${item._id}`}
                  onClick={() => userChangeClickHandler(item._id)}
                  style={
                    item._id === myId ? { backgroundColor: palette.orange } : {}
                  }
                >
                  {item.myName}
                  <br /> {item.myNamechi}
                </JockBoItem>

                {item.children!.length > 0 &&
                  JockBoTreeRecur(cur + 1, item.children!, item._id)}
                {/* 형제 사이 연결 */}
                {idx > 0 && (
                  <Xarrow
                    showHead={false}
                    start={`${item._id}`}
                    end={`${sibling}`}
                    lineColor={palette.darkBrown}
                  />
                )}
              </Stack>
            );
          })}
          {/* 자식 관계 라인 연결 */}
          {cur > 0 && (
            <Xarrow
              showHead={false}
              start={`${items[0]._id}`}
              end={`${prv}`}
              lineColor={palette.darkBrown}
            />
          )}
          <div />
        </Stack>
      );
    },
    [myId, jockBo],
  );

  // 족보 생성은 한 번만 되도록
  useEffect(() => {
    const newJockBo = <Xwrapper>{JockBoTreeRecur(0, jockBo, -1)}</Xwrapper>;
    // 이전 형제 정보 저장
    setJockBoComponent(newJockBo);
  }, [jockBo]);

  // 로딩 설정
  useEffect(() => {
    setIsLoading(false);
    console.log('change');
  }, [jockBoComponent]);

  return (
    <CustomContainer>
      <Stack direction="row">
        <Stack>
          {_.range(saeStartValue.current, saeLastValue.current + 1).map(
            (sae) => {
              return <SaeItem key={sae}>{sae} 世</SaeItem>;
            },
          )}
        </Stack>
        {jockBoComponent}
      </Stack>
    </CustomContainer>
  );
}
