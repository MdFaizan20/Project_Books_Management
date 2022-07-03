
const express = require("express");
const router = express.Router()

const userController = require("../controllers/userController")
const booksController = require("../controllers/booksController")
const reviewController = require('../controllers/reviewController')
const middleware = require("../middleware/middleware")

//-----------------createUser&loginRoutes---------------------

router.post("/createUser", userController.createUser)
router.post("/login", userController.loginUser)

//------------------booksRoutes----------------

router.post("/createbook",middleware,booksController.createBook)
router.get("/booksDetails",middleware,booksController.getBook)
router.get("/book/:bookId",middleware,booksController.bookDetails)
router.put("/bookUpdate/:bookId",middleware,booksController.updateBook)
router.delete("/removeData/:bookId",middleware,booksController.removeBook)

//--------------reviewRoutes----------

router.post("/create/:bookId/review",reviewController.createReview)
router.put("/Books/:bookId/review/:reviewId",reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId",reviewController.removeReview)


module.exports = router
