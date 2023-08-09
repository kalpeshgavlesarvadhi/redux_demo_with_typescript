import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FaCartPlus, FaBars } from "react-icons/fa";
import { useAppSelector } from "../store/store";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cartItem } = useAppSelector((state) => state.cart);
  const totalCartQuantity = cartItem.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = (
    <>
      <Button color="inherit">Home</Button>
      <Button color="inherit">
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to="/product"
        >
          <span>Products</span>
        </NavLink>
      </Button>
      <Button color="inherit">About Us</Button>
      <Button color="inherit">Contact</Button>
    </>
  );

  const drawerContents = (
    <List>
      <ListItem button onClick={toggleDrawer}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={NavLink} to="/product" onClick={toggleDrawer}>
        <ListItemText primary="Products" />
      </ListItem>
      <ListItem button onClick={toggleDrawer}>
        <ListItemText primary="About Us" />
      </ListItem>
      <ListItem button onClick={toggleDrawer}>
        <ListItemText primary="Contact" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="fixed" sx={{ height: "60px" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Store
        </Typography>
        {isSmScreen ? (
          <>
            <IconButton
              aria-label="toggle drawer"
              onClick={toggleDrawer}
              edge="start"
            >
              <FaBars color="white" />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
              {drawerContents}
            </Drawer>
          </>
        ) : (
          navLinks
        )}

        <NavLink to="/cart">
          <IconButton aria-label="cart">
            <Badge badgeContent={totalCartQuantity} color="warning">
              <FaCartPlus color="white" />
            </Badge>
          </IconButton>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
