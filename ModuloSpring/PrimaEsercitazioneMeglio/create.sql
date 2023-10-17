
    create table book (
        id integer not null auto_increment,
        isbn varchar(13) not null,
        title varchar(500) not null,
        author varchar(255),
        description varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table book_reader (
        book_id integer not null,
        reader_id integer not null,
        primary key (book_id, reader_id)
    ) engine=InnoDB;

    create table reader (
        id integer not null auto_increment,
        name varchar(255),
        primary key (id)
    ) engine=InnoDB;

    alter table book_reader 
       add constraint FKf2bsui16nlgapp4v78oshrxrd 
       foreign key (book_id) 
       references book (id) 
       on delete cascade;

    alter table book_reader 
       add constraint FKgsnjdow3tqmxwsiefh1dc90ph 
       foreign key (reader_id) 
       references reader (id) 
       on delete cascade;
