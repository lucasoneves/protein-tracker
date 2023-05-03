import { Router } from "express";

const router = Router();

// router.get("/user", (req, res) => {
//   res.json({ message: "user" });
// });

// router.post("/user", (req, res) => {});

// router.put("/user/:id", (req, res) => {});

// router.delete("/user/:id", (req, res) => {});

// Protein Amount

router.get('/proteinamount', (req, res) => {
  res.json({ data: { message: 'sucess', status: 200} });
})
router.post("/proteinamount", (req, res) => {});
router.put('/proteinamount/:id', (req, res) => {})
router.put('/proteinamount/:id', (req, res) => {})

export default router;