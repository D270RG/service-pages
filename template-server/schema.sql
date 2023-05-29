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
-- CREATE TABLE TabTitles (
--     path varchar(32) NOT NULL,
--     language varchar(8) NOT NULL,
--     title TEXT NOT NULL
-- );
-- CREATE TABLE TabsPageTitles (
--     path varchar(32) NOT NULL,
--     language varchar(8) NOT NULL,
--     id varchar(32) NOT NULL,
--     pageTitle TEXT NOT NULL
-- );
-- CREATE TABLE TabsPageTexts (
--     path varchar(32) NOT NULL,
--     language varchar(8) NOT NULL,
--     id varchar(32) NOT NULL,
--     pageText TEXT NOT NULL
-- );
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
    groupid varchar(16) NOT NULL --admin, user
)
-- CREATE TABLE Paths (
--     component varchar(32) NOT NULL,
--     path: varchar(32) NOT NULL
-- );
CREATE TABLE Sessions {
    login varchar(254) NOT NULL,
    sessionId varchar(32) NOT NULL
}
INSERT INTO ServiceDescriptions(id,language,name,description) VALUES ('example1','ru-RU','Example1','Диагностика'),('example2','ru-RU','Example1','Ремонт');
-- INSERT INTO TabTitles(path,language,title) VALUES ('home','ru-RU','Домой'),('first-help','ru-RU','Первая помощь'),('laptop-repair','ru-RU','Ремонт ноутбука'),('phone-repair','ru-RU','Ремонт телефона'),('cart','ru-RU','Корзина');
-- INSERT INTO TabsPageTexts(path,language,id,pageText) VALUES ('cart','ru-RU','isEmpty','Корзина пуста');
INSERT INTO FlyerDescriptions(id,language,title,text) VALUES ('example1','ru-RU','Направление 1','RU Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),('example2','ru-RU','Направление 2','RU Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO Prices(id,type,price,currency,amount,path) VALUES ('example1','Repair',1200,'rub',1,'first-help'),('example2','Repair',120,'rub',1,'first-help');
INSERT INTO Flyers(id,href) VALUES ('example1','laptop-repair'),('example2','phone-repair');
-- INSERT INTO Paths(component,path) values ('Home','home'),('Cart','cart'),('FirstHelp','first-help'),('LaptopRepair','laptop-repair'),('PhoneRepair','phone-repair'));