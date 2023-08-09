import React from "react";
import {
  Avatar,
  Button,
  Container,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addTocart, deleteItems } from "../store/slices/cartSlice";
import { FaTrash } from "react-icons/fa";

const CartPage: React.FC = () => {
  const { cartItem } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const totalAmount = cartItem
    .map((item) => item.quantity * item.price)
    .reduce((a, b) => a + b, 0);

  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: isSmScreen ? theme.spacing(10) : theme.spacing(10),
        textAlign: "center",
      }}
    >
      <Paper>
        <div>
          <Typography variant="h5">Cart Items</Typography>
          {cartItem.length === 0 ? (
            <Typography variant="body1">Your cart is empty.</Typography>
          ) : (
            <List>
              {cartItem.map((item) => (
                <ListItem key={item.id}>
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <ListItemAvatar>
                        <Avatar alt={item.title} src={item.image} />
                      </ListItemAvatar>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              ${item.price} x {item.quantity} = $
                              {(item.price * item.quantity).toFixed(2)}
                            </Typography>
                          </>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Grid container justifyContent="flex-end" spacing={1}>
                        <Grid item>
                          <Button
                            onClick={() => {
                              dispatch(addTocart({ ...item, quantity: -1 }));
                            }}
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            -
                          </Button>
                        </Grid>
                        <Grid item>
                          <Typography>{item.quantity}</Typography>
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={() => {
                              dispatch(addTocart({ ...item, quantity: 1 }));
                            }}
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            +
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => dispatch(deleteItems(item.id))}
                          >
                            <FaTrash />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      Grand Total: ${totalAmount.toFixed(2)}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default CartPage;
