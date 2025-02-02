import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserInit1738481895091 implements MigrationInterface {
  name = 'UserInit1738481895091';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(10) NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "email" character varying(255) NOT NULL, "password" text, "name" character varying(255) NOT NULL, "role" character varying(20) NOT NULL DEFAULT 'USER', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
