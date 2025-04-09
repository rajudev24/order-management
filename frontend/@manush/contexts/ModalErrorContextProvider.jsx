import { createContext, useCallback, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const modalErrorContext = createContext(undefined);

export default function ModalErrorContextProvider({ children }) {
  const [status, setStatus] = useState({
    error: "",
    isLoading: false,
    hasError: false,
  });

  const setError = useCallback(
    (error) => {
      if (!status.hasError) {
        setStatus({ error: error, hasError: true, isLoading: false });
      }
    },
    [status],
  );

  const clearError = useCallback(() => {
    if (status.hasError || status.isLoading) {
      setStatus({ error: "", hasError: false, isLoading: false });
    }
  }, [status]);

  const setLoading = useCallback(() => {
    if (!status.isLoading) {
      setStatus({
        error: "",
        hasError: false,
        isLoading: true,
      });
    }
  }, [status]);

  return (
    <modalErrorContext.Provider
      value={{
        status: status,
        setError: setError,
        clearError: clearError,
        setLoading: setLoading,
      }}
    >
      {children}
    </modalErrorContext.Provider>
  );
}
