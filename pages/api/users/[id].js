import { getUser, updateUser } from "../../../server/users";

export default async (req, res) => {
  // TODO: Check permissions
  if (req.method === "GET") {
    const user = await getUser(req.query.id);

    if (!user) {
      res.statusCode = 404;
      return res.end();
    }

    res.statusCode = 200;
    return res.json(user);
  }

  if (req.method === "POST") {
    try {
      await updateUser(req.query.id, JSON.parse(req.body));
    } catch (error) {
      const message = error.statusCode ? error.message : "Unhandled error";
      res.statusCode = error.statusCode || 500;
      return res.json({ error: message });
    }

    res.statusCode = 200;
    return res.json({ ok: true });
  }

  res.statusCode = 404;
  res.end();
};
