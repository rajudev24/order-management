import { NavLink, useLocation } from "react-router-dom";
import appRoutes from "../../src/constants/AppRoutes.js";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";

const Sidebar = () => {
  const location = useLocation();
  const sidebarRoutes = appRoutes.filter((route) => route.showInSidebar);

  const CustomNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.common.white,
    display: "block",
    "&.active": {
      backgroundColor: "#2f1c7a",
      "& .MuiListItem-root": {
        borderRight: `3px solid ${theme.palette.secondary.main}`,
      },
    },
    "&:hover": {
      backgroundColor: "#2f1c7a",
    },
  }));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#310554",
          color: "common.white",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          fontWeight: "bold",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        Dashboard Panel
      </Typography>

      <List>
        {sidebarRoutes.map((route) => (
          <CustomNavLink
            to={route.path}
            key={route.path}
            className={location.pathname === route.path ? "active" : ""}
          >
            <ListItem
              sx={{
                py: 1.5,
                px: 3,
                m: 1,
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: "40px" }}>
                {route.icon || <span>•</span>}
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          </CustomNavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
