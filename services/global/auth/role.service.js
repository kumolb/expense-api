const Role = require("../../../models/Role");

class RoleService {
    async addRole(value) {
        let role = new Role(value);
        let roleCount = await Role.countDocuments();
        role.roleId = roleCount;
        role.id = role._id;
        return await role.save();
    }
    async updateRole(value) {
        let { id, permission, deletePermission, ...body } = value;
        let updateObj = {};
        if (permission && deletePermission) {

        }
        if (permission && !deletePermission) {
            updateObj.$push = {
                permission: permission
            }
        }
        if (body) {
            updateObj.$set = body
        }

        let updated = await Role.update({ id: id }, updateObj);
        return updated;
    }
}

module.exports = RoleService;