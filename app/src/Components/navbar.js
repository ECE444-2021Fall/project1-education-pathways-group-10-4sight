import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { useTheme } from "@mui/styles"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"

import Logo from "./logo"
import { AuthContext } from "../contexts/auth"

const NavBarOption = ({ title, link }) => (
  <Link to={link} style={{ margin: "auto 14px" }}>
    <Typography sx={{ fontSize: "18px", margin: "0 1rem" }}>{title}</Typography>
  </Link>
)

export const NavBar = () => {
  const theme = useTheme()
  const history = useHistory()
  const onMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const { isAuthed, logout } = useContext(AuthContext)

  const navOptions = [
    { title: "My Profiles", link: "/profiles" },
    { title: "Find Courses", link: "/" },
    { title: "My Account", link: "/account" },
    { title: "Help", link: "/help" },
  ]

  const mobileNavBar = (
    <>
      <IconButton
        id="nav-menu-toggle"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        open={!!menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
        anchorEl={menuAnchorEl}
      >
        {navOptions.map((option) => (
          <Link to={option.link}>
            <MenuItem>{option.title}</MenuItem>
          </Link>
        ))}
        {isAuthed ? (
          <MenuItem
            onClick={() => {
              logout()
              history.push("/")
            }}
          >
            Logout
          </MenuItem>
        ) : (
          <>
            <Link to="/login">
              <MenuItem>Login</MenuItem>
            </Link>
            <Link to="/signup">
              <MenuItem>Sign Up</MenuItem>
            </Link>
          </>
        )}
      </Menu>
      <Link to="/" style={{ margin: "auto" }}>
        <Logo height={48} width={96} />
      </Link>
    </>
  )

  const desktopNavBar = (
    <>
      <Link to="/">
        <Logo height={48} width={96} />
      </Link>
      {navOptions.map((option) => (
        <NavBarOption title={option.title} link={option.link} />
      ))}
      <div style={{ flex: 1 }} />
      {isAuthed ? (
        <Button
          variant="contained"
          sx={{
            marginRight: "14px",
            backgroundColor: theme.palette.button.navBarButton,
          }}
          onClick={() => {
            logout()
            history.push("/")
          }}
        >
          Logout
        </Button>
      ) : (
        <>
          <Link to="/login">
            <Button
              variant="contained"
              sx={{
                marginRight: "14px",
                backgroundColor: theme.palette.button.navBarButton,
              }}
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              variant="contained"
              sx={{ backgroundColor: theme.palette.button.navBarButton }}
            >
              Signup
            </Button>
          </Link>
        </>
      )}
    </>
  )
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar
        sx={{
          maxWidth: 1440,
          width: "100%",
          margin: "auto",
          boxSizing: "border-box",
        }}
      >
        {onMobile ? mobileNavBar : desktopNavBar}
      </Toolbar>
    </AppBar>
  )
}
