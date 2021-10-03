import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleRefactor1633278201123 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`
			ALTER TABLE role ADD PRIMARY KEY (id);
			`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
