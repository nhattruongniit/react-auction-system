import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

// components
import RootLayout from "../RootLayout";

// configs
import { PATH_NAME } from "../../config";

// services
import authService from "../../services/authServices";

// hooks
import { useAppContext } from "../../context/AppContext";

// helpers
import { numberToCurrency } from "../../helpers/numberToCurrency";

const MainStyled = styled(
  "main",
  {}
)(() => ({
  margin: 20,
}));

const AdminLayout = ({ children }: React.PropsWithChildren) => {
  // states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // hooks
  const navigate = useNavigate();
  const { user } = useAppContext();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string | undefined) => () => {
    if (!path) return;
    navigate(path);
  };

  const handleLogout = () => {
    authService.logOut();
    navigate(PATH_NAME.LOGIN);
  };

  return (
    <RootLayout>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              onClick={handleNavigate(PATH_NAME.ROOT)}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              AUCTION
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  mr: 2,
                }}
              >
                Balance: {numberToCurrency(user.deposit || 0)}
              </Typography>

              <IconButton
                sx={{ p: 0 }}
                id="menu-appbar"
                onClick={handleOpenUserMenu}
              >
                <Avatar alt={user.email} src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleNavigate(PATH_NAME.CREATE_ITEM)}>
                  <Typography textAlign="center">Create New Item</Typography>
                </MenuItem>
                <MenuItem onClick={handleNavigate(PATH_NAME.DEPOSIT)}>
                  <Typography textAlign="center">Deposit</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <MainStyled>{children}</MainStyled>
    </RootLayout>
  );
};

export default AdminLayout;
