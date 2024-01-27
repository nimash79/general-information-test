const mongoose = require("mongoose");
const {Schema} = mongoose;

const questionSchema = new Schema({
    level: {type: Number, required: true},
    categoryId: {type: mongoose.Types.ObjectId, ref: 'Category', required: true},
    content_en: {type: String, required: true},
    content_fa: {type: String, required: true},
    choices: {type: Array, required: false},
    show: {type: Boolean, defaut: false},
});

module.exports = mongoose.model('Question', questionSchema);