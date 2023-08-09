import React, { useEffect, useState } from "react";
import { Product, getProductData } from "../store/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { addTocart } from "../store/slices/cartSlice";
import ProductPopup from "./ProductPopup";

const ProductPage: React.FC = () => {
  const { product } = useAppSelector((state) => state.product);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  const openPopup = (item: Product) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductData());
  }, [dispatch]);
  return (
    <div>
      <Container maxWidth="xl">
        <h1>ProductPage</h1>
        <Grid container spacing={2}>
          {product.map((item) => (
            <Grid key={item.id} item xl={2.4} xs={12} lg={3} sm={6} md={4}>
              <Card
                key={item.id}
                sx={{ width: "100%", height: "auto", marginBottom: 1 }}
              >
                <Box
                  onClick={() => openPopup(item)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "auto",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      // height: "200",
                      maxHeight: 200,
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    noWrap
                    sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    color="text.secondary"
                  >
                    {item.description}
                  </Typography>
                  <Typography>Price: {`$ ${item.price}`}</Typography>
                  <Button
                    fullWidth={true}
                    onClick={() =>
                      dispatch(addTocart({ ...item, quantity: 1 }))
                    }
                    variant="contained"
                    color="primary"
                  >
                    Add to cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {selectedItem && (
        <ProductPopup
          open={Boolean(selectedItem)}
          onClose={closePopup}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default ProductPage;
