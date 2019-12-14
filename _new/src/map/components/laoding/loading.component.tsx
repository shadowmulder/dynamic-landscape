import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Logo from '../../../assets/logos/DL_Logo.svg';
import {
  Typography,
  Grid,
  LinearProgress,
  Theme,
  createStyles,
  Link
} from '@material-ui/core';
import { urls } from '../../../shared/externalURL';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500
    },
    media: {
      height: 200
    },
    logo: {
      width: '100%',
      marginBottom: theme.spacing(4)
    }
  })
);

export default function LoadingComponent() {
  const classes = useStyles();

  return (
    <Grid item xs={6} className={classes.card}>
      <Card className={classes.card}>
        <CardContent>
          <img src={Logo} alt="Logo" className={classes.logo} />
          <Typography gutterBottom variant="h5" component="h2">
            Fetching Data...
          </Typography>
          <LinearProgress variant="query" />
        </CardContent>

        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            <Link href={urls.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
