
const express = require('express')
const authController = require("../controller/Auth")
const comController = require("../controller/Complaint")
const visitorController = require("../controller/visitor")
const announcementController = require("../controller/announcement")
const authMiddleware = require('../middeware/auth')
const userController = require("../controller/user")

const router = express.Router()

router.get('/', (req, res) => res.send(''))

router.post('/signup', authController.signup)
router.post('/signin', authController.signin)

router.post('/user/profile',authMiddleware.loginRequird,userController.userProfile)


router.get('/complaintList', authMiddleware.adminRequird, comController.complaintList)
router.post('/updateComplaintStatus',comController.updateComplaintStatus)
router.get('/ownComplaint', authMiddleware.loginRequird, comController.ownComplaint)
router.get('/residents', authMiddleware.adminRequird, authController.residents)
router.post('/deleteNonResident',authMiddleware.adminRequird, authController.deleteNonResident)
router.post('/complaints',authMiddleware.loginRequird, comController.complaints)
router.post('/deleteComplaint', comController.deleteComplaint)
router.post('/visitor', visitorController.visitor)
router.get('/viewVisitors',authMiddleware.adminRequird, visitorController.viewVisitors)
router.post('/rejectVisitor', visitorController.rejectVisitor)
router.post('/create',authMiddleware.adminRequird, announcementController.create)
router.post('/viewAnnouncement', announcementController.viewAnnouncement)















module.exports = router