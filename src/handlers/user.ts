import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';


export const signup = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password)
    }
  });

  if (!user) {
    res.json({ error: 'User not created' })
    return;
  }

  res.status(201)
  res.json({ message: 'user created' })

}

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })

  const isValid = await comparePasswords(req.body.password, user?.password)

  if (!isValid) {
    res.status(401)
    res.json({ message: 'Not Authorized' })
    return
  }

  const token = createJWT(user)

  res.json({ token })

}

export const getUserInfo = async (req, res) => {
  const userId = req.user.id
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  const proteinAmount = await prisma.proteinAmount.findFirst({
    where: {
      id: userId,
      belongsToId: userId
    }
  })

  if (!user) {
    res.status(404)
    res.json({ message: "User not found" })
  }

  res.json({
    data: [{user, proteinAmount}]
  })
}

export const updateUser = async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      username: req.body.username
    }
  })

  res.json({ user, message: 'user updated successfully', status: 200 })


}