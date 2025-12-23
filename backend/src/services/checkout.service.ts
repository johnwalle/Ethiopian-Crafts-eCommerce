// src/services/checkout.service.ts
import axios from "axios";
import { config } from "../config/config";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import { Document, Types } from "mongoose";
import Order, { IOrder } from "../models/order.schema"; // import Mongoose IOrder
import { cartService } from "./cart.service";

// --- Interfaces for type safety ---
interface IUser {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
}

// Response type from Chapa
interface ChapaResponse {
    status: string;
    message?: string;
    data?: {
        checkout_url?: string;
        [key: string]: any;
    };
}

/**
 * Initialize payment with Chapa
 */
export const checkout = async (order: IOrder, user: IUser): Promise<ChapaResponse> => {
    try {
        if (!user || !user.fullName || !user.email) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User details are missing");
        }
        if (!order || !order.total_price) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Order details are missing");
        }

        const [first, ...rest] = user.fullName.split(" ");
        const last = rest.join(" ") || "";

        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        const tx_ref = `${first.toLowerCase()}_${last.toLowerCase()}_${timestamp}_${randomNum}`;

        const requestData = {
            amount: order.total_price,
            currency: "ETB",
            email: user.email,
            first_name: first,
            last_name: last,
            tx_ref,
            callback_url: `https://ethiopian-crafts-ecommerce.onrender.com/api/checkout/verify/${user._id}`,  
            return_url: `https://ethiopian-crafts-e-commerce.vercel.app/dashboard?tab=orders`,
        };

        const response = await axios.post<ChapaResponse>(
            "https://api.chapa.co/v1/transaction/initialize",
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${config.chapaPayment.secretKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data.status === "success") {
            order.tx_ref = tx_ref;
            await order.save();
        } else {
            throw new ApiError(httpStatus.BAD_GATEWAY, "Failed to initialize payment with Chapa");
        }

        return response.data;
    } catch (error: any) {
        console.error("Error during checkout:", error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Checkout process failed. Please try again.");
    }
};


/**
 * Verify payment status with Chapa
 */
export const verifyCheckout = async (txRef?: string) => {
  try {
    if (!txRef) throw new ApiError(httpStatus.BAD_REQUEST, "Transaction reference is missing");

    const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${txRef}`, {
      headers: {
        Authorization: `Bearer ${config.chapaPayment.secretKey}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error verifying checkout:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Payment verification failed.");
  }
};