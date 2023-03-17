import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SearchDataInfo } from '../store/types';
import palette from '../utils/palette';
import CustomContainer from './CustomContainer';

const TextFieldsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  autoComplete : off;
  noValidate;
  component: form;
`;

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<SearchDataInfo>({});

  const onChangeText = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    textType: keyof SearchDataInfo,
  ) => {
    if (event.target.value === '' && textType in searchData) {
      const { [textType]: currentType, ...otherTestTypes } = searchData;
      setSearchData(otherTestTypes);
      return;
    }
    switch (textType) {
      case 'myName':
        setSearchData((prv) => ({ ...prv, myName: event.target.value }));
        break;
      case 'mySae':
        setSearchData((prv) => ({ ...prv, mySae: event.target.value }));
        break;
      case 'fatherName':
        setSearchData((prv) => ({ ...prv, fatherName: event.target.value }));
        break;
      case 'grandPaName':
        setSearchData((prv) => ({ ...prv, grandPaName: event.target.value }));
        break;
      default:
        break;
    }
  };

  const searchHandler = () => {
    if (Object.values(searchData).length > 0) {
      navigate({
        pathname: '/',
        search: `?${createSearchParams(searchData)}`,
      });
    } else {
      alert('입력된 값이 없습니다.');
    }
  };

  return (
    <CustomContainer>
      <h3>족보 검색</h3>
      <TextFieldsWrapper
        sx={{
          '& .MuiTextField-root': { m: 1, width: '150px' },
        }}
      >
        <TextField
          label="이름"
          variant="standard"
          type="text"
          value={searchData.myName || ''}
          onChange={(e) => onChangeText(e, 'myName')}
        />
        <TextField
          label="세(世)"
          variant="standard"
          type="number"
          value={searchData.mySae || ''}
          onChange={(e) => onChangeText(e, 'mySae')}
        />
      </TextFieldsWrapper>
      <TextFieldsWrapper
        sx={{
          '& .MuiTextField-root': { m: 1, width: '150px' },
        }}
      >
        <TextField
          label="부 이름"
          variant="standard"
          type="text"
          value={searchData.fatherName || ''}
          onChange={(e) => onChangeText(e, 'fatherName')}
        />
        <TextField
          label="조부 이름"
          variant="standard"
          type="text"
          value={searchData.grandPaName || ''}
          onChange={(e) => onChangeText(e, 'grandPaName')}
        />
      </TextFieldsWrapper>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '150px' },
          display: 'flex',
          justifyContent: 'space-between',
          marginY: '20px',
        }}
      >
        <Button
          variant="contained"
          onClick={searchHandler}
          sx={{
            backgroundColor: palette.green,
            ':hover': { bgcolor: 'green' },
          }}
        >
          검색
        </Button>
        <Button
          variant="contained"
          onClick={() => setSearchData({})}
          sx={{ background: palette.purple, ':hover': { bgcolor: 'purple' } }}
        >
          초기화
        </Button>
      </Box>
    </CustomContainer>
  );
}
