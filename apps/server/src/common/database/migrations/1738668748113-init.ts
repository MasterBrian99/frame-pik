import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1738668748113 implements MigrationInterface {
    name = 'Init1738668748113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(10) NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "name" character varying(255) NOT NULL, "folder_name" character varying(255) NOT NULL, "description" text, "collection_id" integer, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(10) NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "name" character varying(255) NOT NULL, "folder_name" character varying(255) NOT NULL, "description" text, CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection_user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(10) NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "role_type" character varying(10) NOT NULL, "user_id" integer, "collection_id" integer, CONSTRAINT "PK_4f925485b013b52e32f43d430f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(10) NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "email" character varying(255) NOT NULL, "password" text, "name" character varying(255) NOT NULL, "role" character varying(20) NOT NULL DEFAULT 'USER', "code" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36" UNIQUE ("code"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "snap" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(10) NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "name" character varying(255) NOT NULL, "description" text, CONSTRAINT "PK_83556ff7a02169acb70c8043650" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_b6703b2cf4c0453c98901810238" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_user" ADD CONSTRAINT "FK_95da803564d58d8b36f063e59dc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_user" ADD CONSTRAINT "FK_f4c62d1e35845607dfe05275352" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_user" DROP CONSTRAINT "FK_f4c62d1e35845607dfe05275352"`);
        await queryRunner.query(`ALTER TABLE "collection_user" DROP CONSTRAINT "FK_95da803564d58d8b36f063e59dc"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_b6703b2cf4c0453c98901810238"`);
        await queryRunner.query(`DROP TABLE "snap"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "collection_user"`);
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`DROP TABLE "album"`);
    }

}
