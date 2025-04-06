import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const sendMail = async (option) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen", //yahan kuch bhi name de sakte hai
      link: "https://mailgen.js/", //yahan apni app ki link daal sakte he yeh jo footer me dikhta hai jo ki baki mail bhi aisa hi hota h
    },
  });
  let text = mailGenerator.generatePlaintext(option.generatecontent)
   let html = mailGenerator.generate(option.generatecontent)
   console.log("🧾 HTML:", html);
console.log("📄 TEXT:", text);
   
   await transporter.sendMail({
    from: "maddison53@ethereal.email",
    to: option.to,          // recipient email
    subject: option.subject, // subject line
    html,
    text
 
  });
};

export {sendMail}
  


