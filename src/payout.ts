import { PayoutInterface, RZPX, Payout } from "./types";

export default async function payout(this: { razorpayInstance: RZPX }, info: PayoutInterface): Promise<Payout> {
    try {
        const payout = await this.razorpayInstance.Payout.create({
            amount: info.amount,
            currency: "INR",
            mode: info.mode,
            fund_account_id: info.fundAccountId,
            queue_if_low_balance: true,
            account_number: info.accountNumber,
            purpose: "payout"
        })
        return payout
    } catch (e) {
        console.error("Error creating fund account:", e);
        throw e;
    }
}