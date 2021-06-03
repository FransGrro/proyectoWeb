create database proyecto;
use proyecto;

create table PERSONAL(
	per_id int not null auto_increment,
    per_nombre varchar(50) not null,
    per_apellidos varchar(80) not null,
    per_telefono varchar(10),
    per_direccion varchar(150),
    primary key(per_id)
);

create table CATEGORIAS(
	cat_id int not null auto_increment,
    cat_nombre varchar(50) not null,
    primary key(cat_id)
);

create table TICKETS(
	tic_id int not null auto_increment,
	tic_nombre varchar(50) not null,
    tic_desc varchar(100),
    tic_prio varchar(1) not null,
	per_id int not null,
    cat_id int not null,
	tic_status  varchar(3) not null,
    primary key(tic_id),
    foreign key (per_id) references personal(per_id),
    foreign key (cat_id) references categorias(cat_id)
);