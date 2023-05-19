import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const signup = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    },
  });

  if (!user) {
    res.json({ error: "User not created" });
    return;
  }

  res.status(201);
  res.json({ message: "user created" });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  const isValid = await comparePasswords(req.body.password, user?.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "Not Authorized" });
    return;
  }

  const token = createJWT(user);

  res.json({ token });
};

export const signout = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.user.email,
    },
  });

  const token = (user);

  res.json({ token });
};