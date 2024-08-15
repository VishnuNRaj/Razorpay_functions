import { ContactInterface, Contacts, RZPX } from "./types";
export default async function contact(this: { rzpx: RZPX }, credentials: ContactInterface): Promise<Contacts> {
    try {
        const contact = await this.rzpx.Contact.create({
            name: credentials.name,
            email: credentials.email,
            contact: credentials.contact,
            type: credentials.type,
        });
        console.log("Contact created:", contact);
        return contact;
    } catch (e) {
        console.error("Error creating fund account:", e);
        throw e;
    }
}