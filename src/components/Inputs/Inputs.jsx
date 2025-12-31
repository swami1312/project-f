// Inputs.jsx - Updated CustomSelect Component

import { Icon } from "@iconify/react";
import { iconifyIcons } from "../../Utils/constants";
import "./Inputs.css";
import styled from "styled-components";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
const InputContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: space-between;
  gap: ${(props) => (props.direction === "column" ? "10px" : "0px")};
  align-items: ${(props) =>
    props.direction === "column" ? "start" : "center"};
  margin: 10px 0;
`;
const InputTextContainer = styled.div`
  display: flex;
  /* margin-left: 8px; */
  margin-bottom: 18px;
`;

const InputLabels = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  width: 23.5%;
  color: #333;
`;
const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  width: 30%;
  color: #333;
  /* margin-left: 10px; */
`;

const Input = styled.input`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  margin-top: 20px;
  width: 30%;
  background-color: #fff;
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 2px;
`;

const commonInputStyle =
  "w-full px-3 py-2 border border-[var(--border-color2)] rounded-md text-sm focus:ring-2 focus:ring-black-600 focus:border-transparent !outline-none ";
export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search here",
  className = "",
}) => {
  return (
    <div
      className={`relative flex items-center bg-[var(--light-color)] ${className} `}
    >
      <Icon
        icon={iconifyIcons.search}
        className="absolute left-3 text-[var(--border-color2)] text-base"
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-9 pr-3 py-2 border border-[var(--border-color2)]
                   text-sm w-64 focus:outline-none focus:ring-1 focus:ring-orange-400
                   transition-all placeholder:text-gray-400 bg-[var(--offwhite-bg)] rounded-3xl"
      />
    </div>
  );
};

export const TextInput = (props) => {
  const { registerFormEvents, registerevents, type = "text" } = props;
  const newProps = { ...props };
  delete newProps.alignItems;
  delete newProps.registerFormEvents;
  delete newProps.registerformevents;
  delete newProps.label;
  delete newProps.defaultValue;

  return (
    <input
      placeholder={`${props.placeholder || "Type Here.."}`}
      type={type}
      {...newProps}
      {...registerFormEvents}
      {...registerevents}
      className={`${commonInputStyle + props.className}`}
    />
  );
};

export const TextArea = (props) => (
  <textarea
    placeholder="Enter Reject Message"
    className="w-full px-4 py-3 border border-[var(--theme-color)]
                rounded-lg focus:outline-none focus:ring-2
              disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
    rows={4}
    {...props}
  />
);

export const CustomFormInput = ({
  label,
  registerevents,
  errormsg,
  textarea = false,
  onChange,
  value,
  placeholder,
  rows = 3,
  children,
  type = "text",
  disable,
  direction = "row",
  className,
}) => {
  return (
    <InputContainer direction={direction} style={{ alignItems: "flex-start" }}>
      {label && (
        <Label>
          {label} {direction === "row" && ":"}
        </Label>
      )}

      <div className=" flex flex-col">
        {children ||
          (textarea ? (
            <TextArea
              {...registerevents}
              onChange={(e) => {
                registerevents?.onChange(e);
                onChange && onChange(e);
              }}
              rows={rows}
              placeholder={placeholder}
              className={`${commonInputStyle + className}`}
              disabled={disable}
            />
          ) : (
            <input
              {...registerevents}
              onChange={(e) => {
                registerevents?.onChange(e);
                onChange && onChange(e);
              }}
              type={type}
              placeholder={placeholder}
              className={`${commonInputStyle + className}`}
              disabled={disable}
            />
          ))}
        {errormsg && <ErrorMsg>{errormsg}</ErrorMsg>}
      </div>
    </InputContainer>
  );
};

export const CustomSelect = ({
  label,
  registerevents,
  errormsg,
  placeholder = "Select an option",
  value,
  onChange,
  required,
  name,
  options = [],
  keyValuePair,
  direction,
}) => {
  return (
    <InputContainer direction={direction}>
      {label && (
        <Label>
          {label}:{required && <span className="text-red-600"> *</span>}
        </Label>
      )}

      <SelectWrapper>
        <StyledSelect
          name={name}
          {...(registerevents
            ? registerevents
            : {
                value,
                onChange: (e) => {
                  const selectedOption =
                    e.target.options[e.target.selectedIndex];
                  console.log(selectedOption);
                  onChange({
                    target: {
                      value: e.target.value,
                      id: selectedOption.getAttribute("id"),
                    },
                  });
                },
              })}
          required={required}
        >
          <option value="">{placeholder}</option>
          {options.map((each) => {
            return (
              <option
                key={each[keyValuePair[0]]}
                id={each[keyValuePair[0]]}
                value={each[keyValuePair[1]]}
              >
                {each[keyValuePair[1]]?.toUpperCase()}
              </option>
            );
          })}
        </StyledSelect>
      </SelectWrapper>

      {errormsg && <ErrorMsg>{errormsg}</ErrorMsg>}
    </InputContainer>
  );
};
export const CustomLabelText = ({
  label,
  value,
  errormsg,
  direction = "row",
  text,
}) => {
  return (
    <InputTextContainer>
      {label && (
        <InputLabels>
          {label} {direction === "row" && ":"}
        </InputLabels>
      )}

      <span style={{ fontWeight: 500, color: "#333", fontSize: "14px" }}>
        {value || text}
      </span>

      {errormsg && <ErrorMsg>{errormsg}</ErrorMsg>}
    </InputTextContainer>
  );
};
export function CustomeCheckbox({
  checked,
  onChange,
  disabled = false,
  className = "",
  id,
}) {
  return (
    <input
      type="checkbox"
      checked={checked}
      id={id}
      onChange={onChange}
      disabled={disabled}
      className={`w-4 h-4 cursor-pointer
        accent-[var(--theme-color)] text-[#fff] ${className}`}
    />
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  sx: {
    zIndex: 20000, // menu root z-index (works on portal)
  },
  PaperProps: {
    sx: {
      zIndex: 20000, // paper inside menu
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CustomMultiSelect = ({
  label,
  placeholder,
  id,
  value,
  onChange,
  items = [],
  keyValuePair, // ['key', 'label']
  size = "small",
  width,
  color = "#9c9c9c",
  sx = {},
  formControlSx = {},
  errormsg = "",
  multiple = true,
  showCheckbox = true,
  direction,
  maxWidth,
}) => {
  // ✅ Normalize items
  const normalizedItems = React.useMemo(() => {
    if (!Array.isArray(items)) return [];

    if (
      items.length &&
      typeof items[0] === "object" &&
      keyValuePair?.length === 2
    ) {
      return items.map((item) => ({
        key: item[keyValuePair[0]],
        label: item[keyValuePair[1]],
      }));
    }

    return items.map((val) => ({
      key: val,
      label: val,
    }));
  }, [items, keyValuePair]);

  // ✅ Ensure correct value type
  const safeValue = multiple ? value ?? [] : value ?? "";

  return (
    <InputContainer direction={direction}>
      {label && <Label>{label}</Label>}

      <FormControl
        size={size}
        sx={{ minWidth: width, ...formControlSx, maxWidth: maxWidth }}
        error={!!errormsg}
      >
        <Select
          id={id}
          multiple={multiple}
          value={safeValue}
          onChange={onChange}
          displayEmpty
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          sx={{ height: "42px", ...sx }}
          renderValue={(selected) => {
            // 🔹 EMPTY STATE → show placeholder inside input
            if (
              (!multiple && !selected) ||
              (multiple && selected.length === 0)
            ) {
              return <span style={{ color: "#9c9c9c" }}>{placeholder}</span>;
            }

            // 🔹 SINGLE SELECT
            if (!multiple) {
              const item = normalizedItems.find((i) => i.key === selected);
              return item?.label || "";
            }

            // 🔹 MULTI SELECT
            return normalizedItems
              .filter((i) => selected.includes(i.key))
              .map((i) => i.label)
              .join(", ");
          }}
        >
          {normalizedItems.map((item) => (
            <MenuItem key={item.key} value={item.key}>
              {showCheckbox && multiple && (
                <Checkbox checked={safeValue.includes(item.key)} />
              )}
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errormsg && <ErrorMsg>{errormsg}</ErrorMsg>}
    </InputContainer>
  );
};

export const CustomDateInput = ({
  label,
  registerevents,
  errormsg,
  placeholder = "Select Date",
  value,
  onChange,
  required = false,
  name,
  id,
  format = "YYYY-MM-DD",
  minDateTime,
  maxDateTime,
  disabled = false,
  direction,
  readOnly = true,
  datePickerSx,
}) => {
  return (
    <InputContainer direction={direction}>
      {label && (
        <Label>
          {label}:{required && <span className="text-red-600"> *</span>}
        </Label>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value ? dayjs(value) : null}
          format={format}
          minDate={minDateTime ? dayjs(minDateTime) : undefined}
          maxDate={maxDateTime ? dayjs(maxDateTime) : undefined}
          disabled={disabled}
          slotProps={{
            textField: {
              name,
              size: "small",
              required,
              placeholder,
              inputProps: { readOnly },
              sx: { width: "100%", ...datePickerSx },
              ...(registerevents ? registerevents : {}),
            },
          }}
          onChange={(newValue) => {
            if (!newValue) return;

            const formatted = dayjs(newValue).format(format);

            onChange?.({
              target: {
                name,
                id,
                value: formatted,
              },
            });

            registerevents?.onChange?.({
              target: {
                name,
                value: formatted,
              },
            });
          }}
        />
      </LocalizationProvider>

      {errormsg && <ErrorMsg>{errormsg}</ErrorMsg>}
    </InputContainer>
  );
};
