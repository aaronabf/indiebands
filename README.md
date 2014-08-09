Indie Bands: Real or Fake?
========

A small web app game to determine if a band is real or fake.

To set up the database run from the git repository directory (change _db_name_):

```
mysql -uroot db_name < database-data/database-setup.sql
mysql -uroot db_name < database-data/formatted-insert.sql
```

Note: the database login information will have to be updated in `main.php`
