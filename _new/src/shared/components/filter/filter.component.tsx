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
  FormControlLabel,
  Chip
} from '@material-ui/core';
import { DataFilter, Providers } from '../../../assets/data/dataType';

interface IProps {
  filter: DataFilter;
  iconClassName: any;
  setFilter: (filter: DataFilter) => void;
  displayChips?: Boolean;
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
  },
  chip: {
    float: 'right',
    margin: '8px 5px'
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

  const providers = ['Amazon', 'Microsoft', 'Google'];

  const handleChange = (
    filterKey: keyof typeof props.filter,
    value: Providers
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setState({
        ...state,
        filter: {
          ...state.filter,
          [filterKey]: [...state.filter[filterKey], value]
        }
      });
    } else {
      setState({
        ...state,
        filter: {
          ...state.filter,
          [filterKey]: (state.filter[filterKey] as string[]).filter(
            p => p !== value
          )
        }
      });
    }
  };

  const getFilterChips = (filterSet: DataFilter) => {
    let chipSet: any[] = [];
    for (let [filter, value] of Object.entries(filterSet)) {
      value.forEach((value: Providers | string) => {
        chipSet.push(
          <Chip
            key={value as string}
            label={`${filter.replace(/^\w/, c => c.toUpperCase())}:  ${value}`}
            onDelete={() =>
              onChipDelete(filter as keyof typeof props.filter, value as string)
            }
            color="primary"
            className={classes.chip}
          />
        );
      });
    }
    return chipSet;
  };

  const onChipDelete = (
    filterKey: keyof typeof props.filter,
    value: string
  ): void => {
    const newFilter = {
      ...state.filter,
      [filterKey]: (state.filter[filterKey] as string[]).filter(
        p => p !== value
      )
    };
    setState({
      ...state,
      filter: newFilter
    });
    props.setFilter(newFilter);
  };

  return (
    <div>
      <div>
        {/* Icon to open filter window */}
        <IconButton
          className={props.iconClassName}
          onClick={toggleDrawer(true)}
        >
          <SearchIcon></SearchIcon>
        </IconButton>
        {/* Chipset of current filter*/}
        {props.displayChips || getFilterChips(props.filter)}
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
                {providers.map((provider: string, i: number) => {
                  return (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          checked={state.filter.provider.some(
                            v => v === provider
                          )}
                          onChange={handleChange(
                            'provider',
                            provider as Providers
                          )}
                          value={provider}
                          color="primary"
                        />
                      }
                      label={provider}
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
