
const announcementModel = require("../models/announcement");
const jwtoken = require("jsonwebtoken"); 
const SECRET_KEY = "apart-app"; 


const create = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === "") {
            return res.json({ status: "error", message: "Message is required" });
        }

        const newAnnouncement = new announcementModel({ message });
        await newAnnouncement.save();

        res.json({ status: "success", message: "Announcement posted successfully" });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};


const viewAnnouncement = async (req, res) => {
    try {
        const announcements = await announcementModel.find();
        res.json(announcements);
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

module.exports = { create, viewAnnouncement };
