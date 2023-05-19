import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { updateUser, getUserInfo, deleteUser } from "./handlers/user";
import { getProteinInfo, updateProteinAmount, deleteProteinAmount } from "./handlers/proteins";

const router = Router();

// Protein Amount
router.get("/proteinamount", getUserInfo);
router.put("/proteinamount", updateProteinAmount);
router.get('/proteinamount/:id', handleInputErrors, getProteinInfo)
router.delete("/proteinamount/:id", deleteProteinAmount)

router.put(
  "/user/:id",
  body("username").isString(),
  handleInputErrors,
  updateUser
);

router.delete('/user/:id', deleteUser, (req, res) => {})

export default router;
