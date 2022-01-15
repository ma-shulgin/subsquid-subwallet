module.exports = class data1642238066525 {
  name = 'data1642238066525'

  async up(db) {
    await db.query(`CREATE TABLE "balance_transaction" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_number" integer NOT NULL, "extrinisic_hash" text, "data" jsonb, "event" character varying(18), CONSTRAINT "PK_5e3fd7a79cf10c4cd192e5648dc" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "staking_transaction" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_number" integer NOT NULL, "extrinisic_hash" text, "data" jsonb, "event" character varying(9), CONSTRAINT "PK_318d36d8af1801e2d1e79fdf6f0" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "balance_transaction"`)
    await db.query(`DROP TABLE "staking_transaction"`)
  }
}
