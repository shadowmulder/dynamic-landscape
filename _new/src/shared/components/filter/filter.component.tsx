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
  Chip,
  Button,
  Select,
  MenuItem,
  Input,
  FormControl,
  InputLabel,
  ListItemText
} from '@material-ui/core';
import { DataFilter, Providers } from '../../../assets/data/dataType';

interface IProps {
  filter: DataFilter;
  possibleFilterValues: DataFilter;
  iconClassName: any;
  setFilter: (filter: DataFilter) => void;
  displayChips?: Boolean;
}

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto',
    margin: 40,
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom right',
    backgroundSize: 100
  },
  logo: {
    height: 50
  },
  chip: {
    float: 'right',
    margin: '8px 5px'
  },
  item: {
    marginTop: 20
  },
  chipSelection: {
    margin: 2
  },
  category: {
    width: '100%'
  }
});

export default function FilterComponentContainer(props: IProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState({ ...props.filter });

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (!!!open) {
      props.setFilter(filter);
      setOpen(open);
    } else {
      setOpen(open);
      setFilter({ ...props.filter });
    }
  };

  const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value);
    setFilter({ ...filter, category: event.target.value as string[] });
  };

  const handleChangeCheckbox = (
    filterKey: keyof typeof props.filter,
    value: Providers
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log({
      ...filter,
      [filterKey]: [...filter[filterKey], value]
    });
    if (event.target.checked) {
      setFilter({
        ...filter,
        [filterKey]: [...filter[filterKey], value]
      });
    } else {
      setFilter({
        ...filter,
        [filterKey]: (filter[filterKey] as string[]).filter(p => p !== value)
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
      ...props.filter,
      [filterKey]: (props.filter[filterKey] as string[]).filter(
        p => p !== value
      )
    };
    setFilter(newFilter);
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
        {props.displayChips && getFilterChips(props.filter)}
      </div>
      <SwipeableDrawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.fullList}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
          >
            <Grid item xs={12} md={12}>
              <Typography variant="h4">Filter Services</Typography>
            </Grid>
            <Grid item xs={12} md={2} className={classes.item}>
              <FormGroup>
                {props.possibleFilterValues.provider.map(
                  (provider: Providers, i: number) => {
                    return (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            checked={filter.provider.some(v => v === provider)}
                            onChange={handleChangeCheckbox(
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
                  }
                )}
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={6} className={classes.item}>
              <FormControl className={classes.category}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  className={classes.category}
                  multiple
                  value={filter.category}
                  onChange={handleChangeSelect}
                  input={<Input id="category-select" />}
                  renderValue={selected => (
                    <div className={classes.chipSelection}>
                      {(selected as string[]).map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                >
                  {props.possibleFilterValues.category.map(cat => (
                    <MenuItem key={cat} value={cat}>
                      <Checkbox checked={filter.category.indexOf(cat) > -1} />
                      <ListItemText primary={cat} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <Button color="primary" onClick={toggleDrawer(false)}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
