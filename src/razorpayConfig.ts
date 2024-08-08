import Razorpay from "razorpay"
import { ConfigInterface } from "./types"
import refund from "./refund"

const RazorpayConfig = ({ key_id, key_secret }: ConfigInterface) => {
    const config = new Razorpay({
        key_id, key_secret
    })
    const razorpay = {
        config,
        refund: refund.bind({ razorpayInstance: config })
    }
    return razorpay;
}
export default RazorpayConfig