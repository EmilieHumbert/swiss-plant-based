import React from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

export default function SettingsTextField({
  control,
  field,
  label,
  rules,
  type,
}) {
  return (
    <div>
      <Controller
        name={field}
        control={control}
        rules={rules}
        render={({ onChange, ref, value }) => (
          <TextField
            fullWidth
            label={label}
            type={type}
            required={!!rules.required}
            variant="outlined"
            value={value}
            onChange={onChange}
            inputRef={ref}
          />
        )}
      />
    </div>
  );
}
