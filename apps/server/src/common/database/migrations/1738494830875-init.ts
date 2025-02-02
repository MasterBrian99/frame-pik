import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1738494830875 implements MigrationInterface {
    name = 'Init1738494830875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(10) NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "email" character varying(255) NOT NULL, "password" text, "name" character varying(255) NOT NULL, "role" character varying(20) NOT NULL DEFAULT 'USER', "code" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36" UNIQUE ("code"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(10) NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "name" character varying(255) NOT NULL, "folder_name" character varying(255) NOT NULL, "description" text, CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
