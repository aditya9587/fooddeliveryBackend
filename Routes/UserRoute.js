import express from "express";
import { userLogin, userSignup ,getUserDetails , updateUserDetails} from "../controller/index.js";
import { addtocart ,getCart, removeItem} from "../controller/cart.js";
import { userLocation , getUserAddresses } from "../controller/location.js";
import { addPayment, getPayment, updatePayment } from "../controller/Payment.js";
import { verifyToken } from "../utils/verifyToken.js";

export const Router = express.Router();


Router.post("/signup", userSignup);

Router.post("/login", userLogin);

Router.get("/user", getUserDetails);

Router.put("/user", updateUserDetails);


Router.post("/addtocart",verifyToken, addtocart);

Router.get("/getcart/",verifyToken, getCart);

Router.delete("/removeitem",verifyToken, removeItem);

Router.post( "/addAddress",verifyToken , userLocation);

Router.get("/getAddress", verifyToken, getUserAddresses);

Router.post("/addPayment",verifyToken, addPayment);

Router.get("/getPayment",verifyToken, getPayment);

Router.put("/updatePayment",verifyToken, updatePayment);

