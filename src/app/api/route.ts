import { scrapeService } from "@/service/scrapingService";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs/promises";
import {
  sendEmailWithAttachment,
  sendConfirmationEmail,
} from "@/service/mailService";

type BufferObj = {
  buffer: Buffer;
  email: string;
};

let queue: BufferObj[] = [];
let isBatchRunning = false;

export async function POST(request: NextRequest) {
  // Parse the incoming form data
  const formData = await request.formData();

  // Get the file from the form data
  const file = formData.get("file");
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "No email received." }, { status: 400 });
  }

  // Check if a file is received
  if (!file || !(file instanceof File)) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await new Response(file.stream()).arrayBuffer());

  queue.push({ buffer, email }); // Fix: Specify the 'email' property explicitly

  if (!isBatchRunning) {
    processQueue();
  }

  await sendConfirmationEmail(email);
  return NextResponse.json({ message: "Request received" }, { status: 201 });
}

async function processQueue() {
  if (queue.length === 0) {
    isBatchRunning = false;
    return;
  }

  isBatchRunning = true;
  const file: BufferObj | undefined = queue.shift();

  if (file) {
    const result = await scrapeService(file.buffer);

    //await fs.writeFile("data.csv", result);

    await sendEmailWithAttachment(result, file.email);
  }

  processQueue();
}
