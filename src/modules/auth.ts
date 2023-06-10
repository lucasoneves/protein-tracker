import * as bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const createJWT = (user: any, expire?: number) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.username,
    },
    process.env.JWT_SECRET!,
    { expiresIn: expire}
  );
  return token;
};


export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: 'Missing token', status: 401 });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: 'Not authorized', status: 401 });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET!
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
    return;
  } catch (e) {
    console.log(e)
    res.status(401);
    res.json({ message: "User not allowed", error: e})
    return;
  }
};

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};