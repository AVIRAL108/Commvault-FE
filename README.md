### CRUD UI

##### Deployment

- Add .htaccess file inside the build folder.

```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

```

- Restart the appache services.

```
  a2enmod rewrite && sudo service apache2 restart
```
