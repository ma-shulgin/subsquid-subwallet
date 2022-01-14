module.exports = class data1642166578272 {
  name = 'data1642166578272'

  async up(db) {
    await db.query(`CREATE TABLE "balance_transaction" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_number" integer NOT NULL, "extrinisic_hash" text, "success" boolean NOT NULL, "accounts" text array, "amounts" numeric array, "status" character varying(8), "event" character varying(18), CONSTRAINT "PK_5e3fd7a79cf10c4cd192e5648dc" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "balance_transaction"`)
  }
}
