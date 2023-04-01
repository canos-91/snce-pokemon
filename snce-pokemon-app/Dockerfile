# Creates app directory and installs dependencies
FROM node:18-alpine AS dependencies

RUN mkdir -p /app

WORKDIR /app
COPY package*.json /app
COPY prisma /app/prisma/

RUN  npm install

# Copies file into app directory and builds the app
FROM node:18-alpine AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

# Copies files from build stage and runs the application
FROM node:18-alpine AS run

WORKDIR /app

# ENV NODE_ENV production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=build --chown=nextjs:nodejs /app/.next ./.next

COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma

# USER node

EXPOSE 3000

# ENV PORT 3000

CMD [ "npm", "run", "migrate:dev" ]