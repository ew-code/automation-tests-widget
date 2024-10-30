
# Widget Tests

Automated tests for the Tidio widget, built with Playwright and TypeScript. Follow these instructions to clone the project, set up the environment, and run tests locally or within Docker.

## Prerequisites

- Node.js and npm
- Docker (optional, to run tests in a container)

## Task Execution Steps

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/gonerczyk/widget-tests.git
cd widget-tests
```

### 2. Prepare Environment Variables

Copy the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

Update the `BASE_URL` variable in the `.env` file to point to Tidio’s main URL.

> **Optional**: If environment variable management is required, install `dotenv` as a development dependency:

```bash
npm i -D dotenv
```

### 3. Install Dependencies

Install the `yarn` package manager if you don’t already have it:

```bash
npm install -g yarn
```

Then, install project dependencies and the required browsers for Playwright:

```bash
yarn
yarn playwright install
```

### 4. Install Faker.js Library

To generate fake data in tests, the `@faker-js/faker` library has been installed as a development dependency. You can install it with the following command:

```bash
npm install --save-dev @faker-js/faker
```

This library helps generate random data, such as names, emails, and addresses, which can be useful for testing various input fields and scenarios.

### 5. Implement and Refactor Tests

- Create page objects using the Page Object Model (POM) and add the first test.
- Refactor the tests to improve readability and modularity.

### 6. Docker

If you'd like to run the tests in a Docker container, follow these steps:

1. Ensure Docker is installed and running.
2. Build the Docker image using the provided `Dockerfile`:

   ```bash
   docker build --progress=plain -t playwright:1.48.1 .
   ```

3. Run the tests in the container:

   ```bash
   docker run --rm playwright:1.48.1
   ```

> The `docker run --rm` command executes the container once and automatically removes it after completion.

---
