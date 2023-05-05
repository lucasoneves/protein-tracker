// import jwt from 'jsonwebtoken';

// export const createJWT = (user) => {
//   const token = jwt.sign({
//     id: user.id, username: user.username
//   }, process.env.JWT_SECRET
//   )
// }

import exp from "constants";
import jwt from "jsonwebtoken";

export const createJWT = (user: any) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET!
  );
  return token;
};

export const protect = (req: any, res: any, next:any) => {
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
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "Not allowed", error: e})
    return;
  }
};
