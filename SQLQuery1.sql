create database cookhire

use cookhire

create table Login(id int primary key identity(1,1), email varchar(30), password varchar(30), username varchar(30), mobileNumber varchar(10), userRole varchar(10));
select *from Login;

CREATE TABLE Jobs(
jobId int primary key identity(1,1),
jobDescription varchar(255),
jobLocation varchar(255),
fromDate date,
toDate date,
wagePerDay varchar(255),
jobPhone varchar(10)
);
select *from Jobs;





CREATE TABLE Jobseekers(
id int primary key identity(1,1),
jobDescription varchar(255),
jobLocation varchar(255),
fromDate date,
toDate date,
wagePerDay varchar(255),
jobPhone varchar(10),
personName varchar(255),
personAddress varchar(255),
personExp varchar(255),
personPhone varchar(255),
personEmail varchar(255),
stat varchar(10)
);



select *from Jobseekers;









