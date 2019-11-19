import Dashboard from "./views/Dashboard.js";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  }
];
export default dashRoutes;
