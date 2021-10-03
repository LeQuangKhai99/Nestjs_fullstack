import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactor1633278869312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `     
              ALTER TABLE users
              ADD PRIMARY KEY (id),
              ADD KEY FK_c28e52f758e7bbc53828db92194 (roleId);
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
