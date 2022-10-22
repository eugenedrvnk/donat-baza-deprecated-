import { Column, HasMany, Table, Model } from "sequelize-typescript";
import { AuthRecordModel } from "src/auth/auth-record.entity";

@Table
export class UserModel extends Model {
  @Column
  username: string;

  @HasMany(() => AuthRecordModel)
  authRecords: AuthRecordModel[];
}