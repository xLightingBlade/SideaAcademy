
    create table book (
        id integer not null auto_increment,
        isbn varchar(13),
        title varchar(500) not null,
        author varchar(255),
        description varchar(255),
        reader varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    alter table book 
       add constraint UKm1tw6kknb2vhdygbn5fuqc28t unique (reader, isbn);
