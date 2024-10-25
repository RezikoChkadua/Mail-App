# Getting Started Project

This project involves developing an email application utilizing React.js for the front-end,
Node.js for the back-end, and PostgreSQL as the database.

## Architecture

This project is structured as a monorepo and utilizes Yarn workspaces to manage dependencies and two primary apps: the frontend and backend

### `How to start a project`

set up the `database`, ensure that port `5432` is available, as it is required for PostgreSQL. Run the following command to start the database container in detached mode: `docker compose up -d`

it's needed to populate `.env` file in the backend, it's basicaly Aws credentials to use S3.

After starting the database, you can launch the application by running the following command from the root directory of the monorepo
`yarn start`

This command uses the `concurrently` package to run both the frontend and backend,

## Room For Improvement

Node: In a backend architecture `controllers` are utilized to enhance request validation, while `services` are implemented to facilitate improved testing methodologies and `buisness logic`, to further optimize testing and maintainability, the integration of dependency injection (DI) frameworks is recommended.

React: The frontend architecture is organized into distinct modules located within the `Page` folder, Shared components are in a `component` folder,
`tables`, `modals`, and `pagination` be designed as single reusable components as well.

Packages: Linting dependencies can be set into shared packages.

Dockerize backend and frontend apps as well,

We would need to change `environment` variables for postgress, but for testing purposes it is hard coded for time being
