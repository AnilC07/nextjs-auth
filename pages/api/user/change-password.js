import { verifyPassword, hashPassword } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDB();

  const userCollection = client.db().collection("users");

  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "user not find" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(422).json({ message: "Dont have permisionn" });
    client.close();
    return;
  }

  const newHashedPassword = await hashPassword(newPassword);

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: newHashedPassword } }
  );

  client.close();

  res.status(203).json({ message: "Password Updated successfully" });
}

export default handler;
