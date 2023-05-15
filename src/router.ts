import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { updateUser, getUserInfo, deleteUser } from "./handlers/user";
import { getProteinInfo, updateProteinAmount } from "./handlers/proteins";

const router = Router();

// router.get("/user", (req, res) => {
//   res.json({ message: "user" });
// });

// router.post("/user", (req, res) => {});

// router.put("/user/:id", (req, res) => {});

// router.delete("/user/:id", (req, res) => {});

// Protein Amount
router.get("/proteinamount", getUserInfo, (req, res) => {});
// router.put("/proteinamount/:id", (req, res) => {});

router.put("/proteinamount", updateProteinAmount, (req, res) => {});
router.get('/proteinamount/:id', handleInputErrors, getProteinInfo, (req, res) => {})

router.put(
  "/user/:id",
  body("username").isString(),
  handleInputErrors,
  updateUser,
  (req, res) => {}
);

router.delete('/user/:id', deleteUser, (req, res) => {})

export default router;
