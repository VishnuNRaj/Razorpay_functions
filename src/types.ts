import Razorpay from "razorpay/dist/razorpay";
import { Orders } from "razorpay/dist/types/orders";
import { Payments } from "razorpay/dist/types/payments";
import { Refunds } from "razorpay/dist/types/refunds";
import RPXContact, { Contact } from "razorpayx/dist/services/Contact";
import RPXAccount, { FundAccountBank, FundAccountVPA } from "razorpayx/dist/services/FundAccount";
import RPXPayout from "razorpayx/dist/services/Payout";
import RPXPayoutLink from "razorpayx/dist/services/PayoutLink";
import RPXTransactions from "razorpayx/dist/services/Transactions";

export interface ConfigInterface {
    key_id: string;
    key_secret: string;
}

export interface RefundInterface {
    paymentId: string;
    amount: number;
    currency: "INR" | "USD";
}

export interface RefundResponse {
    message: string;
    status: boolean;
    refund: Refund;
}

export interface CheckPayment {
    paymentId: string;
}

export interface OrderInterface {
    amount: number;
    currency: "INR" | "USD";
    receipt: string;
}

export interface OrderResponse {
    order: Order;
    status: boolean;
    message: string;
}

export interface CaptureInterface {
    paymentId: string;
}

export interface CaptureResponse {
    capture: Payment;
    status: boolean;
    message: string;
}

interface BankAccount {
    name: string;
    ifsc: string;
    account_number: string;
}

interface UPIAccount {
    vpa: string;
}

interface WalletAccount {
    provider: string;
}

export type FundAccount = | {
    user_id: string;
    account_type: "bank_account";
    bank_account: BankAccount;
} | {
    user_id: string;
    account_type: "vpa";
    vpa: UPIAccount;
} | {
    user_id: string;
    account_type: "wallet";
    wallet: WalletAccount;
};

export interface ContactInterface {
    name: string;
    email: string;
    type: "customer";
    contact: string;
}

export interface PayoutInterface {
    fundAccountId: string;
    amount: number;
    currency: "INR" | "USD";
    accountNumber: string;
    mode: "UPI" | "NEFT" | "RTGS" | "IMPS";
}


export interface RZP extends Razorpay { }
export interface Account extends FundAccountBank { }
export interface VPAccount extends FundAccountVPA { }
export interface Order extends Orders.RazorpayOrder { }
export interface Payment extends Payments.RazorpayPayment { }
export interface Refund extends Refunds.RazorpayRefund { }
export interface RZPX {
    Contact: RPXContact;
    FundAccount: RPXAccount;
    Payout: RPXPayout;
    PayoutLink: RPXPayoutLink;
    Transactions: RPXTransactions;
}
export interface Contacts extends Contact { }
export interface Payout {
    entity: "payout";
    account_number?: string;
    /** Amount in paise */
    amount: number;
    currency: "INR";
    notes?: Record<string, string>;
    fees?: number;
    tax?: number;
    status: "queued" | "pending" | "rejected" | "processing" | "processed" | "cancelled" | "reversed";
    utr: string;
    mode: "UPI" | "NEFT" | "RTGS" | "IMPS" | "card";
    purpose?: "refund" | "cashback" | "payout" | "salary" | "utility bill" | "vendor bill" | string;
    reference_id?: string;
    narration?: string;
    status_details?: {
        source?: string;
        reason?: string;
        description?: string;
    };
}