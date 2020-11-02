const express = require("express");
const router = express.Router();

const {
     getProductById,
     createProduct,
     getProduct,
     photo,
     deleteProduct,
     updateProduct,
     getAllProducts,
     getAlluniqueCategories,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("productId", getProductById);

// actual routes
// create route
router.post(
     "/product/create/:userId",
     isSignedIn,
     isAuthenticated,
     isAdmin,
     createProduct
);

// read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// delete route
router.delete(
     "/product/:productId/:userId",
     isSignedIn,
     isAuthenticated,
     isAdmin,
     deleteProduct
);

// update route
router.put(
     "/product/:productId/:userId",
     isSignedIn,
     isAuthenticated,
     isAdmin,
     updateProduct
);

//listing route
router.get("/products", getAllProducts);

router.get("/products/categories", getAlluniqueCategories);

module.exports = router;
