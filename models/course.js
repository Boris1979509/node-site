const uuid = require('uuid'); // unique ids
const fs = require('fs');
const path = require('path');

class Course {
    /**
     *
     * @param title
     * @param price
     * @param image
     */
    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.image = image;
        this.id = uuid.v4();
    }

    /**
     *
     * @returns {{image: *, price: *, _id, title: *}}
     */
    toJson() {
        return {
            title: this.title,
            price: this.price,
            image: this.image,
            _id: this.id,
        };
    }

    /**
     *
     * @returns {Promise}
     */
    async save() {
        const courses = await Course.getAll();
        courses.push(this.toJson());
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    }

    /**
     *
     * @returns {Promise}
     */
    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                });
        });
    }
}

module.exports = Course;