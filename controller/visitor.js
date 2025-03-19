const visitormodel=require('../models/visitor')




const visitor = async (req, res) => {
    try {
        let input = req.body;
        let newVisitor = new visitormodel(input);
        await newVisitor.save();
        res.json({ status: "success", message: "Visitor added successfully" });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const viewVisitors = async (req, res) => {
    try {
        const visitors = await visitormodel.find();  // Ensure it's a model function
        res.json(visitors);
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};


const rejectVisitor = async (req, res) => {
    try {
        let { _id } = req.body;
        await visitormodel.findByIdAndDelete(_id);
        res.json({ status: "success", message: "Visitor rejected successfully" });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

module.exports={
    visitor,viewVisitors,rejectVisitor
}