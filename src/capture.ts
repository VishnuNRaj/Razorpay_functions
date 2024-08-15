//capture.ts

import { CaptureInterface, CaptureResponse, RZP } from "./types";
export default async function capture(this: { razorpayInstance: RZP }, { paymentId }: CaptureInterface): Promise<CaptureResponse | null> {
    try {
        if (!paymentId) throw new Error("Invalid Credentials");
        const data = await this.razorpayInstance.payments.fetch(paymentId)
        if (!data) return <CaptureResponse>{
            message: "No Payment Found",
            status: false,
        }
        if (data.captured || data.status === "failed" || data.status === "created" || data.status === "refunded") {
            return <CaptureResponse>{
                message: "Payment Already Captured or Failed or Yet to be Paid",
                status: false
            }
        }
        const response = await this.razorpayInstance.payments.capture(paymentId, data.amount, data.currency)
        return <CaptureResponse>{
            capture: response,
            message: "Payment Captured Successfully",
            status: true
        }
    } catch (e: any) {
        console.log(e)
        throw new Error(e.message)
    }
}