import prisma from "../db";
import { validationResult } from "express-validator";

export const createProteinAmount = async (req, res, next) => {
  try {
    const proteinAmount = await prisma.proteinAmount.create({
      data: {
        quantity: req.body.quantity,
        belongsToId: req.user.id,
      },
    });

    const errors = validationResult(req)
    console.log("ERRORS:", errors)

    res.json({ data: { proteinAmount, status: 200, user: req.user.username } });
  } catch (error: any) {
    error.type = 'error-handler';
    next(error)
  }
};

export const updateProteinAmount = async (req, res, next) => {
  try {
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
  } catch (error: any) {
    error.type = 'error-handler'
    next(error)
  }
};

export const deleteProteinAmount = async (req, res, next) => {
  try {
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
  } catch (error: any) {
    error.type = 'error-handler';
    next(error) 
  }
};

export const setProteinTarget = async (req, res, next) => {
  try {
    const item = await prisma.proteinTarget.findFirst({
      where: {
        belongsToId: req.user.id
      }
    })
    if (item) {
      res.status(400);
      res.json({ error: { message: "There is a register already"} })
      return;
    }
    const target = await prisma.proteinTarget.create({
      data: {
        belongsToId: req.user.id,
        target: req.body.target
      }
    })
  
    res.status(201)
    res.json({ data: target, user: req.user.id })
  } catch (error: any) {
    error.type = 'error-handler';
    next(error)
  }
}

export const updateProteinTarget = async (req, res, next) => {

  try {
    const target = await prisma.proteinTarget.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        }
      },
      data: {
        target: req.body.target
      }
    })
  
    if (!target) {
      res.json({ data: { message: 'Não foi possível editar a meta de proteína' } })
    }
  
    res.status(201)
    res.json({ data: target, user: req.user.id })
  } catch (error: any) {
    error.type = 'error-handler'
    next(error)
  }
}

export const deleteProteinTarget = async (req, res, next) => {
  try {
    const deleted = await prisma.proteinTarget.deleteMany({
      where: {
        belongsToId: req.user.id
      }
    })
    res.json({ data: deleted, user: req.user.id })
  } catch (error: any) {
    error.type = 'error-handler'
    next(error)
  }
}

// 5e4d6bde-f368-4b63-9758-178102d14ef0
