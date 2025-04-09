import QueryWrapper from "./QueryWrapper";
import ReduxWrapper from "./ReduxWrapper";
import RouteWrapper from "./RouteWrapper";
import ThemeWrapper from "./ThemeWrapper";
import ModalErrorContextProvider from "../../@manush/contexts/ModalErrorContextProvider.jsx";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div>
      <ReduxWrapper>
        <QueryWrapper>
          <ThemeWrapper>
            <SnackbarProvider
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              maxSnack={3}
              autoHideDuration={3000}
              style={{ zIndex: 1400 }}
            >
              <ModalErrorContextProvider>
                <RouteWrapper />
              </ModalErrorContextProvider>
            </SnackbarProvider>
          </ThemeWrapper>
        </QueryWrapper>
      </ReduxWrapper>
    </div>
  );
}

export default App;
