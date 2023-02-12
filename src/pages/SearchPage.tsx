import { Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jockBo5saeFetchApi, jockBoSearchFetchApi } from '../api';
import CustomContainer from '../components/CustomContainer';
import DetailInfo from '../components/DetailInfo';
import JockBoList from '../components/JockBoList';
import SearchForm from '../components/SearchForm';
import SearchList from '../components/SearchList';
import { JockBoTreeItemInfo } from '../store/types';
import palette from '../utils/palette';
import { useRecoilState } from 'recoil';
import { searchState } from '../store/atoms';

const frontUrl = import.meta.env.VITE_FRONT_URL;

export default function SearchPage() {
  const [searchItems, setSearchItems] = useState([]);
  const [gyeBoId, setGyeBoId] = useState(100001);
  const [gyeBoTree, setGyeBoTree] = useState<JockBoTreeItemInfo[]>([]);
  const [searchIsLoading, setSearchIsLoading] =
    useRecoilState<boolean>(searchState);
  const query = useLocation().search;

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

  const tenSaeOpenHandler = () => {
    // window.open(`${frontUrl}/jockBo/${gyeBoId}/10dae`, '_black');
  };

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
            <h3>계보 보기</h3>
            <div>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
                size="small"
              >
                <Button
                  sx={{
                    background: palette.darkBrown,
                    ':hover': { bgcolor: 'black' },
                  }}
                >
                  직계
                </Button>
                <Button
                  onClick={tenSaeOpenHandler}
                  sx={{
                    background: palette.darkBrown,
                    ':hover': { bgcolor: 'black' },
                  }}
                >
                  10代
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <Stack width={700} overflow={'scroll'} position={'relative'}>
            {gyeBoTree.length > 0 && (
              <JockBoList
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
