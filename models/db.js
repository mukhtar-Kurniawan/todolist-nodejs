const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tutorial1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) {
        console.log("MongoDB Connection Succeeded")
    } else {
        console.log("Error in DB COnnection : " + err)
    }
});

require('./todolist.model');