import { useSnackbar } from "notistack";
import { useCallback } from "react";

const useNotiStack = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const errorStack = useCallback(
    (message, options) =>
      enqueueSnackbar(message, { variant: "error", ...options }),
    [],
  );

  const successStack = useCallback(
    (message, options) =>
      enqueueSnackbar(message, { variant: "success", ...options }),
    [],
  );

  const warningStack = useCallback(
    (message, options) =>
      enqueueSnackbar(message, { variant: "warning", ...options }),
    [],
  );

  const closeNotiStack = useCallback((key) => closeSnackbar(key), []);

  return {
    errorStack,
    successStack,
    warningStack,
    closeNotiStack,
  };
};

export default useNotiStack;
