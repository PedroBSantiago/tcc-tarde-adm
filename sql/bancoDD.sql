create database db_explorarmais;
use db_explorarmais;

create table tb_user (
id_user int auto_increment primary key not null,
nm_user varchar(110) not null,
nm_email varchar(110) not null,
nr_senha varchar(20) not null
);

