# SNCE POKEMON APP

This is a test project developed for S'nce Group.

This is a Next.js project in a Dockerised environment.

Three services are run by Docker: Next.js app with Prisma ORM,
local MySQL database, NginX proxy server

The docker-compose script builds and runs the services from Dockerfile
The Dockerfile are multi-stage builds optimized to cache dependencies

## Requirements

- Docker
- Node.js and NPM package manager
- A few GB of available space
- Internet connection

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
Make a '.env.example' copy on root folder and rename it to '.env'

Set DB_PASSWORD field in .env file to 'root'

```bash
DB_PASSWORD=root
DB_USER=root
```

## Run Locally

Please note that bash command could differ depending on your OS, so they will be astracted
Open a terminal in root folder and install dependencies with npm package manager, then run Docker script:

```bash
npm install

docker-compose up
# or, to run in background
docker-compose up -d
```

## Migrations

When the script is done, open a new terminal in the root folder and enter the Next.js container to run migrations:

```bash
# enter container
docker exec -it snce-pokemon-app sh

# run migrations
npx prisma migrate dev

#run seeder
npx prisma db seed
```

Now you can access the app with your browser on [http://localhost:3000](http://localhost:3000)

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api](http://localhost:3000/api) with HTTP requests

## Additional actions

Some useful actions to perform if needed:

```bash
# From inside Next.js container

# reset migrations
npx prisma migrate reset


# From root folder

#Stop containers
docker-compose down

#Rebuild images
docker-compose build

# Remove docker volumes
npm clean
```

## Author

- [@marcocanopoli](https://www.github.com/marcocanopoli)
