const express = require('express');
const router = express.Router();

// 导入控制器模块
const book_controller = require('../controllers/book');
const author_controller = require('../controllers/author');
const genre_controller = require('../controllers/genre');
const book_instance_controller = require('../controllers/bookinstance');

/// 藏书路由 ///

// GET 获取藏书编目主页
router.get('/', book_controller.index);

// GET 请求添加新的藏书。注意此项必须位于显示藏书的路由（使用了 id）之前。
router.get('/book/create', book_controller.book_create_get);

// POST 请求添加新的藏书
router.post('/book/create', book_controller.book_create_post);

// GET 请求更新藏书
router.get('/book/:id/update', book_controller.book_update_get);

// POST 请求更新藏书
router.post('/book/:id/update', book_controller.book_update_post);

// GET 请求藏书
router.get('/book/:id', book_controller.book_detail);

// GET 请求完整藏书列表
router.get('/books', book_controller.book_list);

/// 藏书副本、藏书种类、作者的路由与藏书路由结构基本一致，只是无需获取主页 ///

router.get('/bookinstances', book_instance_controller.bookinstance_list)

router.get('/authors', author_controller.author_list)

router.get('/genres', genre_controller.genre_detail)

router.get('/genre/create', genre_controller.genre_create_get)

router.post('/genre/create', genre_controller.genre_create_post)

router.get('/author/create', author_controller.author_create_get)

router.post('/author/create', author_controller.author_create_post)

router.get('/author/:id/delete', author_controller.author_delete_get)

router.post('/author/:id/delete', author_controller.author_delete_post)

router.get('/author/:id', author_controller.author_detail)



module.exports = router;