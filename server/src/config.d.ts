declare namespace NodeJS{
  interface ProcessEnv{
    NODE_ENV: string,
    // PORT: number,
    DB: string,
    DB_PASSWORD: string,
  }
}