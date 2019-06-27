/*
drop table databasechangeloglock;
drop table databasechangelog;
drop table user_role;
drop table role;
drop table "user";
drop table learning_outcome;
drop table chapter;
drop table class;
drop table subject;
*/
/*bcrypt hash iit123 = $2a$04$0InJLBtHycrrZd5jmnFBQus3ARSh6wusPEOsdFwHR2zPRGmKxmuja */

/*

insert into users (email, password, first_name, last_name, permanent_address, temp_address,
                    birth_date, join_date, eiin_number)
                     values ('sahashaishab@gmail.com', '$2a$04$0InJLBtHycrrZd5jmnFBQus3ARSh6wusPEOsdFwHR2zPRGmKxmuja', 'Shaishab', 'Saha','','',null, now(), null);

insert into role (name) values ('ADMIN');
insert into role (name) values ('TEACHER');
insert into role (name) values ('MODERATOR');
insert into role (name) values ('HEADMASTER');

*/
--insert into user_role (user_id, role_id) values (1,1);

