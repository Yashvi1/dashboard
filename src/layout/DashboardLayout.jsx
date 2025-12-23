import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, // full width minus drawer width
    ml: { sm: '240px' },                 // margin-left to avoid drawer
    mt: 8, }}>
        <Outlet />
      </Box>
    </Box>
  );
}
