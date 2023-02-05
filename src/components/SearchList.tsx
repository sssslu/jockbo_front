import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { JockBoItemInfo } from '../store/types';
import styled from 'styled-components';
import palette from '../utils/palette';

interface Props {
  searchItems: JockBoItemInfo[];
  setGyeBoId: React.Dispatch<React.SetStateAction<number>>;
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    background: `linear-gradient(to bottom, ${palette.lightBrown}, white, ${palette.lightBrown})`,
    fontSize: 16,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: palette.beige,
  },
  '&:nth-of-type(even)': {
    backgroundColor: palette.darkBeige,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  cursor: 'pointer',
}));

export default function SearchList({ searchItems, setGyeBoId }: Props) {
  const userClickHandler = (id: number) => {
    setGyeBoId(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">이름</StyledTableCell>
            <StyledTableCell align="center">세(世)</StyledTableCell>
            <StyledTableCell align="center">부명</StyledTableCell>
            <StyledTableCell align="center">조부명</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchItems.length > 0 ? (
            searchItems.map((searchItem) => (
              <StyledTableRow
                key={searchItem._id}
                hover
                onClick={() => userClickHandler(searchItem._id)}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {searchItem.myName} ({searchItem.myNamechi})
                </StyledTableCell>
                <StyledTableCell align="center">
                  {searchItem.mySae}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {searchItem.father.myName} ({searchItem.father.myNamechi})
                </StyledTableCell>
                <StyledTableCell align="center">
                  {searchItem.grandPa.myName} ({searchItem.grandPa.myNamechi})
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell
                align="center"
                colSpan={6}
                sx={{ height: '100px' }}
              >
                조건에 맞는 자료가 없습니다.
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
