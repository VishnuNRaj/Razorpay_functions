import Razorpay from "razorpay"
import RazorpayX from "razorpayx"
import { ConfigInterface } from "./types"
import refund from "./refund"
import order from "./order"
import getpayment from "./getpayment"
import capture from "./capture"
import fundaccount from "./fundaccount"
import contact from "./contact"

const RazorpayConfig = ({ key_id, key_secret }: ConfigInterface) => {
    const config = new Razorpay({
        key_id, key_secret
    })
    const rzpx = RazorpayX(key_id, key_secret)
    const razorpay = {
        config,
        refund: refund.bind({ razorpayInstance: config }),
        order: order.bind({ razorpayInstance: config }),
        fetch: getpayment.bind({ razorpayInstance: config }),
        capture: capture.bind({ razorpayInstance: config }),
        fundaccount: fundaccount.bind({ razorpayInstance: rzpx }),
        contact: contact.bind({ rzpx: rzpx }),
    }
    return razorpay;
}
export default RazorpayConfig