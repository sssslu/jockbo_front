import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { jockBoEBookFetchApi } from '../api';
import { TotalJockBoTreeItemInfo } from '../store/types';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import palette from '../utils/palette';
import { useParams } from 'react-router-dom';

import './ScrollbarContainer.css';

const JockBoTable = styled.table`
  table-layout: fixed;
  word-break: break-all;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;
  padding: 0;
`;

const ArrowWrapper = styled.div`
  &:hover {
    color: brown;
    transition: 0.5s;
  }
  cursor: pointer;
`;

// 족보 E-Book을 생성하는 페이지
export default function JockBoEBookPage() {
  const { targetPage, targetId } = useParams();
  const [jockBoTable, setJockBoTable] = useState(<div></div>);
  const [jockBo, setJockBo] = useState([]);
  const [saePage, setSaePage] = useState(Number(targetPage) ?? 1);
  const [saeLastPage, setSaeLastPage] = useState(8);
  // 클릭 시 포커스 변경 중
  const [isFocusChanging, setIsFocusChanging] = useState(true);
  // 스크롤 이동할 Ref
  const [focusId, setFocusId] = useState(Number(targetId) ?? 0);
  // 그 위치로 이동하기 위한 useRef
  // key는 string : page id를 string으로 ex). 1page의 id가 10이면 "1 10"
  const locationRef = useRef<Map<string, HTMLDivElement>>(
    new Map<string, HTMLDivElement>(),
  );

  // 로딩
  // const [isLoading, setIsLoading] = useRecoilState<boolean>(loopLoadingState);

  // 족보 표로 생성
  const JockBoTableRecur = (cur: number, items: TotalJockBoTreeItemInfo[]) => {
    return (
      <JockBoTable>
        {items.map((item) => {
          return (
            <tbody key={item._id} style={{ position: 'relative' }}>
              <tr>
                <td
                  width={'200px'}
                  style={{
                    textAlign: 'start',
                    verticalAlign: 'top',
                    margin: 0,
                    border: '0.1px solid',
                    borderCollapse: 'separate',
                  }}
                >
                  {saePage !== 1 && saePage * 5 - 5 === item.mySae && (
                    <ArrowWrapper
                      style={{
                        position: 'absolute',
                        left: '-40px',
                      }}
                      onClick={() => moveTarget(saePage - 1, item._id)}
                    >
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="left"
                        color="#eb6f6f"
                        size="2x"
                      />
                    </ArrowWrapper>
                  )}
                  {saePage * 5 === item.mySae && (
                    <ArrowWrapper
                      style={{
                        position: 'absolute',
                        left: '205px',
                      }}
                      onClick={() => moveTarget(saePage + 1, item._id)}
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="right"
                        color="#eb6f6f"
                        size="2x"
                      />
                    </ArrowWrapper>
                  )}
                  <p
                    style={{
                      fontSize: 17,
                      color: focusId === item._id ? 'blue' : 'black',
                      backgroundColor: palette.darkBeige,
                      margin: 0,
                      paddingTop: 10,
                      textAlign: 'center',
                    }}
                    ref={(element: HTMLDivElement) => {
                      locationRef.current.set(
                        `${saePage} ${item._id}`,
                        element,
                      );
                    }}
                  >
                    {item.myName}
                  </p>
                  {item.ect}
                </td>
                {item.children!.length > 0 && (
                  <td
                    align="left"
                    style={{
                      textAlign: 'start',
                      verticalAlign: 'top',
                      margin: 0,
                      padding: 0,
                      border: 0,
                    }}
                  >
                    {JockBoTableRecur(cur + 1, item.children!)}
                  </td>
                )}
              </tr>
            </tbody>
          );
        })}
      </JockBoTable>
    );
  };

  // 페이지 변경
  const handleChange = (event: SelectChangeEvent) => {
    setSaePage(Number(event.target.value));
  };

  // 화살표 클릭(다음이나 이전 페이지로 이동하고 스크롤로 가리킨다.)
  const moveTarget = (changePage: number, targetId: number) => {
    setIsFocusChanging(true);
    setSaePage(changePage);
    setFocusId(targetId);
  };

  // 포커스 변경
  useLayoutEffect(() => {
    if (isFocusChanging === true) {
      if (locationRef.current.get(`${saePage} ${focusId}`)) {
        locationRef.current.get(`${saePage} ${focusId}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        setIsFocusChanging(false);
      }
    }
  }, [jockBoTable]);

  // 족보 생성은 한 번만 되도록
  useEffect(() => {
    const newTable = JockBoTableRecur(0, jockBo);
    // 이전 형제 정보 저장
    setJockBoTable(newTable);
  }, [jockBo]);

  // 현재 페이지의 값들 백에서 받아오기
  useEffect(() => {
    jockBoEBookFetchApi(saePage).then((res) => {
      setJockBo(res);
    });
  }, [saePage]);

  // 로딩 설정
  // useEffect(() => {
  //   setIsLoading(false);
  //   console.log('change');
  // }, [jockBoComponent]);

  return (
    <>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="demo-simple-select-label">Page</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(saePage)}
          label="Age"
          onChange={handleChange}
        >
          {_.range(1, saeLastPage + 1).map((page) => {
            return (
              <MenuItem value={page} key={page}>
                {page * 5 - 5}世 ~ {page * 5}世
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <thead>
        <div className="titlebarcontainer">
          {_.range(saePage * 5 - 5, saePage * 5 + 1).map((page) => {
            return (
              <th style={{ width: '200px' }} key={page}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {page}世
              </th>
            );
          })}
        </div>
      </thead>
      <div className="scrollbar-container">
        <JockBoTable style={{ border: '7px', width: '1000px' }}>
          <thead>
            <tr>
              {_.range(saePage * 5 - 5, saePage * 5 + 1).map((page) => {
                return <th style={{ width: '200px' }} key={page}></th>;
              })}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={6}>{jockBoTable}</td>
            </tr>
          </tbody>
        </JockBoTable>
      </div>
    </>
  );
}
