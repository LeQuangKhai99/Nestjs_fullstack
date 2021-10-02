import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactor1633194692144 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE Users CHANGE updated_at updated_at TIMESTAMP on update CURRENT_TIMESTAMP NULL DEFAULT NULL;`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE Users CHANGE updated_at updated_at TIMESTAMP NULL DEFAULT NULL;`
    )
  }

}
