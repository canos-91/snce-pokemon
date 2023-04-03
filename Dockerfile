# Creates app directory and installs dependencies
FROM node:18-alpine AS dependencies

RUN mkdir -p /next-app

WORKDIR /next-app
COPY package*.json /next-app
COPY prisma /next-app/prisma/

RUN  npm install

# Copies file into app directory and builds the app
FROM node:18-alpine AS build

WORKDIR /next-app
COPY --from=dependencies /next-app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

# Copies files from build stage and runs the application
FROM node:18-alpine AS run

WORKDIR /next-app

# ENV NODE_ENV production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=build --chown=nextjs:nodejs /next-app/.next ./.next

COPY --from=build /next-app/next.config.js ./
COPY --from=build /next-app/public ./public
COPY --from=build /next-app/package.json ./package.json
COPY --from=build /next-app/prisma ./prisma

# USER node

EXPOSE 3000

# ENV PORT 3000

CMD [ "npm", "run", "migrate:dev" ]