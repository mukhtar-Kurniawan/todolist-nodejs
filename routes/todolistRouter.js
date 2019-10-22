const express = require('express');
const router = express.Router();

const todolistController = require('./../controllers/todolistController');


// =============== ROUTER MELIHAT SEMUA LIST ===================================
router.get('/', todolistController.showList, function(req, res) {});

// =============== ROUTER GET MENUJU HALAMAN CREATE ============================
router.get('/create', todolistController.createPage, function(req, res) {});

//============= ROUTING POST UNTUK CREATE / INSERT ===================
router.post('/create', todolistController.insertRecord, function(req, res) {});

// =============== ROUTER GET MENUJU HALAMAN UPDATE =============================
router.get('/edit/:id', todolistController.pageUpdate, function(req, res) {});

// =============== ROUTER POST MENUJU UPDATE ====================================
router.post('/edit', todolistController.updateRecord, function(req, res) {});

// =============== ROUTER POST DELETE ===========================================
router.get('/delete/:id', todolistController.deleteRecord, function(req, res) {});


module.exports = router;