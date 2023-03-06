import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

// configs
import { PATH_NAME } from '../../config';

const MainStyled = styled('main', {})(
  () => ({
    margin: 20
  })
)

const settings = [
  {
    title: 'Create New Item',
    path: PATH_NAME.CREATE_ITEM
  },
  {
    title: 'Deposit',
    path: PATH_NAME.DEPOSIT
  },
  {
    title: 'Logout',
  },
];

const AdminLayout = ({ children }: React.PropsWithChildren) => {
  // states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // hooks
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string | undefined) => () => {
    if (!path) return;
    navigate(path);
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              onClick={handleNavigate(PATH_NAME.ROOT)}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              AUCTION
            </Typography>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }} id="menu-appbar" onClick={handleOpenUserMenu}>
                <Avatar alt="Tony Nguyen" src="/static/images/avatar/2.jpg"  />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={handleNavigate(setting.path)}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <MainStyled>
        {children}
      </MainStyled>
    </>
  );
}

export default AdminLayout;