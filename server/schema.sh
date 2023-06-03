#!/bin/sh
echo "ENTER DATABASE NAME:"
read dbname
echo "ENTER DATABASE USERNAME:"
read dbuser
echo "ENTER DATABASE PASSWORD:"
read dbpassword
mysql --user=$dbuser --password=$dbpassword --execute="create database $dbname";
mysql --user=$dbuser --password=$dbpassword $dbname < schema.sql;