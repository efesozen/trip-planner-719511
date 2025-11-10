import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateFeedbackTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feedbacks',
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
            name: 'rating',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'comment',
            type: 'varchar',
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
      'feedbacks',
      new TableForeignKey({
        name: 'fk_feedbacks_trip_id',
        columnNames: ['trip_id'],
        referencedTableName: 'trips',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'feedbacks',
      new TableForeignKey({
        name: 'fk_feedbacks_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'feedbacks',
      new TableIndex({
        name: 'idx_feedbacks_trip_id',
        columnNames: ['trip_id'],
      })
    );

    await queryRunner.createIndex(
      'feedbacks',
      new TableIndex({
        name: 'idx_feedbacks_trip_id',
        columnNames: ['trip_id'],
      })
    );

    await queryRunner.createIndex(
      'feedbacks',
      new TableIndex({
        name: 'idx_feedbacks_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'feedbacks',
      new TableIndex({
        name: 'idx_feedbacks_user_id',
        columnNames: ['user_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('feedbacks', 'idx_feedbacks_trip_id');
    await queryRunner.dropIndex('feedbacks', 'idx_feedbacks_user_id');
    await queryRunner.dropForeignKey('feedbacks', 'fk_feedbacks_trip_id');
    await queryRunner.dropForeignKey('feedbacks', 'fk_feedbacks_user_id');
    await queryRunner.dropTable('feedbacks');
  }
}
