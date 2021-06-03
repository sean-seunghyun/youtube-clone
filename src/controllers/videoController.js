export const trending = (req, res) => res.send("homepage videos");

export const watch = (req, res) => res.send(`watch videos: ${req.params.id}`);

export const edit = (req, res) => res.send("edit videos");

export const search = (req, res) => res.send("search videos");

export const remove = (req, res) => res.send(`remove videos: ${req.params.id}`);

export const upload = (req, res) => res.send("upload videos");