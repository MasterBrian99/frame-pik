import { MigrationInterface, QueryRunner } from "typeorm";

export class WallInit1729354109851 implements MigrationInterface {
    name = 'WallInit1729354109851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."wall_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "wall" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."wall_status_enum" NOT NULL DEFAULT 'ACTIVE', "name" character varying(100) NOT NULL, "description" text, "is_public" boolean NOT NULL, CONSTRAINT "PK_ca859a54ea070c4f0ae536fd510" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."wall_collaborator_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'DELETED')`);
        await queryRunner.query(`CREATE TYPE "public"."wall_collaborator_collaboratorrole_enum" AS ENUM('OWNER', 'USER')`);
        await queryRunner.query(`CREATE TABLE "wall_collaborator" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."wall_collaborator_status_enum" NOT NULL DEFAULT 'ACTIVE', "collaboratorRole" "public"."wall_collaborator_collaboratorrole_enum" NOT NULL DEFAULT 'USER', "userId" integer, "wallId" integer, CONSTRAINT "PK_2ba41e7cf9a61211a19aa1e5c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wall_collaborator" ADD CONSTRAINT "FK_15f2fe752101c61e3183ce4a24c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wall_collaborator" ADD CONSTRAINT "FK_e397857215b33ca0297fb6d5d47" FOREIGN KEY ("wallId") REFERENCES "wall"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wall_collaborator" DROP CONSTRAINT "FK_e397857215b33ca0297fb6d5d47"`);
        await queryRunner.query(`ALTER TABLE "wall_collaborator" DROP CONSTRAINT "FK_15f2fe752101c61e3183ce4a24c"`);
        await queryRunner.query(`DROP TABLE "wall_collaborator"`);
        await queryRunner.query(`DROP TYPE "public"."wall_collaborator_collaboratorrole_enum"`);
        await queryRunner.query(`DROP TYPE "public"."wall_collaborator_status_enum"`);
        await queryRunner.query(`DROP TABLE "wall"`);
        await queryRunner.query(`DROP TYPE "public"."wall_status_enum"`);
    }

}
