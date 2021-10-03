import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactor1633278872529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `     
              ALTER TABLE users
              MODIFY id int NOT NULL AUTO_INCREMENT;
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
