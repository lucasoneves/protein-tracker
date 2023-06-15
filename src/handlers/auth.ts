import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const signup = async (req, res, next) => {
  try {
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
    res.json({ message: "user created", user });
  } catch (error: any) {
    const existUser = await prisma.user.findFirst({
      where: { username: req.body.username}
    })
    const existEmail = await prisma.user.findFirst({
      where: { email: req.body.email}
    })

    if (existEmail || existUser) {
      error.type = "signup";
      next(error)
    }
  }
};

export const signin = async (req, res, next) => {
  try {
    const ten_days = 10 * 86400
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

    const token = createJWT(user, ten_days);

    res.json({ token });
  } catch (error: any) {
    error.type = 'auth';
    next(error);
  }
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

export const forgotPassword = async (req, res) => {
  let userFound;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      }
    })
    userFound = user    
    res.json({ user: user?.id, status: 200 });
  } catch (error: any) {
    if (!userFound) {
      error.type('user_not_found');
    }
  }
}