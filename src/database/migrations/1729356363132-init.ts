import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1729356363132 implements MigrationInterface {
    name = 'Init1729356363132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."wall_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "wall" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."wall_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "name" character varying(100) NOT NULL, "description" text, "is_public" boolean NOT NULL, CONSTRAINT "PK_ca859a54ea070c4f0ae536fd510" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."wall_collaborator_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'DELETED')`);
        await queryRunner.query(`CREATE TYPE "public"."wall_collaborator_collaboratorrole_enum" AS ENUM('OWNER', 'USER')`);
        await queryRunner.query(`CREATE TABLE "wall_collaborator" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."wall_collaborator_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "collaboratorRole" "public"."wall_collaborator_collaboratorrole_enum" NOT NULL DEFAULT 'USER', "user_id" integer, "wall_id" integer, CONSTRAINT "PK_2ba41e7cf9a61211a19aa1e5c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'DELETED')`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."users_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_by" bigint, "updated_by" bigint, "email" character varying(255) NOT NULL, "password" text, "name" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wall_collaborator" ADD CONSTRAINT "FK_18810146504957e7580fcffebe1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wall_collaborator" ADD CONSTRAINT "FK_3b64efc1215aae20ffd040dd48a" FOREIGN KEY ("wall_id") REFERENCES "wall"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wall_collaborator" DROP CONSTRAINT "FK_3b64efc1215aae20ffd040dd48a"`);
        await queryRunner.query(`ALTER TABLE "wall_collaborator" DROP CONSTRAINT "FK_18810146504957e7580fcffebe1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TABLE "wall_collaborator"`);
        await queryRunner.query(`DROP TYPE "public"."wall_collaborator_collaboratorrole_enum"`);
        await queryRunner.query(`DROP TYPE "public"."wall_collaborator_status_enum"`);
        await queryRunner.query(`DROP TABLE "wall"`);
        await queryRunner.query(`DROP TYPE "public"."wall_status_enum"`);
    }

}
