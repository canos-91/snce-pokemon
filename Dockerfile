# Creates app directory and installs dependencies
FROM    node:18-alpine AS dependencies

ARG     user=nextjs
ARG     group=nodejs
ARG     usergroup=${user}:${group}
RUN     adduser -u 1001 -S ${user}
RUN     addgroup -g 1001 -S ${group}

RUN     apk add --no-cache libc6-compat
RUN     mkdir -p /next-app

WORKDIR /next-app

COPY    package*.json /next-app/

RUN     npm ci 

# Copies file into app directory and builds the app
FROM    node:18-alpine AS build

WORKDIR /next-app
COPY    --from=dependencies /next-app/node_modules ./node_modules
COPY    --chown=${usergroup} . .

ENV     NEXT_TELEMETRY_DISABLED 1

RUN     npx prisma generate
RUN     npm run build

# Copies files from build stage and runs the application
FROM    node:18-alpine AS run

WORKDIR /next-app

COPY    --from=build  /next-app/public ./public
COPY    --from=build  /next-app/package.json ./package.json
COPY    --from=build  /next-app/node_modules ./node_modules
COPY    --from=build  /next-app/.next ./.next

USER    ${user}

EXPOSE  3000

ENTRYPOINT [ "npm", "run"]