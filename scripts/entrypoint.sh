#!/usr/bin/env bash

echo "Installing dependencies"
npm install

exec "$@"
