const RoleModal = require('../models/role.model');

const roleData = [
  {
    roleType: 'User',
  },
  {
    roleType: 'Admin',
  },
  {
    roleType: 'Super Admin',
  }
];

const seedRoleData = async () => {
  try {
    await RoleModal.deleteMany({});
    await RoleModal.insertMany(roleData);
    console.log(roleData, '####3')
    console.log(' Roles Seeded Successfully');
  } catch (err) {
    console.log('Error during seeding:'+err);
  }
}

module.exports = seedRoleData;