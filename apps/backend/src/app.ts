import express from "express";
import { json } from "body-parser";
import { connectDatabase } from "./db";
import { EmailController } from "./controllers/emailController";
import cors from "cors";
import { successResponseMiddleware } from "./middlewares/responseMiddleware";
import { errorHandlerMiddleware } from "./middlewares/errorMiddleware";
import { asyncErrorHandler } from "./middlewares/asyncErrorHandler";
import { upload } from "./config/multerConfig";
import { AttachmentController } from "./controllers/attachmentsController";
import { RecipientsController } from "./controllers/recipientsController";
import { FileUploadController } from "./controllers/fileUploadController";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const emailController = new EmailController();
const attachmentController = new AttachmentController();
const recipientsController = new RecipientsController();
const fileUploadController = new FileUploadController();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // minutes
  max: 1000, // requests
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

// Note: Uncomment this line tu use rateLimiter
// app.use(limiter);
app.use(cors());
app.use(json());
app.use(helmet());

app.use(successResponseMiddleware);

app.get(
  "/emails/:id",
  asyncErrorHandler((req, res) => emailController.getEmail(req, res))
);

app.get(
  "/emails",
  asyncErrorHandler((req, res) => emailController.getEmails(req, res))
);

app.post(
  "/emails",
  asyncErrorHandler((req, res) => emailController.createEmail(req, res))
);

app.delete(
  "/emails/:id",
  asyncErrorHandler((req, res) => emailController.deleteEmail(req, res))
);

app.post(
  "/upload-attachments/:id",
  upload.array("files"),
  asyncErrorHandler((req, res) => attachmentController.create(req, res))
);

// Recipients
app.get(
  "/recipients/:id",
  asyncErrorHandler((req, res) => recipientsController.getRecipient(req, res))
);

app.get(
  "/recipients",
  asyncErrorHandler((req, res) => recipientsController.getRecipients(req, res))
);

app.post(
  "/recipients",
  asyncErrorHandler((req, res) =>
    recipientsController.createRecipient(req, res)
  )
);

app.delete(
  "/recipients/:id",
  asyncErrorHandler((req, res) =>
    recipientsController.deleteRecipient(req, res)
  )
);

app.get(
  "/download/:file/",
  asyncErrorHandler((req, res) => fileUploadController.downloadFile(req, res))
);

app.use(errorHandlerMiddleware);

connectDatabase().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
