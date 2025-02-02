import { MigrationInterface, QueryRunner } from "typeorm";

export class Init21738501767557 implements MigrationInterface {
    name = 'Init21738501767557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_user" RENAME COLUMN "owner_type" TO "role_type"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_user" RENAME COLUMN "role_type" TO "owner_type"`);
    }

}
