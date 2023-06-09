const Note = require('../models/noteModel')
const asyncHandler = require('express-async-handler')

const getNotes = asyncHandler(async(req,res)=>{
    const notes = await Note.find({user:req.user._id});
    // console.log(notes)
    res.json(notes);
})

const createNote = asyncHandler(async(req,res)=>{
    const {title, content, category} = req.body
    if(!title || !content || !category){
        res.status(400)
        throw new Error("Please fill all the fields")
    }else{
        const note = new Note({user:req.user._id, title, content, category})
        const createdNote = await note.save();
        res.status(200).json(createdNote)
    }
})

const getNoteById = asyncHandler(async(req,res)=>{
    const note = await Note.findById(req.params.id);
    if(note){
        res.json(note);
    }else{
        res.status(400).json({msg:'Note not found'})
    }
})

const updateNote = asyncHandler(async(req,res)=>{
    const note  = await Note.findById(req.params.id);
    const {title, content, category} = req.body
    if(note.user.toString()!== req.user._id.toString()){
        res.status(400);
        throw new Error('You are not allowed to perform this action')
    }
    if(note){
        note.title = title;
        note.content = content;
        note.category = category;
        const updatedNote = await note.save();
        res.json(updatedNote)
    }
    else{
        res.status(400)
        throw new Error("Note doesn't exist")
    }
})

const deleteNote = asyncHandler(async(req,res)=>{
    const note = await Note.findById(req.params.id);
    // console.log(note);
    if(note.user.toString()!== req.user._id.toString()){
        res.status(400);
        throw new Error('You are not allowed to perform this action')
    }
    if(note){
        await note.remove()
        res.json({msg:'Note removed'})
    }
})
module.exports = {getNotes, createNote, getNoteById, updateNote, deleteNote}