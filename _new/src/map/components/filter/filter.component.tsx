import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Logo from '../../../assets/logos/DL_Logo.svg';
import SearchIcon from '@material-ui/icons/Search';
import {
  IconButton,
  Grid,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { DataFilter, Providers } from '../../../assets/data/dataType';

interface IProps {
  filter: DataFilter;
  iconClassName: any;
  setFilter: (Filter: DataFilter) => void;
}

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  logo: {
    height: 50
  }
});

export default function FilterComponentContainer(props: IProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    filter: { ...props.filter }
  });

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    if (open === false) {
      props.setFilter(state.filter);
    }

    setState({ ...state, open: open });
  };

  const Vendors = ['Amazon', 'Microsoft', 'Google'];
  const handleChange = (name: Providers) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setState({
        ...state,
        filter: {
          provider: [...state.filter.provider, name]
        }
      });
    } else {
      setState({
        ...state,
        filter: { provider: state.filter.provider.filter(p => p !== name) }
      });
    }
  };

  return (
    <div>
      <div>
        <IconButton
          className={props.iconClassName}
          onClick={toggleDrawer(true)}
        >
          <SearchIcon></SearchIcon>
        </IconButton>
      </div>
      <SwipeableDrawer
        anchor="top"
        open={state.open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ margin: 40 }}
            className={classes.fullList}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
          >
            <Grid item xs={12} md={12}>
              <Typography variant="h4">
                <img src={Logo} alt="Logo" className={classes.logo} />
                Filter Services
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormGroup row>
                {Vendors.map((vendor: string) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.filter.provider.some(
                            v => v === vendor
                          )}
                          onChange={handleChange(vendor as Providers)}
                          value={vendor}
                          color="primary"
                        />
                      }
                      label={vendor}
                    />
                  );
                })}
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={Logo} alt="Logo" className={classes.logo} />
            </Grid>
          </Grid>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
