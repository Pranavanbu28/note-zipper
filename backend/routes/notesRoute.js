const express = require('express')
const protect = require('../controllers/authController')
const router = express.Router();
const {getNotes, createNote, getNoteById, updateNote, deleteNote} = require('../controllers/noteController')

router.route('/').get(protect,getNotes)
router.route('/create').post(protect,createNote)
router.route('/:id').get(getNoteById).put(protect,updateNote).delete(protect,deleteNote)


module.exports = router;