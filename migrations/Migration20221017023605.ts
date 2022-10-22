import { Migration } from '@mikro-orm/migrations';

export class Migration20221017023605 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `auth-record` (`id` int unsigned not null auto_increment primary key, `user_id` int unsigned not null, `access_token` varchar(255) not null, `refresh_token` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `auth-record` add index `auth-record_user_id_index`(`user_id`);');

    this.addSql('alter table `auth-record` add constraint `auth-record_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `auth-record`;');
  }

}
