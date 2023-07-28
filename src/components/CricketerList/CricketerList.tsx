import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { PlayerTypes } from '@/API/get-players';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CricketerListProps, TorderBy } from './CricketerList.Types';
import { TableHeaderKeys } from './CricketerList.Const';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const orderByKeys = ['name', 'dob', 'rank'];
const playerTypes = ['batsman', 'bowler', 'allRounder', 'wicketKeeper'];

const CricketerList = ({
  players,
  orderBy,
  order,
  filterByType,
  onRequestSort,
  onRequestFilterType,
}: CricketerListProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {TableHeaderKeys.map((headerKey) => (
              <TableCell
                id={headerKey}
                sortDirection={orderBy === headerKey ? order : false}
              >
                {orderByKeys.includes(headerKey) ? (
                  <TableSortLabel
                    active={orderBy === headerKey}
                    direction={orderBy === headerKey ? order : 'asc'}
                    onClick={() => onRequestSort(headerKey as TorderBy)}
                  >
                    {headerKey.toUpperCase()}
                    {orderBy === headerKey ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                ) : headerKey === 'type' ? (
                  <>
                    <Button
                      variant="text"
                      color="inherit"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      {headerKey.toUpperCase()}
                      {filterByType && <i> --({filterByType})</i>}
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {playerTypes.map((type) => (
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            onRequestFilterType(type as PlayerTypes);
                          }}
                        >
                          {type.toUpperCase()}
                        </MenuItem>
                      ))}
                      {filterByType && (
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            onRequestFilterType(null);
                          }}
                        >
                          SHOW ALL
                        </MenuItem>
                      )}
                    </Menu>
                  </>
                ) : (
                  headerKey.toUpperCase()
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((row) => {
            const dob = row.dob ? new Date(row.dob).toLocaleDateString() : '-';
            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.type || '-'}</TableCell>
                <TableCell>{row.points || '-'}</TableCell>
                <TableCell>{row.rank || '-'}</TableCell>
                <TableCell>{dob}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CricketerList;
