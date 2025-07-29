import express from 'express';
import path from 'path';
import url from 'url';
import indexRouter from './routers/indexRouter.js';
import manageRouter from './routers/manageRouter.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/manage', manageRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});