#!/bin/sh

echo 'Executing migrations...'
npx typeorm migration:run -d ./dist/src/database/data-source.js
echo 'Migrations up to date'

echo 'Starting server...'
npm run start:dev
