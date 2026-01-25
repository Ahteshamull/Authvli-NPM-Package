# authveli

Smart auth & validation middleware for Express.js APIs.

## Install

npm i authveli

## Usage

```js
import { authveli } from "authveli";
import { z } from "zod";

const adminSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

app.post(
  "/admin",
  authveli({
    auth: true,
    roles: ["admin"],
    validate: adminSchema,
    jwtSecret: process.env.JWT_SECRET,
  }),
  controller,
);
```

## Features

- JWT authentication
- Role-based access control
- Zod validation
- One-line middleware
- Clean error handling
