import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { createValidator, ExpressJoiError } from "express-joi-validation";

const app = express();
const validator = createValidator({ passError: true });
const querySchema = Joi.object({
  name: Joi.string().optional(),
});

app.get(
  "/",
  validator.query(querySchema),
  (request: Request, response: Response) => {
    const { name } = request.query;
    response.json({ data: `Hello, ${name || "world"}!` });
  },
);

app.use(
  (err: ExpressJoiError, req: Request, res: Response, next: NextFunction) => {
    if (err.error?.isJoi) {
      return res.status(400).json({
        type: err.type,
        error: err.error.toString(),
      });
    }

    next(err);
  },
);

export default app;
