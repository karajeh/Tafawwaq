import { Request, Response } from 'express';
import { TeacherModel } from '../db/models/teacher';

export const getAvailableCurriculums = async (req: Request, res: Response) => {
  try {
    const curriculums = await TeacherModel.aggregate([
      { $match: { 'availability.days': { $exists: true, $ne: [] } } },
      { $unwind: '$teaches' },
      { $group: { _id: '$teaches.curriculum' } },
      { $project: { _id: 0, name: '$_id' } },
      { $sort: { name: 1 } }
    ]);

    res.status(200).json(curriculums.map(c => c.name));
  } catch (error) {
    console.error('An error occurred while fetching curriculums', error);
    res.status(500).json({ message: 'Error fetching curriculums' });
  }
};

export const getAvailableLevels = async (req: Request, res: Response) => {
  try {
    const { curriculum } = req.params;

    const levels = await TeacherModel.aggregate([
      {
        $match: {
          'availability.days': { $exists: true, $ne: [] },
          'teaches.curriculum': curriculum
        }
      },
      { $unwind: '$teaches' },
      { $match: { 'teaches.curriculum': curriculum } },
      { $unwind: '$teaches.levels' },
      { $group: { _id: '$teaches.levels' } },
      { $project: { _id: 0, name: '$_id' } },
      { $sort: { name: 1 } }
    ]);

    res.status(200).json(levels.map(l => l.name));
  } catch (error) {
    console.error('An error occurred while fetching levels', error);
    res.status(500).json({ message: 'Error fetching levels' });
  }
};