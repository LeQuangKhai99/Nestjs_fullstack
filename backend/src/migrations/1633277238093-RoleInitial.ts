import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleInitial1633277238093 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`
			CREATE TABLE role (
				id int NOT NULL,
				name varchar(255) NOT NULL,
				created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
				updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
			);
			`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
		`
			drop table role
		`
		);
	}

}
