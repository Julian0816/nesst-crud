import express, { Request, Response } from 'express'

//Create port
const port = 9000;

//Create the app
const app = express()

//Test end-point
app.get('/', (req: Request, res: Response) => {
    return res.send('Hello World')
})

//App.listen
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})