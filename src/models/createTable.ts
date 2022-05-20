import db from "../models/index";

export const createTable = async (): Promise<void> => {
  try {
    const client = await db.getClient()
    await client.query(`
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";
      
      CREATE TABLE IF NOT EXISTS manufacturers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(20)
      );
      
      CREATE TABLE IF NOT EXISTS equipments (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          model VARCHAR(30) NOT NULL,
          serialNumber VARCHAR(30) NOT NULL UNIQUE,
          manufacturer_id UUID NOT NULL,
          CONSTRAINT fk_equiptments FOREIGN KEY(manufacturer_id) REFERENCES manufacturers(id) ON DELETE CASCADE
      );`);
    console.log("Created / Reinitialized Tables");
    client.release();
  } catch (e) {
    console.error(e);
  }
};
