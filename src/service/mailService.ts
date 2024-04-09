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
      subject: "Scraping finished",
      text: "Please find the attached CSV file. Thank you!",
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

export { sendEmailWithAttachment };
