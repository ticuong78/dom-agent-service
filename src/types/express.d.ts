declare module "express" {
  interface Request {
    env?: Env;
  }
}

export {};
