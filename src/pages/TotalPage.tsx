import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { jockBoListFetchApi } from '../api';
import { jockBoListFetchApiLimited } from '../api';
import Loading from '../components/Loading';
import SearchList from '../components/SearchList';

export default function TotalPage() {
  const [items, setItems] = useState([]);
  const [gyeBoId, setGyeBoId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    jockBoListFetchApiLimited().then((res) => {
      setItems(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <Stack>
      {isLoading ? (
        <Loading variant={'loop'} />
      ) : (
        <SearchList searchItems={items} setGyeBoId={setGyeBoId} />
      )}
    </Stack>
  );
}
