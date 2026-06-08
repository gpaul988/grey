#!/bin/bash
cd /home/user/grey
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=2048"
exec npx tsx server.ts
