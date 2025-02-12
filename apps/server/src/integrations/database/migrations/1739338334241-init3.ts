import { MigrationInterface, QueryRunner } from "typeorm";

export class Init31739338334241 implements MigrationInterface {
    name = 'Init31739338334241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" ADD "views" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "views"`);
    }

}
