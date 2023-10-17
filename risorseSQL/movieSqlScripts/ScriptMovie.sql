
drop database	if exists MovieDB;

CREATE DATABASE MovieDB;

use MovieDB;

CREATE TABLE Genre 
(	
	id integer primary KEY AUTO_INCREMENT, 	
	name VARCHAR(20) unique	not null
);

INSERT INTO Genre (id, name)
VALUES
	(01,"Animazione"),
	(02,"Avventura"),
	(03,"Commedia"),
	(04,"Drammatico"),
	(05,"Azione"),
	(07,"Giallo"),
	(08,"Fantascienza"),
	(09,"Poliziesco"),
	(10,"Documentario"),
	(11,"Horror"),
	(12,"Guerra");

CREATE TABLE Actor 
(	
	id integer primary KEY AUTO_INCREMENT, 
	FirstName VARCHAR(30) not null,
	LastName VARCHAR(30) not null,
	BirthDate date,
	Nationality VARCHAR(30),
	UNIQUE(FirstName, LastName, BirthDate)
);

CREATE TABLE Director 
(	
	id integer primary KEY AUTO_INCREMENT, 
	FirstName VARCHAR(30) not null,
	LastName VARCHAR(30) not null,
	BirthDate date,
	Nationality VARCHAR(30),
	UNIQUE(FirstName, LastName, Nationality, BirthDate)
);

CREATE TABLE Movie 
(	
	Id integer primary key AUTO_INCREMENT, 
	GenreId integer,
	Title varchar(50) not null unique,
	ReleaseYear smallint,
		CONSTRAINT chk_Year CHECK (ReleaseYear >= 1888),
	Rating decimal(2,1)
		CONSTRAINT chk_Rating CHECK (Rating >= 0.0 and Rating <= 10.0),
	Length numeric(3)
		CONSTRAINT chk_Length CHECK (Length > 0),
	Plot varchar(500),
	FOREIGN KEY(GenreId) REFERENCES Genre (id)
		ON DELETE set null
		ON UPDATE cascade
);

CREATE TABLE Movie_Director 
(	
	Movie_ID integer, 
	Director_ID integer,
	primary key (Movie_ID, Director_ID)
	FOREIGN KEY(Movie_ID) REFERENCES Movie (Id)
		ON DELETE cascade
		ON UPDATE cascade,
	FOREIGN KEY(Director_ID) REFERENCES Director (id)
		ON DELETE cascade
		ON UPDATE cascade	
);

CREATE TABLE Movie_Actor
(	
	Movie_ID integer,
	Actor_ID integer,
	primary key (Movie_ID, Actor_ID)
	FOREIGN KEY (Movie_ID) references Movie (Id)
		ON DELETE
		ON UPDATE ,
	FOREIGN KEY (Actor_ID) references Actor (id)
		ON DELETE
		ON UPDATE
);

/* importare i dati dal file actor.csv nella tabella Actor*/
/* importare i dati dal file director.csv nella tabella Director*/
/* importare i dati dal file Movie.csv nella tabella Movie*/                                                                        
/* importare i dati dal file Movie_Director.csv nella tabella Movie_Director*/
/* importare i dati dal file Movie_Actor.csv nella tabella Movie_Actor*/



