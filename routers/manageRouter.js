import { Router } from "express";
import manageController from "../controllers/manageController.js";

const manageRouter = Router();
// DELETE
manageRouter.post('/delete/action', manageController.deleteAction);
manageRouter.post('/delete/path', manageController.deletePath);
manageRouter.post('/delete/category', manageController.deleteCategory);
manageRouter.get('/delete', manageController.deleteIndex);

// UPDATE
manageRouter.post('/update/action', manageController.updateAction);
manageRouter.post('/update/path', manageController.updatePath);
manageRouter.post('/update/category', manageController.updateCategory);
manageRouter.get('/update', manageController.updateIndex);

// INSERT
manageRouter.post('/insert/action', manageController.insertAction);
manageRouter.post('/insert/path', manageController.insertPath);
manageRouter.post('/insert/category', manageController.insertCategory);
manageRouter.get('/insert', manageController.insertIndex);

// READ
manageRouter.get('/search/action', manageController.getAction);
manageRouter.get('/search/path', manageController.getPath);
manageRouter.get('/search/category', manageController.getCategory);
manageRouter.get('/search/all', manageController.readAll);
manageRouter.get('/search', manageController.readIndex);

manageRouter.get('/', manageController.indexGet);

export default manageRouter;