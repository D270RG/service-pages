CREATE TABLE Prices (
    id varchar(32) NOT NULL,
    type varchar(16),
    price int,
    currency varchar(4) NOT NULL,
    amount int,
    path varchar(16) NOT NULL
);
CREATE TABLE ServiceDescriptions (
    id varchar(32) NOT NULL,
    language varchar(8) NOT NULL,
    name TEXT NOT NULL,
    description TEXT
);
CREATE TABLE FlyerDescriptions (
    id varchar(32) NOT NULL,
    language varchar(8) NOT NULL,
    title TEXT,
    text TEXT
);
CREATE TABLE Flyers (
    id varchar(32) NOT NULL,
    href TEXT NOT NULL
);
CREATE TABLE Users (
    login varchar(254) NOT NULL,
    password varchar(132) NOT NULL,
    salt varchar(16) NOT NULL,
    groupid varchar(16) NOT NULL, 
    active int
);
CREATE TABLE Paths (
    component varchar(32) NOT NULL,
    path varchar(32) NOT NULL
);
CREATE TABLE AccessList (
    path varchar(32) NOT NULL,
    groupid varchar(16) NOT NULL
);
CREATE TABLE Sessions (
    login varchar(254) NOT NULL,
    sessionId varchar(32) NOT NULL
);

INSERT INTO ServiceDescriptions(id,language,name,description) VALUES ('example1','ru-RU','Example1','Диагностика'),('example2','ru-RU','Example1','Ремонт');
INSERT INTO FlyerDescriptions(id,language,title,text) VALUES ('example1','ru-RU','Направление 1','RU Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),('example2','ru-RU','Направление 2','RU Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO Prices(id,type,price,currency,amount,path) VALUES ('example1','Repair',1200,'rub',1,'first-help'),('example2','Repair',120,'rub',1,'first-help');
INSERT INTO Flyers(id,href) VALUES ('example1','home'),('example2','home');
INSERT INTO Paths(component,path) values ('Home','home'),('Cart','cart'),('FirstHelp','first-help'),('LaptopRepair','laptop-repair'),('PhoneRepair','phone-repair');
INSERT INTO Paths(component,path) values ('adminPanel','admin');
INSERT INTO AccessList(path,groupid) values ('home','user'),('cart','user'),('first-help','user'),('laptop-repair','user'),('phone-repair','user');
INSERT INTO AccessList(path,groupid) values ('admin','admin');
INSERT INTO Users(login,password,salt,groupid,active) values ('d270rg@gmail.com','f7e9ab78966ec2846b0b76246a02262067291a4eedeff4d53df3d7e31da0fee778645661ca0320f2304ea45b24afc95bd94713806c90a17ac79210007c559b94','7a301ab4f8238498','admin',0);
