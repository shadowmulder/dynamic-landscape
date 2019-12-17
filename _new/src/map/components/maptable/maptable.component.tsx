import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';
import { DemoData } from '../../../assets/data/dataType';
import LazyLoad from 'react-lazyload';

interface IProps {
  content: Array<DemoData>;
  setDetailService: (object: object) => void;
}

const useStyles = makeStyles({
  card: {},
  paper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  tableIcon: {
    height: 30,
    float: 'left',
    width: 30
  }
});

export default function MapTableComponent(props: IProps) {
  const classes = useStyles();

  const rows = props.content;

  const setDetailService = (event: any, service: object) => {
    props.setDetailService(service);
  };

  return (
    <Grid item xs={10} className={classes.card}>
      <Paper className={classes.paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow>
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
                <TableCell>{row.category}</TableCell>
                <TableCell>
                  <Button onClick={event => setDetailService(event, row)}>
                    More Information
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
}
