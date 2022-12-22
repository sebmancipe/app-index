#!/bin/sh

# bcrypt (hashing library) has OS requirements to be met, so we just avoid OS interoperability by installing it directly
# uninstall the current bcrypt modules
npm uninstall bcrypt

# install the bcrypt modules for the machine
npm install bcrypt

echo 'Executing migrations...'
npx typeorm migration:run -d ./dist/src/database/data-source.js
echo 'Migrations up to date'

echo 'Executing project'
npm run start