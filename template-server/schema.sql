CREATE TABLE Prices (
    id varchar(32) NOT NULL,
    type varchar(16),
    price int,
    currency varchar(4) NOT NULL,
    amount int,
    path varchar(16) NOT NULL
);
CREATE TABLE Flyers (
    id varchar(32) NOT NULL,
    href TEXT NOT NULL
);
-- CREATE TABLE Paths (
--     component varchar(32) NOT NULL,
--     path: varchar(32) NOT NULL
-- );

INSERT INTO Prices(id,type,price,currency,amount,path) VALUES ('example1','Repair',1200,'rub',1,'first-help'),('example2','Repair',120,'rub',1,'first-help');
-- INSERT INTO Paths(component,path) values ('Home','home'),('Cart','cart'),('FirstHelp','first-help'),('LaptopRepair','laptop-repair'),('PhoneRepair','phone-repair'));