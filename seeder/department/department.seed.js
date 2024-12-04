const DepartmentModal = require('../../models/department.model');

const departmentData = [
  {
    departmentName: 'Human Resources',
  },
  {
    departmentName: 'Developer',
  },
  {
    departmentName: 'Digital MArketing',
  },
  {
    departmentName: 'Test EngineerQ',
  },
  {
    departmentName: 'BA',
  }
];

const seedDepartmentData = async () => {
  try {
    await DepartmentModal.deleteMany({});
    await DepartmentModal.insertMany(departmentData);
    console.log(departmentData, '####3')
    console.log(' Department Name Seeded Successfully');
  } catch (err) {
    console.log('Error during seeding:');
  }
}

module.exports = seedDepartmentData;