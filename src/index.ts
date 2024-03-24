import express from 'express'
import config from 'config'
import connectToDb from './utils/connect'
import logger from './utils/logger'
import routes from './routes'
import deserializeUser from './middlerware/deserializerUser'

const PORT = config.get<number>('PORT')
const app = express();

app.use(express.json());
app.use(deserializeUser)
app.listen(PORT, async ()=> {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connectToDb();
  routes(app);
})

