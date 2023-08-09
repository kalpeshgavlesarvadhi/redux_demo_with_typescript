import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../store/slices/productSlice";

interface ProductPopupProps {
  open: boolean;
  onClose: () => void;
  item: Product; // Replace with your actual item type
}

const ProductPopup: React.FC<ProductPopupProps> = ({ open, onClose, item }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ width: "90%" }}>
        <strong>{item.title}</strong>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: "absolute", right: 12, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <img
          width="50%"
          style={{
            height: "50%",
            objectFit: "contain",
            display: "block",
            margin: "0 auto",
          }}
          src={item.image}
          alt={item.title}
        />
        <Typography>
          <strong>Category: </strong> {item.category}
        </Typography>
        <Typography>
          <strong>Description</strong>: {item.description}
        </Typography>
        <Typography>
          <strong>Price</strong>: ${item.price}
        </Typography>
        <Typography>
          <strong>Ratings</strong>:
          <Rating
            name="half-rating-read"
            defaultValue={item.rating.rate}
            readOnly
          />
          {item.rating.count}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPopup;
