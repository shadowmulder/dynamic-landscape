import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Logo from '../../../assets/logos/DL_Logo.svg';
import { Typography, Grid, LinearProgress, Theme, createStyles } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  card: {
    maxWidth: 500,
  },
  media: {
    height: 200,
  },
  logo: {
    width: '100%',
    marginBottom: theme.spacing(4)
  }
}));

export default function LoadingComponent() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{minHeight:600}}
    >
    <Grid item xs={6} className={classes.card}>
      <Card className={classes.card}>
          <CardContent>
            <img src={Logo} alt="Logo" className={classes.logo}/>
            <Typography gutterBottom variant="h5" component="h2">
              Fetching Data...
            </Typography>
            <LinearProgress variant="query" />
          </CardContent>
        
        <CardActions >
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            GitHub
          </Button>
        </CardActions>
      </Card>
    </Grid>
    </Grid>
  );
}


