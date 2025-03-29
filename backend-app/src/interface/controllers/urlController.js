const CreateShortenedUrl = require("../../usecases/url/createShortenedUrl");
const RedirectToOriginalUrl = require("../../usecases/url/redirectToOriginalUrl");
const ListUserUrls = require("../../usecases/url/listUserUrls");
const DeleteUrl = require("../../usecases/url/deleteUrl");

const errorHandler = require("../../usecases/utils/errorHandler");


const createShortenedUrlHandler = (createShortenedUrl) => async (req, res) => {
  try {
    const longUrl  = req.body.longUrl;
    const userId = req.user.id;
    const title = req.body.title ;

    if (!longUrl) {
      throw new ValidationError("longUrl is required");
    }
    if (!userId) {
      throw new ValidationError("User ID is missing");
    }

    const { shortUrl } = await createShortenedUrl.execute(longUrl,title, userId);

    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error("Error in createShortenedUrlHandler:", error);
    errorHandler(res, error);
  }
};

const redirectToOriginalUrlHandler = (redirectToOriginalUrl) => async (req, res) => {
  try {
    const { shortId } = req.params;

    const longUrl = await redirectToOriginalUrl.execute(shortId);

    res.redirect(longUrl);
  } catch (error) {
    console.error("Error in redirectToOriginalUrlHandler:", error);
    errorHandler(res, error);
  }
};

  const listUserUrlsHandler= (listUserUrls) => async (req, res) => {
    try {
      const userId = req.user.id; 

      const urls = await listUserUrls.execute(userId);

      res.status(200).json(urls);
    } catch (error) {
        errorHandler(res, error);
    }
  }
 const deleteUrlHandler = (deleteUrl) => async (req, res) => {
  try {
    const shortId = req.params.shortId;
    await deleteUrl.execute(shortId);
    res.status(200).json({ message: "Url deleted successfully" });
  } catch (error) {
    errorHandler(res, error); 
  }
};


module.exports = {
    createShortenedUrlHandler,
    redirectToOriginalUrlHandler,
    listUserUrlsHandler,
    deleteUrlHandler
};