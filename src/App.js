import logo from './logo.svg';
import './App.css';
import {useLocalStorage} from "./Components/LocalStorage/HandleLocalStorage";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoutes";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {AppBar, Box, Button, Container, CssBaseline, IconButton, MenuItem, Toolbar, Typography} from "@mui/material";
import * as React from "react";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import FolderIcon from '@mui/icons-material/Folder';
import MenuIcon from '@mui/icons-material/Menu';

function  AppBarNavigation({token, setToken, user, setUser}) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        localStorage.setItem('user', JSON.stringify(null));
        localStorage.setItem('token', JSON.stringify(null));
        setToken(null)
        setUser(null)
        window.location.reload();

    }
    const pages = ['Home Page'];
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FolderIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                        YEET
                    </Typography>

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
                                <MenuItem key={'page'} onClick={handleCloseNavMenu}>
                                    <Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}>
                                    <Typography textAlign="center">{"Home Page"}</Typography>
                                    </Link>
                                </MenuItem>
                        </Menu>
                    </Box>
                    <FolderIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        YEET
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <Button
                                key={'page'}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}>
                                {"Home Button"}
                                </Link>
                            </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <Button
                                key={'Profile'}
                                onClick={handleOpenUserMenu}
                                sx={{ my: 2, color: 'white',  display: user !== null ? 'block' : 'none'} }

                            >
                                {'Profile'}
                            </Button>
                        </Tooltip>
                        <Tooltip title={'Go to Login Page'}>
                            <Link to={'/login'}>
                                <Button
                                    key={'Login'}
                                    sx={{ my: 2, color: 'white', display: user === null ? 'block' : 'none' } }
                                >
                                    {'Login'}
                                </Button>
                            </Link>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key={'account'} onClick={handleCloseUserMenu}>
                                <Link to={'/account'} style={{textDecoration: 'none', color: 'inherit'}}
                                >
                                    <Typography textAlign="center">{'Profile'}</Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem key={'logout'} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" onClick={handleLogout}>{'Logout'}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}


const App = () =>{

    const [user, setUser] = useLocalStorage("user", null)
    const [token, setToken] = useLocalStorage("token", null)

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <AppBarNavigation token={token} setToken={setToken} user={user} setUser={setUser}/>
          <Routes>
      <Route>
        <Route index element={<HomePage token={token} setToken={setToken} user={user} setUser={setUser}/>} />
        <Route path={"login"} element={<LoginPage setToken={setToken} setUser={setUser}/>} />
        <Route path={"register"} token={token} setToken={setToken} user={user} setUser={setUser}/>
      </Route>
      <Route element={<ProtectedRoute user={user}/>}>
        <Route index element={<HomePage token={token} setToken={setToken} user={user} setUser={setUser}/>} />
        <Route path={"account"} token={token} setToken={setToken} user={user} setUser={setUser}/>
      </Route>
    </Routes>
      </ThemeProvider>
  );
}

export default App;
