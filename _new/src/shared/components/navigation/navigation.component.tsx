import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../../assets/logos/DL_Logo.svg';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Card, Link } from '@material-ui/core';
import { urls } from '../../externalURL';

interface IProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    appBar: {
      backgroundColor: theme.palette.grey[600]
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    button: {
      color: '#ffffff'
    },
    spacing: {
      flexGrow: 1
    },
    logoCard: {
      flexGrow: 0
    },
    logo: {
      height: 40
    }
  })
);

export default function NavigationComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Card className={classes.logoCard}>
            <img src={Logo} alt="Logo" className={classes.logo} />
          </Card>
          <div className={classes.spacing}></div>
          <IconButton className={classes.button}>
            <Link href={urls.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon className={classes.button} />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
