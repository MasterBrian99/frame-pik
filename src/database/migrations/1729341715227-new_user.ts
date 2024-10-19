import { hash, genSalt } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewUser1729341715227 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await genSalt();

    // Hash the password before inserting it into the database
    const passwordHash = await hash('admin123', salt);

    await queryRunner.query(
      `INSERT INTO users (email, password, name, role, status)
       VALUES ($1, $2, $3, $4, $5)`,
      ['admin@pinista.com', passwordHash, 'Admin', 'ADMIN', 'ACTIVE'],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = $1`, [
      'admin@pinista.com',
    ]);
  }
}
