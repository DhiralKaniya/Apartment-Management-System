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