const RoleAccess = require("../data-access/role-db/index.js");

// NOTE: we're using it to check for a resourceId,
// if it is not it's probably some action itself
// FIXME:(Saroj) We're ignoring now for alpha build,  This is bad,
//  we need to upgrade our roles, permissions system later.

const ObjectId = require("mongoose").Types.ObjectId;

module.exports = async function isAuthorized(req, res, next) {
  let permissions = [];

  if (!req.user)
    return res.status(401).json({
      status: "fail",
      errorList: ["Unauthenticated: You're not unauthenticated!"],
    });

  let isSuperAdmin = false;
  permissions = permissions.concat(req.user.permissions);

  for (let i = 0; i < req.user.roles.length; i++) {
    try {
      let rolePayload = await RoleAccess.findRoleById(`${req.user.roles[i]}`);
      if (rolePayload !== null) {
        permissions = permissions.concat(rolePayload.permissions);
        isSuperAdmin |= rolePayload.role_name === 'superadmin';
      }
    } catch (error) {
      return res.status(400).json({
        status: 'fail',
        errorList: [error.message]
      });
    }
  }

  if (isSuperAdmin || isPermissionGranted(req, permissions)) {
    // NOTE: checking roles & permissions in updatePayload, so that it can't be updated
    // TODO: find a way to update roles by specific permissions
    // NOTE: We're only accepting or skipping through superadmin
    let { roles, permissions, ...updateInfo } = req.body;
    req.body = updateInfo;

    if (!isSuperAdmin && (roles || permissions))
      return res.status(401).json({
        status: "fail",
        errorList: [
          "Unauthorized: Permissions not granted for updating roles & permissions!",
        ],
      });

    return next();
  } else {
    return res.status(401).json({
      status: "fail",
      errorList: ["Unauthorized: Permissions not granted!"],
    });
  }
};

function isPermissionGranted(req, permissions) {
  // console.log("method: " + req.method);
  // console.log("baseUrl: " + req.baseUrl);
  // console.log("paramsId: " + req.params.id);
  // console.log("req.url: " + req.url);
  // console.log("permissions: " + permissions);

  let pathSplitted = req.baseUrl.split("/");
  const resourceType = pathSplitted[pathSplitted.length - 1];
  let resourceId = req.url.replace("/", "");

  if (!ObjectId.isValid(resourceId)) {
    // console.log(`resourceId: ${resourceId}, Operation on itself, changed to self`);
    // resourceId = "self";
    return false;
  }

  // console.log("action: " + req.method);
  // console.log("resourceType: " + resourceType);
  // console.log("resourceId: " + resourceId);

  switch (req.method) {
    case "GET":
      for (let i = 0; i < permissions.length; i++) {
        let symbols = permissions[i].split(":");
        if (symbols[0] != "read") continue;
        if (symbols[1] != resourceType) continue;

        // console.log("symbols[2]: " + symbols[2]);

        if (resourceId !== undefined && symbols[2] == resourceId) {
          // console.log("returning true params.id");
          return true;
        }

        if (symbols[2] == "all") {
          // console.log("returning true with all");
          return true;
        }
      }

      break;
    case "POST":
      for (let i = 0; i < permissions.length; i++) {
        let symbols = permissions[i].split(":");

        if (symbols[0] != "update" && symbols[0] != "create") {
          // console.log('it was neither update nor create');
          continue;
        }

        if (symbols[1] != resourceType) continue;

        // console.log("symbols[2]: " + symbols[2]);

        if (resourceId !== undefined && symbols[2] == resourceId) {
          // console.log("returning true params.id");
          return true;
        }

        if (
          symbols[2] === "all" ||
          (symbols[2] === "self" && resourceId === req.user.sub)
        ) {
          // console.log("returning true with all");
          return true;
        }
      }

      break;
    case "DELETE":
      for (let i = 0; i < permissions.length; i++) {
        let symbols = permissions[i].split(":");
        if (symbols[0] != "delete") continue;
        if (symbols[1] != resourceType) continue;

        if (resourceId !== undefined && symbols[2] == resourceId) {
          // console.log("returning true params.id");
          return true;
        }

        if (
          symbols[2] === "all" ||
          (symbols[2] === "self" && resourceId === req.user.sub)
        ) {
          // console.log("returning true with all");
          return true;
        }
      }

      break;
    default:
      // console.log("Unknown method!");
      return false;
  }

  return false;
}
