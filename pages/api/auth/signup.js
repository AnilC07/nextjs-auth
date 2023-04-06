import { hashPassword } from "@/lib/auth";
import { connectToDB } from "@/lib/db";

async function handler(req, res) {
  // Check if the req method is different for POST, if it is, we do nothing
  if (!req.method === "POST") {
    return;
  }

  // Store form datas into body and destructure it to handle properties in the object 
  const data = req.body;

  const { email, password } = data;

  console.log({data})

  // Server side check
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }
  // Use helper to connect db
  const client = await connectToDB();

  const db = client.db();

  // Check if user is existing in a db to avoid overwriting
  const existingUser = await db.collection("users").findOne({ email: email });

  // If is it, return an error
  if (existingUser) {
    res.status(422).json({
      status: "failed",
      message: "User already registered",
    });
    client.close()
    return
  }

  // use helper to hash plain text password and hash it
  const hashedPassword = await hashPassword(password);

  // Insert an object into the collection
  await db.collection("users").insertOne({ email, password: hashedPassword });

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
