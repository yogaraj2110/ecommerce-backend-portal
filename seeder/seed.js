const mongoose = require("mongoose");
const seedDepartmentData = require('../seeder/department/department.seed');
const seedRoleData = require('../seeder/role')
const db = require('../db/connect');

const seed = async () => {
  try {
    db();
    await seedDepartmentData();
    await seedRoleData();
  } catch (error) {
    console.error(`Error during seeding` + error);
  } finally {
    mongoose.disconnect();
    console.info('Seeding completed.');
  }
}
seed();