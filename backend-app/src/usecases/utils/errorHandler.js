const handleError = (res, error) => {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === "DuplicateUserError") {
      return res.status(409).json({ error: error.message });
    }
    if (error.name === "NotFoundError") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  };
  
  module.exports = handleError;