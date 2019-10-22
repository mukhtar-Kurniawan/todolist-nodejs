// =========== ROUTER GET UNTUK HALAMAN HOME ==============
router.get('/', function(req, res) {
    res.render("todolist/home");
});


// =============== ROUTER MELIHAT SEMUA LIST ===================================
router.get('/todolist/', function(req, res) {
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
});


// =============== ROUTER GET MENUJU HALAMAN CREATE ============================
router.get('/todolist/create', function(req, res) {
    res.render("todolist/createList", {
        viewTitle: "Create To Do List",
    });
});


//============= ROUTING POST UNTUK CREATE / INSERT ===================
router.post('/todolist/create', function(req, res) {
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
});


// =============== ROUTER GET MENUJU HALAMAN UPDATE =============================
router.get('/todolist/edit/:id', function(req, res) {
    Todolist.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("todolist/edit", {
                viewTitle: "Update List",
                todolists: doc,
            })
        }
    });
});


// =============== ROUTER POST MENUJU UPDATE ====================================
router.post('/todolist/edit', function(req, res) {
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
                    res.render("todolist/addOrEdit", {
                        viewTitle: "Update TodoList",
                        todolists: req.body
                    });
                } else {
                    console.log("Error during record update : " + err);
                }
            }
        });
});