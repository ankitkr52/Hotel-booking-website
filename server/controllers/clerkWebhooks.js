import User from "../models/User";
import { Webhook } from "svix"


const clerkWebhooks = async (req, res) => {
    try {
        // create a webhook instance with the secret key
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        // getting headers
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        }
        // verifying headers
        await whook.verify(JSON.stringify(req.body), headers)
        // getting ddata from the request body
        const { data,type }=req.body
        
        const userdata={
            
        }
    }
    catch (error) {
        console.error("Error processing webhook:", error);
    }
}