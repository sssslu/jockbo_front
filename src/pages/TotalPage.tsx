import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { jockBoListFetchApi } from '../api';
import Loading from '../components/Loading';
import SearchList from '../components/SearchList';

export default function TotalPage() {
  const [items, setItems] = useState([]);
  const [gyeBoId, setGyeBoId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    jockBoListFetchApi().then((res) => {
      setItems(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <Stack>
      {isLoading ? (
        <Loading />
      ) : (
        <SearchList searchItems={items} setGyeBoId={setGyeBoId} />
      )}
    </Stack>
  );
}