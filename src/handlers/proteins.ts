import prisma from "../db";

export const getProteinInfo = async (req, res) => {
  const id = req.params.id;

  const proteinAmount = await prisma.proteinAmount.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: { proteinAmount, status: 200, user: req.user.username } });
};

export const createProteinAmount = async (req, res) => {
  const proteinAmount = await prisma.proteinAmount.create({
    data: {
      quantity: req.body.quantity,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: { proteinAmount, status: 200, user: req.user.username } });
};

export const updateProteinAmount = async (req, res) => {
  const updated = await prisma.proteinAmount.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      quantity: req.body.quantity,
    },
  });

  res.json({ data: { updated, status: 200, user: req.user.username } });
};

export const deleteProteinAmount = async (req, res) => {
  const deleted = await prisma.proteinAmount.deleteMany({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });

  if (!deleted.count) {
    res.status(404);
    res.json({ message: "Couldn't delete protein" });
  }

  res.json({ data: deleted, message: "Protein item deleted" });
};

// 5e4d6bde-f368-4b63-9758-178102d14ef0
