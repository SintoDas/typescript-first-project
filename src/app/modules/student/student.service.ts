import { Student } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }, { isDeleted: true });
  return result;
};
const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id });
  return result;
};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
