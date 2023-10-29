import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const signup = async (req, res, next) => {
  const message = "User created successfully"
  try {
    const userExists = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: req.body.username,
          },
          {
            email: req.body.email,
          },
        ],
      }
    })

    if (userExists) {
      res.status(409).json({ error: "Username or email already been used"})
      return;
    }

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });
    if (!user) {
      res.status(401).json({ error: "User not created" });
      return;
    }

    res.status(201);
    res.json({ message });
  } catch (error: any) {
    error.type = 'auth';
    res.status(401)
    res.json({ message: "It was not possible to login, verify your info and try again", field: "auth" })
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const TEN_DAYS = 10 * 86400
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    const isValid = await comparePasswords(req.body.password, user?.password);

    if (!isValid) {
      return res.status(401).send({ message: "Email or password incorrect. Try again!" });
    }

    const token = createJWT(user, TEN_DAYS);

    res.json({ token, user: { username: user.username, id: user.id, createdAt: user.createdAt } });
  } catch (error) {
    error.type = 'auth';
    res.status(401)
    res.json({ message: "It was not possible to login, verify your info and try again", field: "auth" })
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