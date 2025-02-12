import cors from 'cors'
import checkDBConnection from './DB/connectionDB.js'
import { AppGeneralError, globalErrorHandling } from './utils/index.js'
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './modules/graphql.schema.js';
import  expressPlayground from 'graphql-playground-middleware-express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
const limiter=rateLimit({
    limit:5,
    handler:(req,res,next)=>{
        return next(new AppGeneralError('Game Over! Too Many Requests ',429))
    },
    windowMs:60*1000,

})
const bootstrap=(app,express)=>{

    app.use(morgan('dev'))
    app.use(helmet())
    app.use(cors())
    app.use(limiter)
    app.use(express.json())
    checkDBConnection()

  
    app.use('/graphql', createHandler({ schema:schema }));
    app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }))
    app.get('/',(req,res,next)=>{
        res.status(200).json({ message: "Welcome to My Library Management System ❤️" });
    })
    app.use('*',(req,res,next)=>{
        return next(new AppGeneralError('Page Not Found 404',404))
    })
    app.use(globalErrorHandling)


}
export default bootstrap