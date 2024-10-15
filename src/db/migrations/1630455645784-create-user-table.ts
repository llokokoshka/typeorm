import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserTable1630455645784 implements MigrationInterface {
    name = 'createUserTable1630455645784';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "fullName" character varying NOT NULL,
                "email" character varying NOT NULL UNIQUE,
                "password" character varying NOT NULL,
                "Dob" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_a3c7f8a2ef0e1384de9f41ccf7a" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }
}
