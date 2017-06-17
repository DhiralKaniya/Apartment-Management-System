//Role TABLE
CREATE TABLE tbl_role(
	id SERIAL primary key,
	role varchar(20)
);

//API table
CREATE TABLE tbl_api (
	apiid SERIAL primary key,
	username varchar(20),
	apikey varchar(100)
);

//User table
CREATE TABLE tbl_user(
	userid SERIAL primary key,
	username varchar(200) not null,
	pin integer not null,
	firstname varchar(100) not null,
	lastname varchar(100),
	contact1 varchar(100) not null,
	contact2 varchar(100),
	gender varchar(6),
	no_of_mem integer,
	flat_no varchar,
	isactive boolean,
	validtoken varchar
);
-Modifications
	ALTER TABLE tbl_user ADD COLUMN email varchar(100)

	*Insert Query
	-INSERT INTO tbl_user(username,pin,firstname,lastname,contact1,contact2,gender,no_of_mem,flat_no,isactive,validtoken,email) values('dhiral',5555,'Dhiral','Kaniya','9033250554','','male',5,'A-101',true,'helloworld','dhiralkaniya3146@gmail.com')


//User-role table
CREATE TABLE tbl_user_role(
	userid integer references tbl_user(userid) ON DELETE CASCADE,
	roleid integer references tbl_role(id) ON DELETE CASCADE ,
	PRIMARY KEY(userid,roleid)
);

//Secretary-table
CREATE TABLE tbl_secretary(
	secretaryid SERIAL primary key,
	PIN integer NOT NULL,
	apartmentname varchar(100),
	secretaryname varchar(100)
);

//Group-table
CREATE TABLE tbl_group(
	groupid SERIAL primary key,
	groupname varchar(100)
);

//Group-role-user
CREATE TABLE tbl_user_secretary_group(
	userid integer REFERENCES tbl_user,
	secretaryid integer REFERENCES tbl_secretary,
	groupid integer REFERENCES tbl_group
);
