import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { updateUser, getUserInfo, deleteUser } from "./handlers/user";
import { getProteinInfo, createProteinAmount, updateProteinAmount, deleteProteinAmount } from "./handlers/proteins";

const router = Router();

// Protein Amount
router.get("/proteinamount", getUserInfo);
router.post('/proteinamount/', createProteinAmount)
router.put("/proteinamount/:id", updateProteinAmount);
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
