# Composing a Docker Compose File

In order to have a test DB use the `docker-compose.yml` file to compose up a test and dev db for development and Testing respectively.

## Command to Run

Please run `docker compose up dev-db -d` for the dev db and `docker compose up test-db -d` for the  test db.

## Unit Testing

We would be using `supertest` and`jest` for unit testing.