import prisma from "../db"

export const getProteinInfo = async (req, res) => {
  const id = req.params.id

  const proteinAmount = await prisma.proteinAmount.findFirst({
    where: {
      id, 
      belongsToId: req.user.id
    }
  })

  res.json({data: { proteinAmount, status: 200, user: req.user.username}})
}

export const updateProteinAmount = async (req, res) => {
  const proteinAmount = await prisma.proteinAmount.create({
    data: {
      quantity: req.body.quantity,
      belongsToId: req.user.id
    }
  })

  res.json({data: { proteinAmount, status: 200, user: req.user.username}})
}