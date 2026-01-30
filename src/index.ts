import express from 'express'
import authRouter from './routes/auth.route.ts';
import bookingRouter from './routes/bookings.route.ts'
const app = express()
const PORT = process.env.PORT || 3001;


app.use(express.json())

app.use("/auth",authRouter)
app.use("/" , bookingRouter)


app.listen(PORT)
