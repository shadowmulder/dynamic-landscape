import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Button,
  TableFooter,
  TablePagination,
  Typography
} from '@material-ui/core';
import { DemoData } from '../../../assets/data/dataType';
import LazyLoad from 'react-lazyload';
import TablePaginationActions from './paginationActions.component';
import { FilterComponent } from '../../../shared/components/filter/filter.container.component';

interface IProps {
  content: Array<DemoData>;
  setDetailService: (service: DemoData) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
    paper: {
      width: '100%',
      overflowX: 'auto'
    },
    table: {
      minWidth: 100
    },
    tableIcon: {
      height: 30,
      float: 'left',
      width: 30
    },
    filterIcon: {
      float: 'right'
    },
    header: {
      backgroundColor: theme.palette.grey[600]
    },
    headerTitle: {
      color: 'white',
      margin: 0
    }
  })
);

export default function MapTable(props: IProps) {
  const classes = useStyles();

  const rows = props.content;

  const setDetailService = (event: any, service: DemoData) => {
    props.setDetailService(service);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid item xs={10} className={classes.card}>
      <FilterComponent iconClassName={classes.filterIcon} displayChips={true} />
      <Paper className={classes.paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.headerTitle}
                >
                  Service
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.headerTitle}
                >
                  Provider
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.headerTitle}
                >
                  Category
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  <LazyLoad height={30}>
                    <img
                      src={row.img}
                      alt={row.service}
                      className={classes.tableIcon}
                    ></img>
                  </LazyLoad>
                </TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell component="th" scope="row">
                  {row.provider}
                </TableCell>
                <TableCell>{row.category.join(' | ')}</TableCell>
                <TableCell>
                  <Button onClick={event => setDetailService(event, row)}>
                    More Information
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!!!rows.length && (
              <TableRow>
                <TableCell>Empty</TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 49 * (!!!rows.length ? emptyRows : emptyRows - 1)
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100, { label: 'All', value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </Grid>
  );
}
