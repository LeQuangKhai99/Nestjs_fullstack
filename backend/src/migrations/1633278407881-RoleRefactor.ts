import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleRefactor1633278407881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            ALTER TABLE role MODIFY id int NOT NULL AUTO_INCREMENT;
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
