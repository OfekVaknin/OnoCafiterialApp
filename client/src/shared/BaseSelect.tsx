import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface Option<T extends string | number = string | number> {
  label: string;
  value: T;
}

interface BaseSelectProps<T extends string | number = string | number> {
  label: string;
  value: T;
  onChange: (event: SelectChangeEvent<T>) => void;
  options: Option<T>[];
  name?: string;
  width?: number | string; // 👈 added here
}

const BaseSelect = <T extends string | number>({
  label,
  value,
  onChange,
  options,
  name,
  width, // 👈 destructure it
}: BaseSelectProps<T>) => {
  return (
    <FormControl fullWidth={!width} sx={{ mb: 2, width }}>
      <InputLabel>{label}</InputLabel>
      <Select<T> value={value} label={label} onChange={onChange} name={name}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BaseSelect;
