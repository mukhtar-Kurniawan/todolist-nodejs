const mongoose = require('mongoose');
const Todolist = mongoose.model('Todolist');

//============= ROUTE PAGE LIST ===========

function showList(req, res) {
    Todolist.find((err, docs) => {
        if (!err) {
            res.render("todolist/listToDo", {
                viewTitle: "Create To Do List",
                lists: docs
            });
        } else {
            console.log("Error when retrieving list: " + err);
        }
    });
}


//============ PAGE CREATE TODOLIST =================
function createPage(req, res) {
    res.render("todolist/createList", {
        viewTitle: "Create To Do List",
    });
}


//============= CREATE / INSERT DATA ===================
function insertRecord(req, res) {
    var todolists = new Todolist(); //req.body berfungsi untuk menangkap nilai yang dikirimkan melalui form-html (interface)
    todolists.list = req.body.list;
    todolists.time = req.body.time;
    todolists.date = req.body.date;
    todolists.save((err, doc) => {
        if (!err)
            res.redirect('/todolist');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("todolist/createList", {
                    viewTitle: "Create TodoList",
                    todolists: req.body
                });
            } else {
                console.log("Error during record insertion : " + err);
            }
        }
    });
}


//=============== PAGE UPDATE TODOLIST =======================
function pageUpdate(req, res) {
    Todolist.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("todolist/edit", {
                viewTitle: "Update List",
                todolists: doc,
            })
        }
    });
}


//=============== UPDATE DATA ========================
function updateRecord(req, res) {
    Todolist.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, {
            runValidators: true,
            upsert: true,
            setDefaultsOnInsert: true,
            new: true
        },
        (err, doc) => {
            if (!err)
                res.redirect('/todolist');
            // res.json(req.body.date);
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("todolist/edit", {
                        viewTitle: "Update TodoList",
                        todolists: req.body
                    });
                } else {
                    console.log("Error during record update : " + err);
                }
            }
        });
}


//================= Delete ToDoList ===========================
function deleteRecord(req, res) {
    Todolist.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/todolist');
        } else {
            console.log("Error during record delete : " + err);
        }
    });
}



//============= Handle Validation Error Function ==============
function handleValidationError(err, body) {
    for (field in err.errors) { //field adalah attribut tabel
        switch (err.errors[field].path) {
            case 'list':
                body['listError'] = err.errors[field].message;
                break;
            case 'time':
                body['timeError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}



//=============== Modul Exports ==========================
exports.showList = showList;
exports.createPage = createPage;
exports.insertRecord = insertRecord;
exports.pageUpdate = pageUpdate;
exports.updateRecord = updateRecord;
exports.deleteRecord = deleteRecord;