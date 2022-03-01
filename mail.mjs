import {createTransport} from "nodemailer"
import lectures from "./lectures.json"

import {google} from "googleapis"


const domain = "http://sunoticebot.me"
const REDIRECT_URI="https://developers.google.com/oauthplayground"

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

async function mailYolla(mail) {

    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const authObject =  {
            type:"OAuth2",
            user:process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
        }
        const transport = createTransport({
            service:"gmail",
            auth:authObject
        })

        const result = await transport.sendMail(mail)
        return result
    }
    catch(error) {
        return error
    }
}



function mailHazirla(crn,kisiler) {
    const message = {
        from: process.env.EMAIL,
        bcc: Array.from(kisiler).map(kisi => kisi + "@sabanciuniv.edu"),
        subject: ` Lesson ${lectures[crn]} with CRN ${crn} is empty right now `,
        text: `This lesson could have already filled by the time you see this message
                You can try again at ${domain}`
    }
    return message
  }

export {mailHazirla,mailYolla}






