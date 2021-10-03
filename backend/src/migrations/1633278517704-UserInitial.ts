import {MigrationInterface, QueryRunner} from "typeorm";

export class UserInitial1633278517704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE users (
                id int NOT NULL,
                email varchar(255) NOT NULL,
                username varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                avatar varchar(255) NOT NULL,
                active tinyint NOT NULL DEFAULT '0',
                token varchar(255) DEFAULT NULL,
                created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                roleId int DEFAULT NULL
              );
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
