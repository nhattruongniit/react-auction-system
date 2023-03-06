import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const MainStyled = styled('main', {})(
  () => ({
    margin: 20
  })
)

const settings = ['Create New Item', 'Deposit', 'Logout'];

const AdminLayout = ({ children }: React.PropsWithChildren) => {
  const [isOpenUserMenu, setIsOpenUserMenu] = React.useState(false);

  function handleToogleUserMenu() {
    setIsOpenUserMenu(prevState => !prevState)
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
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              AUCTION
            </Typography>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}  onClick={handleToogleUserMenu}>
                <Avatar alt="Tony Nguyen" src="/static/images/avatar/2.jpg"  />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isOpenUserMenu}
                onClose={handleToogleUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleToogleUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
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