import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { jockBo5saeFetchApi, jockBoSearchFetchApi } from '../api';
import CustomContainer from '../components/CustomContainer';
import DetailInfo from '../components/DetailInfo';
import JockBoTree from '../components/JockBoTree';
import SearchForm from '../components/SearchForm';
import SearchList from '../components/SearchList';
import { JockBoTreeItemInfo } from '../store/types';
import palette from '../utils/palette';
import { useRecoilState } from 'recoil';
import { searchLoadingState, gyeBoIdState } from '../store/atoms';

export default function SearchPage() {
  const [searchItems, setSearchItems] = useState([]);
  const [gyeBoTree, setGyeBoTree] = useState<JockBoTreeItemInfo[]>([]);
  const query = useLocation().search;
  const [searchIsLoading, setSearchIsLoading] =
    useRecoilState<boolean>(searchLoadingState);
  const [gyeBoId, setGyeBoId] = useRecoilState<number>(gyeBoIdState);
  // 계보 보는 api가 만들어져야 함
  useEffect(() => {
    jockBo5saeFetchApi(gyeBoId).then((res) => {
      setGyeBoTree(res);
      console.log('계보', res);
    });
  }, [gyeBoId]);

  useEffect(() => {
    if (query) {
      setSearchIsLoading(true); // 검색 시작
      jockBoSearchFetchApi(query).then((res) => {
        setSearchItems(res);
        console.log('검색', res);
        setSearchIsLoading(false); // 검색 끝
      });
    }
  }, [query]);

  return (
    <Stack>
      <Stack direction="row">
        <SearchForm />
        <CustomContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3>직계 계보</h3>
            <Link to={'/jockBo/8dae/'}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  background: palette.darkBrown,
                  ':hover': { bgcolor: 'black' },
                }}
              >
                8寸 계보
              </Button>
            </Link>
          </div>
          <Stack width={700} overflow={'scroll'} position={'relative'}>
            {gyeBoTree.length > 0 && (
              <JockBoTree
                jockBo={gyeBoTree}
                myId={gyeBoId}
                setGyeBoId={setGyeBoId}
              />
            )}
          </Stack>
        </CustomContainer>
      </Stack>

      <DetailInfo gyeBoId={gyeBoId} />

      <CustomContainer>
        <SearchList searchItems={searchItems} setGyeBoId={setGyeBoId} />
      </CustomContainer>
    </Stack>
  );
}
