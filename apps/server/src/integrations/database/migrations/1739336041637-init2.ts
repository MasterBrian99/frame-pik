import { MigrationInterface, QueryRunner } from "typeorm";

export class Init21739336041637 implements MigrationInterface {
    name = 'Init21739336041637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "path"`);
        await queryRunner.query(`ALTER TABLE "album" ADD "snap_count" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "thumbnail_path" text`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "album_count" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "album_count"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "thumbnail_path"`);
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "snap_count"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "path" text`);
    }

}
