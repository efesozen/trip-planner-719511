import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateItineraryTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'itineraries',
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
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'activities',
            type: 'jsonb',
            isNullable: true,
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
      'itineraries',
      new TableForeignKey({
        name: 'fk_itineraries_trip_id',
        columnNames: ['trip_id'],
        referencedTableName: 'trips',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'itineraries',
      new TableIndex({
        name: 'idx_itineraries_trip_id',
        columnNames: ['trip_id'],
      })
    );

    await queryRunner.createIndex(
      'itineraries',
      new TableIndex({
        name: 'idx_itineraries_trip_id',
        columnNames: ['trip_id'],
      })
    );

    await queryRunner.createIndex(
      'itineraries',
      new TableIndex({
        name: 'idx_itineraries_date',
        columnNames: ['date'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('itineraries', 'idx_itineraries_trip_id');
    await queryRunner.dropIndex('itineraries', 'idx_itineraries_date');
    await queryRunner.dropForeignKey('itineraries', 'fk_itineraries_trip_id');
    await queryRunner.dropTable('itineraries');
  }
}
