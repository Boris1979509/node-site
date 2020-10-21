const {Schema, model} = require('mongoose');

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: String,
    userId: { // Relations
        type: Schema.Types.ObjectId, // Тип id строка с которой работает mongodb по умолчанию
        ref: 'User', // References on User model
        required: true
    }
});

module.exports = model('Course', courseSchema);