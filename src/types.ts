import Razorpay from "razorpay/dist/razorpay";
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

export interface RZP extends Razorpay { }

export interface payment extends Payments.RazorpayPayment { }
export interface refunds extends Refunds.RazorpayRefund { }