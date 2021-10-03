import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactor1633278874899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `     
              ALTER TABLE users
              ADD CONSTRAINT FK_c28e52f758e7bbc53828db92194 FOREIGN KEY (roleId) REFERENCES role (id);
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
