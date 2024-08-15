import { Account, FundAccount, RZPX, VPAccount } from "./types";

export default async function fundaccount(
    this: { razorpayInstance: RZPX },
    fundAccount: FundAccount
): Promise<Account | VPAccount> {
    try {
        const payload: any = {
            contact_id: fundAccount.user_id,
            account_type: fundAccount.account_type,
        };

        if (fundAccount.account_type === "bank_account" && fundAccount.bank_account) {
            payload.bank_account = fundAccount.bank_account;
        } else if (fundAccount.account_type === "vpa" && fundAccount.vpa) {
            payload.vpa = fundAccount.vpa;
        } else if (fundAccount.account_type === "wallet" && fundAccount.wallet) {
            payload.wallet = fundAccount.wallet;
        }
        const response = await this.razorpayInstance.FundAccount.create({
            ...payload,

        });

        console.log("Fund account created:", response);
        return response;
    } catch (e) {
        console.error("Error creating fund account:", e);
        throw e;
    }
}
