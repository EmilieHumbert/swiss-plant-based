import { useForm } from "react-hook-form";

import SettingsTextField from "../SettingsTextField";

import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

export default function SettingsForm({
  cancel,
  defaultValue,
  field,
  label,
  rules,
  submit,
}) {
  const { control, errors, handleSubmit } = useForm({
    defaultValues: {
      [field]: defaultValue,
    },
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <SettingsTextField
        control={control}
        field={field}
        label={label}
        rules={rules}
      />
      <IconButton type="submit">
        <DoneIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={cancel}>
        <ClearIcon fontSize="small" />
      </IconButton>
      {errors[field] && <div>{errors[field].message}</div>}
    </form>
  );
}
