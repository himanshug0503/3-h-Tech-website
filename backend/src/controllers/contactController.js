import mongoose from "mongoose";
import { Contact } from "../models/Contact.js";

export const submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required." });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      await Contact.create({ name, email, message });
    }

    return res.status(201).json({ message: "Message received." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to submit contact form." });
  }
};
