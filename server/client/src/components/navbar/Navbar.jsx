import { Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { AccountCircle, SearchOutlined } from "@mui/icons-material";
import { Search, SearchIconWrapper, StyledInputBase, NavbarBg } from "./navbarStyle";
import { useContext, useState } from "react";
import { Logo, LogoContainer, Name, Span, Title } from "./navbarStyled";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { ErrorContainer, ErrorText } from "../forms/formsStyle";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const name = currentUser?.username
    const [errorAxios, setErrorAxios] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';

    const handleLogout = async () => {
        try {
            await logout();
            setAnchorEl(null);
        } catch (e) {
            setErrorAxios(e.response.data.message);
        }
    };
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
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
            <ErrorContainer>
                {errorAxios && (
                    <ErrorText>{errorAxios}</ErrorText>
                )}
            </ErrorContainer>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <NavbarBg position="static">
                <Toolbar>
                    <LogoContainer>
                        <Logo src={logo} alt="logo"/>
                        <Title>
                            Lia<Span>Messenger</Span>
                        </Title>
                    </LogoContainer>
                    <Search>
                        <SearchIconWrapper>
                            <SearchOutlined />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {currentUser === null
                            ? (
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle sx={{ width: 48, height: 'auto' }} />
                                </IconButton>
                            )
                            : (
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <Name>{name}</Name>
                                </IconButton>
                            )
                        }

                    </Box>

                </Toolbar>
            </NavbarBg>
            {renderMenu}
        </Box>
    );
};

export default Navbar;