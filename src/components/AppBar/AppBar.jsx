import * as React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogModal from 'components/UserMenu/auth/LogModal';
import UserMenu from '../UserMenu/UserMenu';
import { useAuth } from 'hooks';
import s from '../AppBar/AppBar.module.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

function AppBarNavigation() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { isLoggedIn } = useAuth();

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ mb: 5, backgroundColor: 'rgb(220,220,220)', boxShadow: 4 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/" className={s.link}>
                  Home
                </NavLink>
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink to="/contacts" className={s.link}>
                    Contacts
                  </NavLink>
                </MenuItem>
              ) : null}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to="/" className={s.link}>
                Home
              </NavLink>
            </MenuItem>
            {isLoggedIn ? (
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/contacts" className={s.link}>
                  Contacts
                </NavLink>
              </MenuItem>
            ) : null}
          </Box>
          {isLoggedIn ? <UserMenu /> : <LogModal />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppBarNavigation;
