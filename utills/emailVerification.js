
  

const emailVerificationMailGenContent = (name,verificationLink) => {
    return {
      body: {
        name: name,
        intro: `Hi ${name} welcome to our app!`,
        action: [
          {
            instructions: `Hello ${name} please click the button below to verify your email`,
            button: {
              color: "#22BC66",
              text: "verify your email",
              link: verificationLink,
            },
          },
          // yeh extra information hai(optional hai)
          {
            instructions:
              "To read our frequently asked questions, please click here:",
            button: {
              text: "Read our FAQ",
              link: "https://fullBackend.com/faq",
            },
          },
        ],
      },
    };
  };

  export default emailVerificationMailGenContent