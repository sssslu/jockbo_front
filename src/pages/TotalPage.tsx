import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { jockBoListFetchApiLimited } from '../api';
import SearchList from '../components/SearchList';
import { searchLoadingState } from '../store/atoms';

export default function TotalPage() {
  const [items, setItems] = useState([]);
  const [gyeBoId, setGyeBoId] = useState(1);
  const [searchIsLoading, setSearchIsLoading] =
    useRecoilState<boolean>(searchLoadingState);

  useEffect(() => {
    setSearchIsLoading(true); // 검색 시작
    jockBoListFetchApiLimited().then((res) => {
      setItems(res);
      setSearchIsLoading(false); // 검색 끝
    });
  }, []);

  return (
    <Stack>
      <SearchList searchItems={items} setGyeBoId={setGyeBoId} />
    </Stack>
  );
}
