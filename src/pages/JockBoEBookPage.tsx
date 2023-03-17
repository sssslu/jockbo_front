import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { jockBoEBookFetchApi } from '../api';
import { TotalJockBoTreeItemInfo } from '../store/types';

// 페이지 나눌 때 확인해봐야 할 것
// clip으로 표 자르는거 생각!
// 일정 크기로 자르고 그 다음부터 다시 출력(이미지 자르듯이)

const JockBoTable = styled.table`
  table-layout: fixed;
  word-break: break-all;
  border-collapse: collapse;
  // border: 1px solid;
  // border-style: hidden;
  // border-spacing: 0;
  // border: 0;
  // frame: void;
  // rules: all;
`;

// 족보 E-Book을 생성하는 페이지
export default function JockBoEBookPage() {
  const [jockBoTable, setJockBoTable] = useState(<div></div>);
  const [jockBo, setJockBo] = useState([]);
  // const [isLoading, setIsLoading] = useRecoilState<boolean>(loopLoadingState);

  // 족보 표로 생성
  const JockBoTableRecur = (cur: number, items: TotalJockBoTreeItemInfo[]) => {
    return (
      <JockBoTable>
        {items.map((item) => {
          return (
            <tr key={item._id}>
              <td
                width={'200px'}
                style={{
                  border: '1px solid',
                  textAlign: 'start',
                  verticalAlign: 'top',
                  margin: 0,
                }}
              >
                {/* <div style={{ border: '1px solid', boxSizing: 'inherit' }}> */}
                <h3 style={{ color: 'blue' }}>{item.myName}</h3>
                {item.ect}
                {/* </div> */}
              </td>
              {item.children!.length > 0 && (
                <td
                  align="left"
                  style={{
                    // border: '1px solid',
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
          );
        })}
      </JockBoTable>
    );
  };

  // 족보 생성은 한 번만 되도록
  useEffect(() => {
    const newTable = JockBoTableRecur(0, jockBo);
    // 이전 형제 정보 저장
    setJockBoTable(newTable);
  }, [jockBo]);

  useEffect(() => {
    jockBoEBookFetchApi(3).then((res) => {
      console.log(res);
      setJockBo(res);
    });
  }, []);
  // 로딩 설정
  // useEffect(() => {
  //   setIsLoading(false);
  //   console.log('change');
  // }, [jockBoComponent]);

  return (
    <JockBoTable style={{ border: '7px double', width: '1000px' }}>
      <tr style={{ background: 'silver' }}>
        <th style={{ width: '200px' }}>10世</th>
        <th style={{ width: '200px' }}>11世</th>
        <th style={{ width: '200px' }}>12世</th>
        <th style={{ width: '200px' }}>13世</th>
        <th style={{ width: '200px' }}>14世</th>
        <th style={{ width: '200px' }}>15世</th>
      </tr>
      <tr>
        <td colSpan={6}>{jockBoTable}</td>
      </tr>
      {/* {data.map((ect) => {
        return (
          <td
            width={'20px'}
            style={{
              border: '1px solid black',
            }}
          >
            <div style={{ maxHeight: '200px', overflow: 'clip' }}>{ect}</div>
          </td>
        );
      })} */}
    </JockBoTable>
  );
}
