## Next js +Docker + Prisma

This repo create a next js app using docker.

***
####  Follow this guide

1. Install docker on your machine

2. Create Docker compose.yml file 
```yml
services:
  postgres:
    image: postgres:14-alpine
    ports:
      - "555:5432"
    environment:
      POSTGRES_PASSWORD: "1234"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: unless-stopped
   
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    image: ghcr.io/shemaikuzwe/next-docker/next-demo:latest
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

volumes:
  postgres-data:

```

3. Then run ` docker compose up -d` to open in detached mode

4. Navigate to [localhost:3000]()
5. Check this repo to see both dev and prod Dockerfiles and their compose.yml

***
The Goal of this repo is to make it simple to create Docker images for Next js Projects.🤩🤩🤩
