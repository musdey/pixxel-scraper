import * as nodemailer from "nodemailer";

// Define the user settings for the transporter
const userSettings = {
  host: process.env.EMAIL_HOST || "ssl0.ovh.net",
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 465,
  secure: process.env.EMAIL_SECURE === "true" ? false : true,
  auth: {
    user: process.env.EMAIL_USER || "tool@pixxel.solutions",
    pass: process.env.EMAIL_PASS || "HC%-C93mNXhmV%b",
  },
};

// Create the transporter
const transporter = nodemailer.createTransport(userSettings);

async function sendConfirmationEmail(to: string) {
  try {
    // Define the email options
    const mailOptions = {
      from: userSettings.auth.user,
      to: to,
      bcc: userSettings.auth.user,
      subject: "Thank you! - Scraping started",
      text: "Your request has been received. It is now processing and can take up to 15 minutes. You will receive an email with the results once the process is complete. Thank you!",
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Function to send email with attached CSV file
async function sendEmailWithAttachment(file: string, to: string) {
  console.log(JSON.stringify(userSettings));

  // Convert the CSV data to a Buffer
  // const csvBuffer = Buffer.from(csvData, "utf8");
  try {
    // Define the email options
    const mailOptions = {
      from: userSettings.auth.user,
      to: to,
      bcc: userSettings.auth.user,
      subject: "Scraping finished",
      text: `Please find the attached CSV file. Thank you! \n \n
      P.S. If you encounter any issues: \n \n
      1. Please ensure that your CSV file is correctly formatted. The first row must include a URL that you wish to scrape. \n
      2. Refer to the instructional video for guidance. \n
      3. Attempt the process again. \n
      4. We apologize for any inconvenience. It is possible that we may not be able to scrape data from this specific website.  `,
      attachments: [
        {
          filename: "data.csv",
          content: file,
        },
      ],
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export { sendEmailWithAttachment, sendConfirmationEmail };
