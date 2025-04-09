import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import clsx from "clsx";
import ButtonSkeleton from "../../skeleton/ButtonSkeleton/ButtonSkeleton.jsx";

const PREFIX = "DefaultButton";

const classes = {
  button: `${PREFIX}-button`,
  disabled: `${PREFIX}-disabled`,
  progress: `${PREFIX}-progress`,
  pending: `${PREFIX}-pending`,
};

const StyledButton = styled(Button)(({ theme }) => ({
  [`& .${classes.button}`]: {
    color: theme.palette.success.main,
  },
  [`&.${classes.disabled}`]: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
  },
  [`&.${classes.progress}`]: {
    color: theme.palette.warning.contrastText,
    backgroundColor: theme.palette.warning.main,
  },
  [`&.${classes.pending}`]: {
    color: theme.palette.grey.A700,
    backgroundColor: theme.palette.grey.A400,
  },
}));

const muiVariants = ["contained", "outlined", "text"];

const DefaultButton = ({
  onClick,
  isLoading,
  className,
  variant = "contained",
  type = "button",
  target,
  children,
  ...extra
}) => {
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <StyledButton
      disableRipple
      disableElevation
      onClick={onClick}
      className={
        extra?.color
          ? clsx(classes.button, className, classes?.[variant])
          : className
      }
      color={extra?.color || "primary"}
      variant={muiVariants.includes(variant) ? variant : muiVariants[0]}
      type={type}
      {...extra}
    >
      {children}
    </StyledButton>
  );
};

export default DefaultButton;
