import { Box, Button, TextField, Typography } from '@mui/material';
import { forwardRef, useRef, useState } from 'react';
import { changeDetailApi } from '../api';
import { UserInfo } from '../store/types';
import palette from '../utils/palette';

interface Props {
  detailInfo: UserInfo;
  setDetailInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
  handleClose: () => void;
}

type Ref = HTMLElement;

// 수정할 모달 스타일
const ModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DetailChangeForm = forwardRef<Ref, Props>(
  ({ detailInfo, setDetailInfo, handleClose }: Props, ref) => {
    const detailValueRef = useRef<HTMLInputElement>(null);

    const changeDetailHandler = () => {
      if (!detailValueRef.current) {
        return;
      }
      if (confirm('정말 변경하시겠습니까?')) {
        const changeValue = detailValueRef.current.value;
        console.log(changeValue);
        changeDetailApi(detailInfo._id, changeValue).then((res) => {
          console.log(res);
          setDetailInfo({ ...detailInfo, ect: changeValue });
          alert('변경되었습니다.');
          handleClose();
        });
      }
    };

    return (
      <Box sx={[ModalStyle, { backgroundColor: palette.beige }]}>
        <Typography variant="h6" component="h2">
          {detailInfo.myName}({detailInfo.myNamechi}) 족보등재내용 수정
        </Typography>
        <form>
          <TextField
            multiline={true}
            defaultValue={detailInfo.ect}
            fullWidth={true}
            margin={'normal'}
            inputRef={detailValueRef}
          ></TextField>
          <br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              onClick={changeDetailHandler}
              sx={{
                backgroundColor: palette.green,
                ':hover': { bgcolor: 'green' },
                marginRight: 1,
              }}
            >
              변경하기
            </Button>
            <Button
              type="reset"
              variant="contained"
              sx={{
                backgroundColor: palette.purple,
                ':hover': { bgcolor: 'purple' },
              }}
            >
              초기화
            </Button>
          </div>
        </form>
      </Box>
    );
  },
);

export default DetailChangeForm;
