import React from "react";

const CartItem = (props) => {
  const { price, title, qty } = props.product;
  const {
    product,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onDeleteProduct,
  } = props;
  return (
    <div className="cart-item">
      <div className="left-block">
        <img style={styles.image} src={product.image} />
      </div>
      <div className="right-block">
        <div style={{ fontSize: 50 }}>{title}</div>
        <div style={{ color: "#777", fontSize: 25 }}>₹ {price}</div>
        <div style={{ color: "#111", fontSize: 15 }}>Qty: {qty}</div>
        <div className="cart-item-actions">
          {/* buttons */}

          <img
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/plus-symbol-1577382-1339654.png"
            className="action-icons"
            alt="increase"
            onClick={() => onIncreaseQuantity(product)}
          />
          <img
            src="https://www.flaticon.com/premium-icon/icons/svg/2801/2801932.svg"
            className="action-icons"
            alt="decrease"
            onClick={() => onDecreaseQuantity(product)}
          />
          <img
            src="https://www.flaticon.com/premium-icon/icons/svg/2907/2907762.svg"
            className="action-icons"
            alt="delete"
            onClick={() => onDeleteProduct(product.id)}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  image: {
    height: 150,
    width: 150,
    borderRadius: 4,
    background: "#ccc",
  },
};

export default CartItem;
