const RoleService = require("../../../services/global/auth/role.service");
const Http = require("../../../helpers/HttpResponse");
const roleService = new RoleService();
module.exports = {
    addRole: async (req, res, next) => {
        try {
            role = await roleService.addRole(req.body);
            return Http.created(res, "created", role);
        } catch (err) {
            return Http.error(res, err);
        }
    }
};