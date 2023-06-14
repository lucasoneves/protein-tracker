import prisma from "../db";
import jwt from "jsonwebtoken";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import nodemailer from "nodemailer";
export const forgotPasswordHandler = async (req, res) => {
  // const user = req.user.username;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.json({ message: "User not found. Verify the email field" });
      return;
    }

    const token = user && createJWT(user, 150);
    const link = `http://localhost:3000/reset-password/${user.id}/${token}`;

    const transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: "proteincheck.app@gmail.com",
        pass: "aghwiosykcckmpsv",
      },
      secure: true,
    });

    const mailOptions = {
      from: "proteincheck.app@gmail.com", // sender address
      to: req.body.email, // list of receivers
      subject: "Protein Check - Create new password",
      html: `<b>Hey there! </b><br> You requested help recovering your password.
      
      <a href=${link} target="_blank">Click here to create a new password</a>
      `,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
      res.json({
        data: {
          message: "Password link sended to email address",
          link,
        },
      });
    });
  } catch (error) {
    res.status(error);
    res.json({ error });
  }
};

export const resetPasswordHandler = async (req, res) => {
  const { id, token } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    res.json({
      data: {
        message: "User not found",
      },
    });
    return;
  }

  const secret = process.env.JWT_SECRET!;

  try {
    const payload = jwt.verify(token, secret);
    res.json({ data: payload });
  } catch (error) {
    console.log(error);
    res.json({
      data: {
        message: error,
      },
    });
  }
};

export const sendNewPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    console.log('error trycatch 2')
    const secret = process.env.JWT_SECRET!;
    const payload = jwt.verify(token, secret)
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: await hashPassword(password),
      },
    });
    res.json({ data: { message: "Password updated successfully", payload, user } });
  } catch (error: any) {
    error.type = 'password'
    console.log(error);
    next(error)
  }

};
