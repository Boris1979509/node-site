const path = require('path');
const fs = require('fs');
const entryPoint = path.dirname(process.mainModule.filename); // index.js
const basePath = path.join(entryPoint, 'data', 'card.json');

class Card {
    static async add(course) {
        const card = await Card.fetch();
        const index = card.courses.findIndex(i => i._id === course._id);
        const candidate = card.courses[index];
        if (candidate) {
            /* if not empty */
            candidate.count++;
            card.courses[index] = candidate;
        } else {
            course.count = 1;
            card.courses.push(course);
        }
        card.total += +course.price;
        return new Promise((resolve, reject) => {
            fs.writeFile(basePath, JSON.stringify(card), err => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    /* Get card DATA */
    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(basePath, 'utf-8', (err, content) => {
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(content));
            });
        });
    }
}

module.exports = Card;