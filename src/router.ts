import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { updateUser } from "./handlers/user";
import { getUserProteinInfo } from "./handlers/proteins";

const router = Router();

// router.get("/user", (req, res) => {
//   res.json({ message: "user" });
// });

// router.post("/user", (req, res) => {});

// router.put("/user/:id", (req, res) => {});

// router.delete("/user/:id", (req, res) => {});

// Protein Amount
router.post("/proteinamount", (req, res) => {});
router.put("/proteinamount/:id", (req, res) => {});
router.put("/proteinamount/:id", (req, res) => {});

router.get('/proteinamount/:id', handleInputErrors, getUserProteinInfo, (req, res) => {})

router.put(
  "/user/:id",
  body("username").isString(),
  handleInputErrors,
  updateUser,
  (req, res) => {}
);

export default router;
