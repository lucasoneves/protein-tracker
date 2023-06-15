import prisma from "../db";

export const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const proteinAmount = await prisma.proteinAmount.findMany({
      where: {
        belongsToId: userId,
      },
    });

    const proteintarget = await prisma.proteinTarget.findMany({
      where: {
        belongsToId: userId,
      },
    });

    if (!user) {
      res.status(404);
      res.json({ message: "User not found" });
    }

    res.json({
      data: [
        {
          email: user?.email,
          id: user?.id,
          username: user?.username,
          proteinAmount,
          proteintarget,
        },
      ],
    });
  } catch (error: any) {
    error.type = "user";
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        username: req.body.username,
      },
    });

    res.json({ user, message: "user updated successfully", status: 200 });
  } catch (error: any) {
    error.type = "update-user";
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const proteinAmount = await prisma.proteinAmount.deleteMany({
      where: {
        belongsToId: req.user.id,
      },
    });
    const user = await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    res.json({ message: "user deleted" });
  } catch (error: any) {
    error.type = "delete-user";
    next(error)
  }
};
