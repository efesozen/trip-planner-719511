import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateTripshareTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trip_shares',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'trip_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'trip_shares',
      new TableForeignKey({
        name: 'fk_trip_shares_trip_id',
        columnNames: ['trip_id'],
        referencedTableName: 'trips',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'trip_shares',
      new TableForeignKey({
        name: 'fk_trip_shares_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'trip_shares',
      new TableIndex({
        name: 'idx_trip_shares_trip_id',
        columnNames: ['trip_id'],
      })
    );

    await queryRunner.createIndex(
      'trip_shares',
      new TableIndex({
        name: 'idx_trip_shares_trip_id',
        columnNames: ['trip_id'],
      })
    );

    await queryRunner.createIndex(
      'trip_shares',
      new TableIndex({
        name: 'idx_trip_shares_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'trip_shares',
      new TableIndex({
        name: 'idx_trip_shares_user_id',
        columnNames: ['user_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('trip_shares', 'idx_trip_shares_trip_id');
    await queryRunner.dropIndex('trip_shares', 'idx_trip_shares_user_id');
    await queryRunner.dropForeignKey('trip_shares', 'fk_trip_shares_trip_id');
    await queryRunner.dropForeignKey('trip_shares', 'fk_trip_shares_user_id');
    await queryRunner.dropTable('trip_shares');
  }
}
