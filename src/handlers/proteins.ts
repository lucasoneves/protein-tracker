import prisma from "../db"

export const getUserProteinInfo = async (req, res) => {
  const id = req.params.id

  const proteinAmount = await prisma.proteinAmount.findFirst({
    where: {
      id, 
      belongsToId: req.user.id
    }
  })

  res.json({data: { proteinAmount, status: 200, user: req.user.username}})
}