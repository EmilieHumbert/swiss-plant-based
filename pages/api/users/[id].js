import { getUser, updateUser } from "../../../server/users";

export default async (req, res) => {
  // TODO: Check permissions
  if (req.method === "GET") {
    const user = await getUser(req.query.id);
    res.statusCode = 200;
    return res.json(user);
  }

  if (req.method === "POST") {
    await updateUser(req.query.id, JSON.parse(req.body));
    res.statusCode = 200;
    return res.json({ ok: true });
  }

  res.statusCode = 404;
  res.json();
};
