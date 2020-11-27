import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import classes from './changeStyle.module.scss'
import React, { FC } from 'react'

interface selectProps {
  value: string
  handleChange: any
  itemList: string[]
  label: string
}

const SelectAuto: FC<selectProps> = ({
  value,
  handleChange,
  itemList,
  label,
}) => {
  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel id={`select${label}`}>{label}</InputLabel>
      <Select
        placeholder={label}
        labelId={`select${label}`}
        id={`select${label}`}
        value={value}
        onChange={handleChange}
        label={label}
      >
        {itemList.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              <span className={classes.span}>{item}</span>
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
export default SelectAuto
