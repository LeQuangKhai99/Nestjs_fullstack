import { MigrationInterface, QueryRunner } from "typeorm";

export class UserInitial1633184312335 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE Users (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        email VARCHAR(50),
        created_at TIMESTAMP,
        updated_at TIMESTAMP
        )`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `Drop table 'Users'`
    )
  }

}
