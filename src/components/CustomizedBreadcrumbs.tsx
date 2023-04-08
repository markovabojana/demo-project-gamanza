import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { useLocation } from "react-router-dom";
import { PublicRounded, SchoolRounded } from "@mui/icons-material";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  console.info("You clicked a breadcrumb.");
}

export default function CustomizedBreadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Countries"
          icon={<PublicRounded fontSize="medium" />}
        />
        {pathname.indexOf("universities") !== -1 && (
          <StyledBreadcrumb
            icon={<SchoolRounded fontSize="medium" />}
            component="div"
            label="Universities"
          />
        )}
      </Breadcrumbs>
    </div>
  );
}
