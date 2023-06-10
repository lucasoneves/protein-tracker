import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { updateUser, getUserInfo, deleteUser } from "./handlers/user";
import {
  getProteinInfo,
  createProteinAmount,
  updateProteinAmount,
  deleteProteinAmount,
  setProteinTarget,
  deleteProteinTarget,
  updateProteinTarget,
} from "./handlers/proteins";

const router = Router();

// Protein Amount
router.get("/proteinamount", getUserInfo);
router.post("/proteinamount/", body('quantity').isNumeric(), handleInputErrors, createProteinAmount);
router.put("/proteinamount/:id", body('quantity').isNumeric(), handleInputErrors, updateProteinAmount);
router.get("/proteinamount/:id", handleInputErrors, getProteinInfo);
router.delete("/proteinamount/:id", deleteProteinAmount);

// PRotein target
router.post("/proteintarget", body('target').isNumeric(), handleInputErrors, setProteinTarget);
router.get("/proteintarget/", (req, res) => {
  res.json({ message: "get protein target" });
});
router.delete("/proteintarget/", deleteProteinTarget);
router.put("/proteintarget/:id", body('target').isNumeric(), handleInputErrors, updateProteinTarget);

// User
router.put(
  "/user/:id",
  body("username").isString(),
  handleInputErrors,
  updateUser
);

router.delete("/user/:id", deleteUser, (req, res) => {});

export default router;
