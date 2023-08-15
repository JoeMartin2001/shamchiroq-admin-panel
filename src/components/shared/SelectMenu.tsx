import {
  FormControl,
  InputLabel,
  InputLabelProps,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  selectProps?: Partial<SelectProps>;
  labelProps?: Partial<InputLabelProps>;
}

export const SelectMenu = (props: Props) => {
  const {
    label = "",
    value,
    onChange,
    options = [],
    selectProps = {},
    labelProps = {},
  } = props;

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel {...labelProps}>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => {
          onChange(e.target.value as string);
        }}
        label={label}
        {...selectProps}
      >
        {options.map((option, idx) => {
          return (
            <MenuItem value={option} key={option + idx}>
              {option.toLocaleUpperCase()}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
