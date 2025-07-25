const ToDo = require('../models/todo.model.js');


exports.createToDo = async (req, res)=>{
    try{
        const newToDo = new ToDo({ // ENSURE 'new ToDo(...)' IS PRESENT
            text: req.body.text,
            completed: req.body.completed,
            createdAt: new Date()
        });
        const savedToDo = await newToDo.save();
        res.status(201).json(savedToDo);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.getAllToDos = async (req, res)=>{
    try{
        const toDos = await ToDo.find();
        res.status(200).json(toDos);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }   
}

exports.updateToDo = async (req, res) => {
    try {
      const updatedToDo = await ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedToDo) {
        // Handle the case where the ToDo with the given ID was not found
        return res.status(404).json({ message: 'ToDo not found' });
      }
      res.status(200).json(updatedToDo); // Send a success response with the updated ToDo
    } catch (err) {
      res.status(500).json({ message: err.message }); // Send an error response with the error message
    }
  };

exports.deleteToDo = async (req, res)=>{
    try{
        const deletedToDo = await ToDo.findByIdAndDelete(req.params.id);
        if(!deletedToDo){
            return res.status(404).json({message: 'ToDo not found'});
        }
        console.log(req.params.id); // Log the ID to confirm
        res.status(200).json({message: 'ToDo deleted successfully'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

