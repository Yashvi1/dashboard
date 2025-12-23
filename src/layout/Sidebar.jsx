import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  AppBar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          High Point
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />
      <List>
        {[
          { text: "Home", to: "/" },
          { text: "Users", to: "/users" },
          { text: "Admissions", to: "/admissions" },
          { text: "Financials", to: "/financials" },
          { text: "Schedule", to: "/schedule" },
        ].map(({ text, to }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={to}
              sx={{
                color: "white",
                "&.Mui-selected": {
                  bgcolor: "primary.dark",
                },
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar with hamburger for mobile */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "primary.dark",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "primary.main",
            color: "white",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Drawer for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "primary.main",
            color: "white",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
