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
CREATE TABLE SessionExpiration (
    login varchar(32) NOT NULL,
    confirmationId varchar(32) NOT NULL,
    created Int NOT NULL
);

SET GLOBAL event_scheduler = ON;
DROP EVENT clearSessions;

DELIMITER $$
CREATE EVENT IF NOT EXISTS `service`.`clearSessions`
ON SCHEDULE
    EVERY 3 HOUR
COMMENT 'Clear unconfirmed sessions'
DO
    BEGIN
    
        DELETE FROM SessionExpiration WHERE created<(UNIX_TIMESTAMP() - 86400);
        DELETE FROM Users WHERE active=0;

    END $$
DELIMITER ;


INSERT INTO ServiceDescriptions(id,language,name,description) VALUES ('example1','ru-RU','Example1','Диагностика'),('example2','ru-RU','Example1','Ремонт');
INSERT INTO FlyerDescriptions(id,language,title,text) VALUES ('example1','ru-RU','Направление 1','RU Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),('example2','ru-RU','Направление 2','RU Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO Prices(id,type,price,currency,amount,path) VALUES ('example1','Repair',1200,'rub',1,'first-help'),('example2','Repair',120,'rub',1,'first-help');
INSERT INTO Flyers(id,href) VALUES ('example1','laptop-repair'),('example2','phone-repair');
INSERT INTO Paths(component,path) values ('Home','home'),('Cart','cart'),('FirstHelp','first-help'),('LaptopRepair','laptop-repair'),('PhoneRepair','phone-repair');
INSERT INTO Paths(component,path) values ('adminPanel','admin');
INSERT INTO AccessList(path,groupid) values ('home','user'),('cart','user'),('first-help','user'),('laptop-repair','user'),('phone-repair','user');
INSERT INTO AccessList(path,groupid) values ('admin','admin');