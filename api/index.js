const app = require("../server/server");

module.exports = (req, res) => {
  // Vercel rewrites /api/* here and supplies the original path in `path`.
  const requestUrl = new URL(req.url, "https://vercel.local");
  const originalPath = requestUrl.searchParams.get("path");
  if (originalPath) {
    requestUrl.searchParams.delete("path");
    req.url = `/api/${originalPath}${requestUrl.search}`;
  } else if (requestUrl.pathname === "/api/index") {
    req.url = `/api${requestUrl.search}`;
  }
  return app(req, res);
};
