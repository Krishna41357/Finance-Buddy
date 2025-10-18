import Contact from "../models/contact.js";
import { sendMailToAdmin } from "../utils/sendMail.js";

export async function saveContact(req, res) {
    try {
        const { name, email, subject, message } = req.body;

        // Check if all fields are provided
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create new contact document
        const newContact = new Contact({ name, email, subject, message });
        sendMailToAdmin(newContact)
        // Save contact form data to the database
        await newContact.save();

        // Respond with success message
        res
            .status(201)
            .json({ message: "Contact form submitted successfully!", newContact });
    } catch (error) {
        console.error("Error saving contact form:", error);
        res.status(500).json({ message: "Failed to submit contact form.", error });
    }
}

export async function getContact(req, res) {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid contact ID format" });
        }

        const contact = await Contact.findById(id);
        
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error("Error retrieving contact:", error);
        res.status(500).json({ 
            message: "Failed to retrieve contact",
            error: error.message 
        });
    }
}

export async function getAllContact(req, res) {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }); // Newest first
        
        res.status(200).json({
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error("Error retrieving contacts:", error);
        res.status(500).json({ 
            message: "Failed to retrieve contacts",
            error: error.message 
        });
    }
}
