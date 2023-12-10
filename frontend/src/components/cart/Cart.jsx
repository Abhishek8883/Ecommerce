import React, { useEffect } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import { useLazyGetAllCartItemsQuery, useRemoveItemCartMutation, useUpdateItemQuantityMutation } from "../../features/cart/cartApiSlice";
import { fetchCartItems, addItemsCart, removeItemsCart,updateTotalItems} from "../../features/cart/cartSlice";
import { useAlert } from 'react-alert';
import MetaData from "../layout/MetaData";
import {useNavigate} from "react-router-dom"

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading,totalItems } = useSelector((state) => state.cart);
  const [getCartItems] = useLazyGetAllCartItemsQuery();
  const [updateQuantity] = useUpdateItemQuantityMutation();
  const [removeItem] = useRemoveItemCartMutation();
  const alert = useAlert();
  const navigate = useNavigate();
  const loadProductsCart = async () => {
    
    try {
      dispatch(fetchCartItems());
      const foundItems = await getCartItems().unwrap();
      if (foundItems.success) {
        dispatch(addItemsCart(foundItems.data.items))
      } else {
        dispatch(removeItemsCart())
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {

    loadProductsCart()
  },[])

  const increaseQuantity = async (id, quantity, stock) => {
    try {
      const newQty = quantity + 1;
      if (stock <= quantity) {
        return;
      }
      const result = await updateQuantity({ id, quantity: newQty }).unwrap();
      if (result.success) {
        alert.success(result.message);
      }

    } catch (error) {
      let err = JSON.parse(JSON.stringify(error))
      alert.error(err.data.message)
    }
    loadProductsCart()
  };


  const decreaseQuantity = async (id, quantity) => {
    try {
      const newQty = quantity - 1;
      if (1 >= quantity) {
        return;
      }
      const result = await updateQuantity({ id, quantity: newQty }).unwrap();
      if (result.success) {
        alert.success(result.message);
      }

    } catch (error) {
      let err = JSON.parse(JSON.stringify(error))
      alert.error(err.data.message)
    }
    loadProductsCart()
  };



  const deleteCartItems = async (id) => {
    try {
      const result = await removeItem(id).unwrap();
      if (result.success) {
        alert.success(result.message);
      }
    } catch (error) {
      let err = JSON.parse(JSON.stringify(error))
      alert.error(err.data.message)
    }
    dispatch(updateTotalItems(totalItems-1))
    loadProductsCart()
  };

  const checkoutHandler = () => {
    navigate("/shipping")
  };

  return (
    <>
      {loading ?
        <Loader />
        :
        (<>
          <MetaData title="Cart -- ECOMMERCE"/> 
          {(!cartItems || cartItems.length === 0) ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />

              <Typography>No Product in Your Cart</Typography>
              <Link to="/products">Continue Shopping</Link>
            </div>
          ) : (
            <>
              <div className="cartPage">
                <div className="cartHeader">
                  <p>Product</p>
                  <p>Quantity</p>
                  <p>Subtotal</p>
                </div>

                {cartItems &&
                  cartItems.map((item, id) => (
                    <div className="cartContainer" key={id}>
                      <CartItemCard item={item.product} deleteCartItems={deleteCartItems} />
                      <div className="cartInput">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.product._id, item.quantity)
                          }
                        >
                          -
                        </button>
                        {/* <input type="number" value={item.quantity} readOnly /> */}
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.product._id,
                              item.quantity,
                              item.product.stock
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className="cartSubtotal">{`₹${item.product.price * item.quantity
                        }`}</p>
                    </div>
                  ))}

                <div className="cartGrossProfit">
                  <div></div>
                  <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    <p>{`₹${cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.product.price,
                      0
                    )}`}</p>
                  </div>
                  <div></div>
                  <div className="checkOutBtn">
                    <button onClick={checkoutHandler}>Check Out</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>)
      }
    </>
  );
};

export default Cart;
