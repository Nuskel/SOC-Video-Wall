nvm use 16.10.0
npm run build
rm -r /var/www/html/*
cp -r dist/videowall/* /var/www/html
systemctl restart apache2.service

