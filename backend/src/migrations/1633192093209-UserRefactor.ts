import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactor1633192093209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
    `ALTER TABLE Users CHANGE created_at created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP;`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE Users CHANGE created_at created_at TIMESTAMP NULL DEFAULT NULL;`
    )
  }

}
