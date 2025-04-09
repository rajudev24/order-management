import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar.jsx";

const ProtectedLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "calc(100% - 240px)",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProtectedLayout;
