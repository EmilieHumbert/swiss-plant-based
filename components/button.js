import React from "react";

import { Button as MaterialUIButton } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Button({ isLoading, title, children, ...buttonProps }) {
  return (
    <MaterialUIButton variant="outlined" {...buttonProps}>
      {isLoading ? <CircularProgress width="20" /> : title}
      {children}
    </MaterialUIButton>
  );
}
