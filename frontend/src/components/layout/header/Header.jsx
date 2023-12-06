import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from "../../../images/logo.png";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { CssBaseline } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';


import { useDispatch, useSelector } from 'react-redux';
import { removeCredentials } from '../../../features/user/userSlice';
import { useLazyLogoutQuery } from "../../../features/user/userApiSlice"
import { removeCookie } from '../../../utils/Cookie';
import { AUTH_COOKIE } from '../../../constants/Constants';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function Header(props) {

  const dispatch = useDispatch()
  const history = useNavigate();
  const [logOut] = useLazyLogoutQuery();

  const { isAuthenticated, loading ,user} = useSelector(state => state.user);
  const totalCartItems = useSelector(state => state.cart.totalItems)


  const [keyword, setKeyword] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    left: false,
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const logoutHandler = () => {
    handleMobileMenuClose()
    handleMenuClose()
    dispatch(removeCredentials());
    removeCookie(AUTH_COOKIE);
    logOut();
    history("/login")
  }

  const loginHandler = () => {
    handleMobileMenuClose()
    handleMenuClose()
  }

  const profileHandler = () => {
    handleMobileMenuClose()
    handleMenuClose()
    history("/profile")
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`)
    }
    else {
      history("/products")
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profileHandler}>Profile</MenuItem>
      {!loading && isAuthenticated ?
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        :
        <MenuItem onClick={loginHandler}>Login</MenuItem>
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';


  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show cart items"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      <MenuItem >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={profileHandler}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      {isAuthenticated ?
        <MenuItem>
          <IconButton onClick={logoutHandler}
            size="large"
            aria-label="login / logout"
            color="inherit"
          >
            <LogoutIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
        :
        <MenuItem>
          <IconButton
            size="large"
            aria-label="login / logout"
            color="inherit"
            onClick={loginHandler}
          >
            <LoginIcon />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      }
    </Menu>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

        <ListItem disablePadding>
          <ListItemButton onClick={() => { history("/") }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => { history("/products") }}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText >Products</ListItemText>
          </ListItemButton>
        </ListItem>

      </List>
    </Box>
  );



  return (
    <Box mb={"6rem"}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: { xs: 1.5 } }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor}>

              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}

          <Link to={"/"}>
            <Box
              component="img"
              sx={{ height: 54, display: { xs: 'none', sm: 'initial' } }}
              alt="Logo"
              src={logo}
            />
          </Link>

          <Typography variant="h6" color="inherit" component="div" sx={{ m: -2, display: { xs: 'none', sm: 'initial' } }} >
            Eshop
          </Typography>


          <Box sx={{ flexGrow: 1 }} />

          <form onSubmit={searchSubmitHandler}>
            <Search >
              <SearchIconWrapper >
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setKeyword(e.target.value)}

              />
            </Search>
          </form>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <IconButton
              size="large"
              aria-label="show Cart items"
              color="inherit"
            >

              {(totalCartItems > 0) ?
                <Badge  onClick={() => history("/cart")} badgeContent={totalCartItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
                :
                <ShoppingCartIcon  onClick={() => history("/cart")}/>
              }


            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            > 
              {(user && user.avatar) ?  <Avatar alt="profile" src={user.avatar.url} /> :<AccountCircle /> }
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
