create table customers (
	id int not null auto_increment PRIMARY KEY,
	reference_number varchar(5) not null,
	business_name varchar(50) not null,
	nature_of_business varchar(50) not null,
	contact_person varchar(50) not null,
	email_address varchar(50) not null,
	archived boolean not null default false
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

create table statuses (
	id int not null auto_increment PRIMARY KEY,
	status varchar(50) not null unique,
	description text not null,
	archived boolean not null default false
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

create table customers_status (
	customers_id int not null,
	status_id int not null,
	archived boolean not null default false,
	FOREIGN KEY(customers_id) REFERENCES customers(id),
	FOREIGN KEY(status_id) REFERENCES statuses(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

create table profile (
	id int not null auto_increment PRIMARY KEY,
	first_name varchar(50) not null,
	middle_name varchar(50) not null,
	last_name varchar(50) not null
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

create table accounts (
	profile_id int not null, 
  	username varchar(50),
  	password varchar(50),
  	PRIMARY KEY (username),
  	FOREIGN KEY(profile_id) REFERENCES profile(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

create table users_sessions (
	id int not null auto_increment PRIMARY KEY,
  	profile_id int not null REFERENCES profile(id),
  	auth_token text not null,
  	expiration_date datetime not null default CURRENT_TIMESTAMP,
  	FOREIGN KEY(profile_id) REFERENCES profile(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

create table permissions (
	profile_id int not null,
	name varchar(50) not null
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
#alter table users_permissions add unique(profile_id, name);

create table contents (
	id int not null auto_increment PRIMARY KEY,
	name varchar(50) not null UNIQUE,
  	details text not null,
  	field_type varchar(50) not null,
  	archived boolean default false
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

create table contents_logs (
	id int not null auto_increment PRIMARY KEY,
	contents_id int not null,
	log text not null,
  	date_created datetime default CURRENT_TIMESTAMP,
  	created_by int not null,
  	FOREIGN KEY(contents_id) REFERENCES contents(id),
  	FOREIGN KEY(created_by) REFERENCES profile(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

create table contents_drafts (
	id int not null auto_increment PRIMARY KEY,
	contents_id int not null,
	name varchar(50) not null,
	details text not null,
  	date_created datetime default CURRENT_TIMESTAMP,
  	created_by int not null,
  	FOREIGN KEY(contents_id) REFERENCES contents(id),
  	FOREIGN KEY(created_by) REFERENCES profile(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;