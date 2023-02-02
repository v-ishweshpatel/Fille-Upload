const fastify = require("fastify")({
  logger: true,
});

const multer = require("fastify-multer");
const path = require("path");

const maxFileSize5MB = 5 * 1024 * 1024;
const maxFileSize100MB = 100 * 1024 * 1024;

const storage5MB = multer.memoryStorage();
const upload5MB = multer({
  storage: storage5MB,
  limits: { fileSize: maxFileSize5MB },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|txt|pdf)$/)) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

const storage100MB = multer.memoryStorage();
const upload100MB = multer({
  storage: storage100MB,
  limits: { fileSize: maxFileSize100MB },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

fastify.post(
  "/upload-5mb",
  {
    preHandler: upload5MB.single("file"),
  },
  async (request, reply) => {
    const file = request.file;
    const { path, originalname } = file;

    // Store the uploaded file in the desired location
    // ...
    reply.code(200).send({ message: "File uploaded successfully" });
  }
);

fastify.post(
  "/upload-100mb",
  {
    preHandler: upload5MB.single('file'),
  },
  async (request, reply) => {
    const file = request.file;
    const { path, originalname } = file;

    // Store the uploaded file in the desired location
    // ...

    reply.code(200).send({ message: "File uploaded successfully" });
  }
);

const port = 3000;
fastify.listen(port, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
