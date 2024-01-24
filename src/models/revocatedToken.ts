import { Column, DataType, Model, Table, PrimaryKey, CreatedAt } from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'revocated_tokens' })
export class RevocatedTokens extends Model<RevocatedTokens> {
	@PrimaryKey
	@Column({
		type: DataType.TEXT,
		primaryKey: true,
        allowNull: false,
		unique: true
	})
	public token: string;

	@CreatedAt
	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	created_at: Date;
}