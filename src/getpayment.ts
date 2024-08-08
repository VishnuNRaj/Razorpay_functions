// getpayment.ts
import { CheckPayment, payment, RZP } from "./types";

export default async function getpayment(this: { razorpayInstance: RZP }, { paymentId }: CheckPayment): Promise<payment | null> {
    try {
        if (!paymentId) throw new Error("No Payment Id Found");
        if (!this.razorpayInstance) throw new Error("No instance created");
        const response = await this.razorpayInstance.payments.fetch(paymentId)
        return response
    } catch (e: any) {
        console.log(e)
        throw new Error(e.message)
    }
}