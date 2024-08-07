import Razorpay from "razorpay"
import { ConfigInterface } from "./types"

const RazorpayConfig = ({ key_id, key_secret }: ConfigInterface) => {
    return new Razorpay({
        key_id, key_secret
    })
}
export default RazorpayConfig