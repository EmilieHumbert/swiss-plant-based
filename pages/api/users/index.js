import { createUser } from "../../../server/users";

export default async (req, res) => {
  // TODO: Check permissions
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    await createUser(data.uid, data);
    res.statusCode = 200;
    return res.json({ ok: true });
  }

  res.statusCode = 404;
  res.json();
};
