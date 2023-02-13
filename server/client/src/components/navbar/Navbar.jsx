import { Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { AccountCircle, SearchOutlined } from "@mui/icons-material";
import { Search, SearchIconWrapper, StyledInputBase, NavbarBg } from "./navbarStyle";
import { useContext, useState } from "react";
import { Logo, LogoContainer, Name, Span, Title } from "./navbarStyled";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    const name = currentUser?.username
    const [anchorEl, setAnchorEl] = useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
                                <Name>{name}</Name>
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