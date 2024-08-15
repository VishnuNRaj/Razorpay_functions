//order.ts
import { Order, OrderInterface, OrderResponse, RZP } from "./types";

const validate = (data: OrderInterface)=> {
    if (!data.amount || data.amount < 1 || typeof data.amount !== "number") {
        throw new Error("Invalid Amount Error")
    } else if (!data.currency || data.currency !== "INR" && data.currency !== "USD") {
        throw new Error("Invalid Currency Error")
    } else if (!data.receipt || data.receipt.length < 1) {
        throw new Error("Invalid Receipt Id")
    } return true;
}

export default async function order(this: { razorpayInstance: RZP }, data: OrderInterface): Promise<OrderResponse | null> {
    try {
        if (!validate(data)) throw new Error("Invalid Credentials");
        const response = await this.razorpayInstance.orders.create(data)
        return {
            message:"Order Created",
            status:true,
            order:response
        }
    } catch (e: any) {
        console.log(e)
        throw new Error(e.message)
    }
}