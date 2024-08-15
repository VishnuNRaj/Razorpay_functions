// refund.ts
import { RefundInterface, RefundResponse, RZP } from './types';

const validate = (data: RefundInterface) => {
    if (typeof (data.amount) !== "number") {
        throw new Error("Invalid Amount")
    } else if (data.currency !== "INR" && data.currency !== "USD") {
        throw new Error("Invalid Currency")
    } else if (typeof (data.paymentId) !== "string") {
        throw new Error("Invalid PaymentId")
    } else return true;
}

export default async function refund(this: { razorpayInstance: RZP }, { amount, currency, paymentId }: RefundInterface): Promise<RefundResponse | null> {
    try {
        const valid = validate({ amount, currency, paymentId })
        if (!valid) throw new Error("Invalid Credentials")
        const data = await this.razorpayInstance.payments.fetch(paymentId);
        if (!data) {
            return <RefundResponse>{
                message: "No Payment Found",
                status: false
            }
        }
        if (data && data.refund_status === "full") {

        }
        if (!data.captured) {
            await this.razorpayInstance.payments.capture(paymentId, data.amount, currency);
        }
        const response = await this.razorpayInstance.payments.refund(paymentId, {
            amount: amount,
        })
        return <RefundResponse>{
            refund: response,
            message: "Payment Refund Iniziated",
            status: true
        };
    } catch (error) {
        console.error('Error processing refund:', error);
        throw error;
    }
}
