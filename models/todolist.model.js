const mongoose = require('mongoose');

var TodolistSchema = new mongoose.Schema({
    list: {
        type: String,
        required: 'This field is required!'
    },
    time: {
        type: String
    },
    date: {
        type: Date
    }
});

TodolistSchema.path('time').validate((val) => {
    timeRegex = /[0-2][0-9]\.[0-5][0-9]$/i;
    return timeRegex.test(val);
}, 'Invalid time insert');

mongoose.model('Todolist', TodolistSchema);