import db from './db.js'

const getCategories = async () => {
  const {rows} = await db.query('SELECT * FROM category');

  return rows
};

const getPaths = async () => {
  const {rows} = await db.query(`
    SELECT p.id, p.name, c.name AS category_name
    FROM path p
    JOIN category c ON c.id = category_id
    `);

  return rows
};

const getActions = async () => {
  const {rows} = await db.query(`
    SELECT a.id, a.name, p.name AS path_name
    FROM action a
    JOIN path p ON p.id = path_id
    `);

  return rows
}

const getAllEntries = async () => {
  const text = `SELECT c.id AS category_id, c.name AS category_name, p.id AS path_id, p.name AS path_name, a.id AS action_id, a.name AS action_name
  FROM category c
  LEFT JOIN path p ON c.id = category_id
  LEFT JOIN action a ON p.id = path_id
  `;
  try {
    const {rows} = await db.query(text);

    return rows
  } catch (err) {
    console.error(err);
  }
};

const getOneField = async table => {
  const {rows} = await db.query("SELECT column_name FROM information_schema.columns WHERE table_name = $1 AND table_schema = 'public'", [table]);

  return rows
};

async function queryCategory(category){
  const text = `SELECT c.id AS category_id, c.name AS category_name, p.id AS path_id, p.name AS path_name, a.id AS action_id, a.name AS action_name
  FROM category c
  LEFT JOIN path p ON c.id = category_id
  LEFT JOIN action a ON p.id = path_id
  WHERE c.name = $1
  `;
  const params = [category];
  try {
    const {rows} = await db.query(text, params);

    return rows
  } catch (err){
    if(err){
      console.error(err);
      console.log('query: ', category);
      console.log('params: ', params);
    }
  }
}

async function queryPath(path){
  const text = `SELECT c.id AS category_id, c.name AS category_name, p.id AS path_id, p.name AS path_name, a.id AS action_id, a.name AS action_name
  FROM category c
  LEFT JOIN path p ON c.id = category_id
  LEFT JOIN action a ON p.id = path_id
  WHERE p.name = $1
  `;
  const params = [path];
  try {
    const {rows} = await db.query(text, params);

    return rows
  } catch (err){
    if(err){
      console.error(err);
      console.log('query: ', category);
      console.log('params: ', params);
    }
  }
}

async function queryAction(action){
  const text = `SELECT c.id AS category_id, c.name AS category_name, p.id AS path_id, p.name AS path_name, a.id AS action_id, a.name AS action_name
  FROM category c
  LEFT JOIN path p ON c.id = category_id
  LEFT JOIN action a ON p.id = path_id
  WHERE a.name = $1
  `;
  const params = [action];
  try {
    const {rows} = await db.query(text, params);

    return rows
  } catch (err){
    if(err){
      console.error(err);
      console.log('query: ', category);
      console.log('params: ', params);
    }
  }
}

async function insertCategory(value){
  const text = 'INSERT INTO category (name) VALUES ($1);';
  const params = [value];

  try {
    await db.query(text, params);
  } catch (err) {
    console.error(err);
    console.log('query: ', text);
    console.log('params: ', params);
  }
}

async function insertPath(value, parent){
  const text = 'INSERT INTO path (name, category_id) VALUES ($1, $2);';
  const params = [value, parent];

  try {
    await db.query(text, params);
  } catch (err) {
    console.error(err);
    console.log('query: ', text);
    console.log('params: ', params);
  }
}

async function insertAction(value, parent){
  const text = 'INSERT INTO action (name, path_id) VALUES ($1, $2);';
  const params = [value, parent];

  try {
    await db.query(text, params);
  } catch (err) {
    console.error(err);
    console.log('query: ', text);
    console.log('params: ', params);
  }
}

async function updateCategory(oldValue, newValue){
  const text = 'UPDATE category SET name = $2 WHERE id = $1';
  const params = [oldValue, newValue];

  try {
    await db.query(text, params);
  } catch (err) {
    console.error(err);
    console.log('query: ', text);
    console.log('params: ', params);
  }
}

async function updatePath(oldValue, newValue){
  const text = 'UPDATE path SET name = $2 WHERE id = $1';
  const params = [oldValue, newValue];

  try {
    await db.query(text, params);
  } catch (err) {
    console.error(err);
    console.log('query: ', text);
    console.log('params: ', params);
  }
}

async function updateAction(oldValue, newValue){
  const text = 'UPDATE action SET name = $2 WHERE id = $1';
  const params = [oldValue, newValue];

  try {
    await db.query(text, params);
  } catch (err) {
    console.error(err);
    console.log('query: ', text);
    console.log('params: ', params);
  }
}

async function deleteCategory(id){
  const prepretext = 'DELETE FROM action WHERE path_id IN (SELECT id FROM path WHERE category_id = $1);';
  const pretext = 'DELETE FROM path WHERE category_id = $1';
  const text = `
  DELETE FROM category WHERE id = $1;
  `;
  const params = [id];

  try {
    await db.query(prepretext, params);
    await db.query(pretext, params);
    await db.query(text, params);
  } catch (err) {
    console.error(err);
    console.log('query: ', text);
    console.log('params: ', params);
  }
}

async function deletePath(id){
  const pretext = "DELETE FROM action WHERE path_id = $1";
  const text = `
  DELETE FROM path WHERE id = $1;`;
  const params = [id];

  try {
    await db.query(pretext, params);
    await db.query(text, params);
  } catch (err) {
    console.error(err);
    console.log('query: ', text);
    console.log('params: ', params);
  }
}

async function deleteAction(id){
  const text = "DELETE FROM action WHERE id = $1";
  const params = [id];

  try {
    await db.query(text, params);
  } catch (err) {
    console.error(err);
    console.log('query: ', text);
    console.log('params: ', params);
  }
}

const qContainer = {
  getCategories,
  getPaths,
  getActions,
  getAllEntries,
  getOneField,
  queryCategory,
  queryPath,
  queryAction,
  insertCategory,
  insertPath,
  insertAction,
  updateCategory,
  updatePath,
  updateAction,
  deleteCategory,
  deletePath,
  deleteAction
}

export { qContainer as db }