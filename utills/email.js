import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });
 
     const sendMail = async (useremail,link,type)=>{
      const isReset = type === "reset"
      try { 
            const mailOption = {
           from: 'maddison53@ethereal.email', // sender address
           to: useremail, 
           subject: isReset? "Reset Your Password":"verify your email",// Subject line
           text: isReset ? "Click here to reset your password" : "Click here to verify your email",
           html:   `<b> ${isReset ?"Reset your password:":"verify your email:"}</b>
                     <a href="${link}" target="_blank">${link}</a>`
       }
   
          const messager = await transporter.sendMail(mailOption)
          console.log('messager dikhao:',messager);
          
   
 } catch (error) {
    console.error("error:",error)
    
 }
     }
           
export default sendMail;
