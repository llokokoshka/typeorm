# Awesome Project Build with TypeORM

Steps to run this project:

1. Cloning a repository
`git clone https://github.com/llokokoshka/typeorm.git`

2. Go to the project directory:
`cd typeorm`

2. Installing dependencies:
`npm install`

3. Setting up a database. Create a new database:
`createdb my_database`

Set up the database connection by creating a .env file in the root of the project.Example file:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=my_database
TOKEN_SECRET=your_secret_key

4. Launching migrations:
`npm run typeorm migration:run`

5. Run `npm run start` command

The application will be launched by default on http://localhost:3000.

6. Test API. You can use Postman for testing API.
