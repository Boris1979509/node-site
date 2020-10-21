const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            count: {
                type: Number,
                required: true,
                default: 1
            },
            courseId: { // Relations
                type: Schema.Types.ObjectId, // Тип id строка с которой работает mongodb по умолчанию
                ref: 'Course', // References on Course
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function (course) {
    const items = [...this.cart.items]; // Clone
    const idx = items.findIndex(i => { // вернёт индекс обьекта в массиве в случае успеха, -1 если обьект не найден
        return i.courseId.toString() === course._id.toString() // ObjectId to string
    });
    if (idx >= 0) {
        items[idx].count = items[idx].count + 1;
    } else {
        items.push({
            courseId: course._id
        });
    }
    this.cart = {items}; //
    return this.save();
};
userSchema.methods.removeFromCart = function (_id) {
    const items = [...this.cart.items]; // Clone
    const idx = items.findIndex(i => { // вернёт индекс обьекта в массиве в случае успеха, -1 если обьект не найден
        return i.courseId.toString() === _id.toString(); // ObjectId to string
    });
};
module.exports = model('User', userSchema);