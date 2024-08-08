import Razorpay from "razorpay/dist/razorpay";
import { Orders } from "razorpay/dist/types/orders";
import { Payments } from "razorpay/dist/types/payments";
import { Refunds } from "razorpay/dist/types/refunds";

export interface ConfigInterface {
    key_id: string;
    key_secret: string;
}

export type RefundInterface = {
    paymentId: string;
    amount: number;
    currency: "INR" | "USD";
}

export interface CheckPayment {
    paymentId: string;
}

export interface OrderInterface {
    amount: number;
    currency: "INR" | "USD";
    receipt: string;
}

export interface RZP extends Razorpay { }
export interface Order extends Orders.RazorpayOrder { }
export interface Payment extends Payments.RazorpayPayment { }
export interface Refund extends Refunds.RazorpayRefund { }