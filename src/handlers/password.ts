import prisma from "../db";

export const forgotPasswordHandler = async (req, res) => {
  // const user = req.user.username;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    res.json({user: user?.username})
  } catch (error) {
    res.json({error})
  }

}