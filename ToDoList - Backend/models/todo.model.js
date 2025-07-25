const mongoose = require('mongoose');
const schema = mongoose.Schema;

const toDoSchema = new schema({
    text: {type: String, required: true},
    completed : {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('ToDo', toDoSchema);