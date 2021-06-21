module.exports = {
  "timeout": 100,
  "load": {
    "before": ["responseTime", "logger", "cors", "responses", "gzip"],
    "order": [
      "Define the middlewares' load order by putting their name in this array is the right order"
    ],
    "after": ["parser", "router"]
  },
  settings: {
    cors: {
      enabled: true,
      origin: ["*"],
      expose: [
        "WWW-Authenticate",
        "Server-Authorization",
        "Access-Control-Expose-Headers",
      ],
      maxAge: 31536000,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
      headers: "*",
    },

    parser: {
      enabled: true,
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // Defaults to 200mb
      },
    },
  },
};
