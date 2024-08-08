// refund.ts
import { RefundInterface, refunds, RZP } from './types';

const validate = (data: RefundInterface) => {
    if (typeof (data.amount) !== "number") {
        throw new Error("Invalid Amount")
    } else if (data.currency !== "INR" && data.currency !== "USD") {
        throw new Error("Invalid Currency")
    } else if (typeof (data.paymentId) !== "string") {
        throw new Error("Invalid PaymentId")
    } else return true;
}

export default async function refund(this: { razorpayInstance: RZP }, { amount, currency, paymentId }: RefundInterface): Promise<refunds | null> {
    try {
        const valid = validate({ amount, currency, paymentId })
        if (!valid) throw new Error("Invalid Credentials")
        const data = await this.razorpayInstance.payments.fetch(paymentId);
        if (!data) {
            throw Error("No Payment Found")
        }
        if (!data.captured) {
            await this.razorpayInstance.payments.capture(paymentId, amount, currency);
        }
        const response = await this.razorpayInstance.payments.refund(paymentId, {
            amount: amount,
        })
        return response;
    } catch (error) {
        console.error('Error processing refund:', error);
        throw error;
    }
}
