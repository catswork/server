drop database if exists cats_work;
create database cats_work;

use cats_work;

create table users (
	id int auto_increment,
	email varchar(300),
	access_token varchar(255),
	refresh_token varchar(255),
	primary key (id)
);
