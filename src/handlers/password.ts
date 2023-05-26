import prisma from "../db";
import jwt from "jsonwebtoken";
import { createJWT, hashPassword } from "../modules/auth";

export const forgotPasswordHandler = async (req, res) => {
  // const user = req.user.username;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.json({ message: "User not found" })
      return
    }

    const token = createJWT(user)
    const link = `http://localhost:3000/reset-password/${user.id}/${token}`

    res.json({
      data: {
        message: 'Password link sended to email address',
        link
      }
    })
  } catch (error) {
    res.json({ error })
  }

}

export const resetPasswordHandler = async (req, res) => {
  const { id, token } = req.params

  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })

  if (!user) {
    res.json({
      data: {
        message: 'User not found'
      }
    })
    return
  }

  const secret = process.env.JWT_SECRET + user.password

  try {
    const payload = jwt.verify(token, secret)
    res.json({ data: payload })

  } catch (error) {
    console.log(error)
    res.json({
      data: {
        message: error
      }
    })
  }
}

export const sendNewPassword = async (req, res) => {
  const { id, token } = req.params
  // const { password, confirm_password} = req.body

  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })

  if (!user) {
    res.status(404)
    res.json({
      data: {
        message: 'User not found'
      }
    })
    return
  }

  const secret = process.env.JWT_SECRET + user.password

  try {
    const payload = jwt.verify(token, secret)
    // Verify password and confirm_password
    // Hash the password and save in the database
    if (payload) {
      await prisma.user.update({
        where: {
          id: id
        },
        data: {
          password: await hashPassword(req.body.password)
        }
      })
    }
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }

  res.json({ data: { user: { email: user?.email } } })
}