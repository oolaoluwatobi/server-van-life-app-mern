const express = require('express');
const router = express.Router();
const vansController = require('../../controllers/vansController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
  // .get(vansController.getAllVans)
  .get(vansController.getUserVans)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), vansController.createNewVan)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), vansController.updateVan)
  .delete(verifyRoles(ROLES_LIST.Admin), vansController.deleteVan);

router.route('/:id')
  .put(vansController.addVanUser)
  .get(vansController.getVan)

router.route('/:id/remove')
  .put(vansController.removeVanUser)
 
module.exports = router;  