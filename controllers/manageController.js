import {db} from "../db/queries.js";
import { body, validationResult } from "express-validator";

const lengthMessage = 'Name must have a max of 30 characters';
const validate = [
  body('name').trim()
  .isLength({max: 30})
  .withMessage(lengthMessage)
]

const indexGet = (req, res) => {
  res.render('manage');
}

const readAll = async (req, res) => {
  const result = await db.getAllEntries();

  res.render('readAll', {
    result: result
  });
};

const readIndex = async (req, res) => {
  res.render('read');
}

const readOne = async (req, res) => {
  const {query} = req.query;

  const result = await db.getOneResult(query);

  res.render('readOne', {result: result})
}

async function getCategory(req, res){
  const {query} = req.query;

  const result = await db.queryCategory(query);

  res.render('readOne', {result: result})
}

async function getPath(req, res){
  const {query} = req.query;

  const result = await db.queryPath(query);

  res.render('readOne', {result: result})
}

async function getAction(req, res){
  const {query} = req.query;

  const result = await db.queryAction(query);

  res.render('readOne', {result: result})
}

async function insertIndex(req, res){
  const categories = await db.getCategories();
  const paths = await db.getPaths();

  res.render('insert', {
    categories: categories,
    paths: paths
  });
};

async function insertCategory(req, res){
  const {name} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const categories = await db.getCategories();
    const paths = await db.getPaths();
    res.render('insert', {
      categories: categories,
      paths: paths,
      errors: errors.array()
    });
    return
  }

  await db.insertCategory(name);

  res.redirect(`/manage/search/all`);
}

async function insertPath(req, res){
  const {name, parent} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const categories = await db.getCategories();
    const paths = await db.getPaths();
    res.render('insert', {
      categories: categories,
      paths: paths,
      errors: errors.array()
    });
    return
  }

  await db.insertPath(name, parent);

  res.redirect(`/manage/search/all`);
}

async function insertAction(req, res){
  const {name, parent} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const categories = await db.getCategories();
    const paths = await db.getPaths();
    res.render('insert', {
      categories: categories,
      paths: paths,
      errors: errors.array()
    });
    return
  }

  await db.insertAction(name, parent);

  res.redirect(`/manage/search/all`);
};

async function updateIndex(req, res){
  const categories = await db.getCategories();
  const paths = await db.getPaths();
  const actions = await db.getActions();

  res.render('update', {
    categories: categories,
    paths: paths,
    actions: actions
  });
};

async function updateCategory(req, res){
  const {oldValue, newValue} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const categories = await db.getCategories();
    const paths = await db.getPaths();
    res.render('update', {
      categories: categories,
      paths: paths,
      errors: errors.array()
    });
    return
  }

  try {
    await db.updateCategory(oldValue, newValue);
    res.redirect('/manage/search/all')
  } catch (err) {
    console.error(err);
  }
};

async function updatePath(req, res){
  const {oldValue, newValue} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const categories = await db.getCategories();
    const paths = await db.getPaths();
    res.render('update', {
      categories: categories,
      paths: paths,
      errors: errors.array()
    });
    return
  }

  try {
    await db.updatePath(oldValue, newValue);
    res.redirect('/manage/search/all')
  } catch (err) {
    console.error(err);
  }
};

async function updateAction(req, res){
  const {oldValue, newValue} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const categories = await db.getCategories();
    const paths = await db.getPaths();
    res.render('update', {
      categories: categories,
      paths: paths,
      errors: errors.array()
    });
    return
  }

  try {
    await db.updateAction(oldValue, newValue);
    res.redirect('/manage/search/all')
  } catch (err) {
    console.error(err);
  }
};

async function deleteIndex(req, res){
  const categories = await db.getCategories();
  const paths = await db.getPaths();
  const actions = await db.getActions();

  res.render('delete', {
    categories: categories,
    paths: paths,
    actions: actions
  })
};

async function deleteCategory(req, res){
  const {id} = req.body;

  try {
    await db.deleteCategory(id);
    res.redirect('/manage/search/all')
  } catch (err) {
    console.error(err);
  }
};

async function deletePath(req, res){
  const {id} = req.body;

  try {
    await db.deletePath(id);
    res.redirect('/manage/search/all')
  } catch (err) {
    console.error(err);
  }
};

async function deleteAction(req, res){
  const {id} = req.body;

  try {
    await db.deleteAction(id);
    res.redirect('/manage/search/all')
  } catch (err) {
    console.error(err);
  }
};

const manageController = {
  indexGet,
  readIndex,
  readAll,
  readOne,
  getCategory,
  getPath,
  getAction,
  insertIndex,
  insertCategory,
  insertPath,
  insertAction,
  updateIndex,
  updateCategory,
  updatePath,
  updateAction,
  deleteIndex,
  deleteCategory,
  deletePath,
  deleteAction
}

export default manageController