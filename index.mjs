import "dotenv/config.js";
import express from "express"
import {bildir,getAllCourses} from "./helper.mjs"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import lectures from "./lectures.json" 
import HttpStatus from "http-status-codes"
import config from "./config.json"




const app = express()
const port = process.env.PORT || 80
const __dirname = dirname(fileURLToPath(import.meta.url));



var waitList = {}
Object.defineProperty(waitList,"emptyIndexes", {
  enumerable:false,
  value:[],
  writable:true
})

const donem = config.term

app.use(express.json())
app.use(express.static("build"))

bildir(waitList);

const sendResponse = (res,code,success,message) => {
  res.status(code).json({successful:success,content:message})
}

const lessonExists = (res,lec,lectures) => {
  if (!(lectures.hasOwnProperty(lec))) {
    sendResponse(res,HttpStatus.OK,false,`Course ${lec} is not on the course list please enter again all courses correctly`)
    return false
  }
  return true   
}

  

  app.post("/", (req,res) => {

    const username = req.body.username
    const lecs = req.body.lectures

    if (!(lecs && username)) {
      sendResponse(res,HttpStatus.OK,false,"You didn't entered your username or lectures")
      return
    }


    for (const lec of lecs) {

        if(!(lessonExists(res,lec,lectures)))
          return

        if (!(lec in waitList)) {
            
            waitList[lec] = new Set([username])
        }

        else {
            waitList[lec].add(username)
        }
    }

    sendResponse(res,HttpStatus.OK,true,"You will be notified when there are empty spaces on the courses you selected")

})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })





