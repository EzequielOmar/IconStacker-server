import { Column, DataType, Model, Table, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, Unique, Min } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4,
		unique: true,
	})
	public id: string;

	@Unique({
		name: 'email',
		msg: 'Duplicated Email'
	})
	@Column({
		allowNull: false,
		type: DataType.STRING
	})
	public email: string;

    @Min(6)
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    public password: string;

	@Column({
		allowNull: true,
		type: DataType.STRING
	})
	public name: string;

	@Column({
		allowNull: true,
		type: DataType.STRING
	})
	public last_name: string;

	@Column({
		allowNull: false,
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	public is_verified: boolean;

	@CreatedAt
	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	created_at: Date;

	@UpdatedAt
	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	updated_at: Date;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		allowNull: true,
	})
	deleted_at?: Date;
}