
import fetch from 'node-fetch';
import {JSDOM} from "jsdom"

import {mailHazirla,mailYolla} from "./mail.mjs"
import config from "./config.json"






async function getAllCourses() {

    try {
    const response = await fetch('https://suis.sabanciuniv.edu/prod/bwckgens.P_RegsGetCrse', {
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://suis.sabanciuniv.edu',
            'Connection': 'keep-alive',
            'Referer': 'https://suis.sabanciuniv.edu/prod/bwckgens.P_RegsGetCrse',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Cookie': 'hidden'
        },
        body: 'rsts=dummy&assoc_term_in=dummy&crn=dummy&start_date_in=dummy&end_date_in=dummy&subj=dummy&crse=dummy&sec=dummy&levl=dummy&gmod=dummy&cred=dummy&title=dummy&mesg=dummy&regs_row=6&wait_row=0&add_row=10&path=dummy&rsts=&assoc_term_in=202102&crn=20287&start_date_in=28%2F02%2F2022&end_date_in=10%2F06%2F2022&subj=CS&crse=412&sec=0&levl=Undergraduate&gmod=Standard&cred=++++3.000&title=Machine+Learning&mesg=DUMMY&rsts=&assoc_term_in=202102&crn=20288&start_date_in=28%2F02%2F2022&end_date_in=10%2F06%2F2022&subj=CS&crse=412R&sec=0&levl=Undergraduate&gmod=Ungradable&cred=++++0.000&title=Machine+Learning-+Recitation&mesg=DUMMY&rsts=&assoc_term_in=202102&crn=20289&start_date_in=28%2F02%2F2022&end_date_in=10%2F06%2F2022&subj=CS&crse=432&sec=0&levl=Undergraduate&gmod=Standard&cred=++++3.000&title=Computer+and+Network+Security&mesg=DUMMY&rsts=&assoc_term_in=202102&crn=20291&start_date_in=28%2F02%2F2022&end_date_in=10%2F06%2F2022&subj=CS&crse=432L&sec=A2&levl=Undergraduate&gmod=Ungradable&cred=++++0.000&title=Comp.+and+Net.+Sec.-+Lab&mesg=DUMMY&rsts=&assoc_term_in=202102&crn=20298&start_date_in=28%2F02%2F2022&end_date_in=10%2F06%2F2022&subj=CS&crse=48001&sec=0&levl=Undergraduate&gmod=Standard&cred=++++3.000&title=Spe.+Top.+in+CS%3A+B.%3A+Sec.%26App.&mesg=DUMMY&rsts=&assoc_term_in=202102&crn=20083&start_date_in=28%2F02%2F2022&end_date_in=10%2F06%2F2022&subj=FIN&crse=406&sec=0&levl=Undergraduate&gmod=Standard&cred=++++3.000&title=Behavioral+Finance&mesg=DUMMY&term_in=202102&sel_subj=dummy&sel_day=dummy&sel_schd=dummy&sel_insm=dummy&sel_camp=dummy&sel_levl=dummy&sel_sess=dummy&sel_instr=dummy&sel_ptrm=dummy&sel_attr=dummy&sel_subj=AL&sel_subj=ACC&sel_subj=GR&sel_subj=ANTH&sel_subj=ARA&sel_subj=BAN&sel_subj=CHEM&sel_subj=CIP&sel_subj=CS&sel_subj=CONF&sel_subj=CULT&sel_subj=DA&sel_subj=DS&sel_subj=ECON&sel_subj=EE&sel_subj=ETM&sel_subj=ENS&sel_subj=ENG&sel_subj=ES&sel_subj=FILM&sel_subj=FIN&sel_subj=MFIN&sel_subj=FRE&sel_subj=GEN&sel_subj=GER&sel_subj=HART&sel_subj=HIST&sel_subj=HUM&sel_subj=IE&sel_subj=IT&sel_subj=IF&sel_subj=IR&sel_subj=LAW&sel_subj=LIT&sel_subj=MGMT&sel_subj=MRES&sel_subj=MFE&sel_subj=MFG&sel_subj=MKTG&sel_subj=MAT&sel_subj=MATH&sel_subj=ME&sel_subj=BIO&sel_subj=NS&sel_subj=OPIM&sel_subj=ORG&sel_subj=PERS&sel_subj=PHIL&sel_subj=PHYS&sel_subj=POLS&sel_subj=PROJ&sel_subj=PSY&sel_subj=QL&sel_subj=SEC&sel_subj=SPS&sel_subj=TLL&sel_subj=TS&sel_subj=TUR&sel_subj=VA&sel_crse=&sel_title=&sel_from_cred=&sel_to_cred=&begin_hh=0&begin_mi=0&begin_ap=a&end_hh=0&end_mi=0&end_ap=a&sub_btn=Section+Search'
    });



    const textResponse = await response.text()

    

    const result = coursesToObject(textResponse)

   

    return result
}
    catch(error) {
        return {}
    }


}

function coursesToObject(textResponse) {
    let courseDictionary = {}

    const dom = new JSDOM(textResponse)
    if (dom != null) {
    const dersler = dom.window.document.querySelectorAll(".datadisplaytable > tbody > tr")

    dersler.forEach(ders => {
        const result =  ders.querySelectorAll("td")


        if (result.length > 12) {
            let crnSelector = result[1].querySelector("a")

            if (crnSelector != null) {
                courseDictionary[crnSelector.textContent] = result[12].textContent > 0;
            }

            
        }

    })
    }

    return courseDictionary

}






function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function bildir(waitList) {

    do {
        const waitLength = waitList != null ? Object.keys(waitList).length : 0


        if (waitLength > 0) {
            

        const allCourses = await getAllCourses()
        const allCourseLength = Object.keys(allCourses).length



        if (allCourseLength >= waitLength  ) {

           const foundLectures =  Object.keys(waitList).filter((key,index) => allCourses[key] == true)


           await Promise.all(foundLectures.map(async (lec) => {
               const mail = mailHazirla(lec,waitList[lec])
                try {
                    const result = await mailYolla(mail)
                    console.log(result)
                    delete waitList[lec]
                }
                catch(error){
                    console.log(error.message)
                }
           }))

         
        }
        
    }

        await sleep(config.cooldown * 1000)

    }
    while(true)
}





export {bildir,getAllCourses}
