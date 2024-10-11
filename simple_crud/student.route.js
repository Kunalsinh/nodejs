const express = require("express")

const studentController = require('../controller/student.controller')

const router = express.Router()
router.get("/student", studentController.index)
router.post("/student", studentController.createUser)
router.put("/student/:id", studentController.updateUser)
router.delete("/student/:id", studentController.deleteUser)
module.exports = router;