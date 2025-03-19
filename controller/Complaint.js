
const complaintmodel = require('../models/complaint');
const usermodel=require('../models/user')

const complaints = async (req, res) => {
    try {
        let input = req.body;
        input.postedby = req.user.id;
        let newComplaint = new complaintmodel(input); 
        await newComplaint.save(); 
        console.log(newComplaint);
        res.json({ status: "success", data: newComplaint });
    } catch (error) {
        console.error("Error saving complaint:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};

const complaintList = async (req, res) => {
    try {
        const data = await complaintmodel.find().populate('postedby','Name' ).exec();
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


const ownComplaint = async (req, res) => {
    try {
        
        const user = await usermodel.findOne({ _id: req.user.id }).select("-password");
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const complaints = await complaintmodel.find({ 
            FlatId: user.FlatId, 
            $or: [{ ResidentName: user.Name }, { ContactNo: user.ContactNo }]
        });

        res.status(200).json({ 
            status: "success",  
            complaints 
        });
    } catch (error) {
        console.error("Error fetching user complaints:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

const updateComplaintStatus = async (req, res) => {
    const { _id, status } = req.body;
    try {
      await complaintmodel.findByIdAndUpdate(_id, { status });
      res.json({ status: "success", message: "Complaint status updated successfully" });
    } catch (error) {
      res.json({ status: "error", message: "Failed to update status" });
    }
  }

const deleteComplaint = async (req, res) => {
    try {
        let input = req.body;
        await complaintmodel.findByIdAndDelete(input._id);
        res.json({ status: "success" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = { complaints, complaintList, deleteComplaint,ownComplaint,updateComplaintStatus };

