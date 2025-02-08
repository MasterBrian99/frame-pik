import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfileImage1739026544503 implements MigrationInterface {
    name = 'ProfileImage1739026544503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_image" text`);
        await queryRunner.query(`ALTER TABLE "snap" ADD "path" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "snap" DROP COLUMN "path"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_image"`);
    }

}
