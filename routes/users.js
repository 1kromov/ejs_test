const express = require("express");
const {
    getUsers,
    getUserID,
    getAddUser,
    postAddUser,
    deleteUserID,
    putEditID,
    getEdit
} = require ("../controllers/users")

const router = express.Router();

router.get("/users",getUsers)

router.get("/user/:id",getUserID);

router.get("/adduser",getAddUser);

router.post("/adduser",postAddUser)
router.delete("/user/:id",deleteUserID)
router.get("/edit/:id",getEdit);
router.put("/edit/:id",putEditID)

module.exports = router;