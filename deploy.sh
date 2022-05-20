#!/bin/bash

cd /root/koneksys

git reset --hard

git pull origin development

yarn install
yarn build

pm2 describe koneksys-backend > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start ./pm2-config.json
else
  pm2 restart koneksys-backend
fi;
