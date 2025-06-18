# Summary
This repo seeds a database for a news server. 


# Instructions
How to clone the repo:
- Create your own fork
- Use the <> Code button to access your forked repo's URL
- Navigate to the folder you'd like to clone this repo into, and run 'git clone' followed by your repo's URL

How to install dependencies:
- First run 'npm install'
- You'll also need the following dependencies:
    - pg, express & dotenv
- And the following dev dependencies:
    - jest, nodemon & supertest


How to seed your local database: 
- To create a test and development database, run the command 'npm run setup-dbs'
- You can connect to the test database by running 'npm run test-seed'
- You can connect to the development database by running 'npm run seed-dev'

How to run tests:
- To run tests, simply run the command 'npm test'
- The tests have been separated into app, seed and utils files,  so you can test specific parts of the repo if you please.

How to create your environment variables:

- In the root folder of this repo, create a .env.development file and a .env.test file
- To each file, add 'PGDATABASE=' followed by the name of the relevant database in order to connect to each database locally.
(We'd normally not share the names of databases, but we're sharing them here so that you can play around with your own versions).
- The development database name is nc_news
- The test database name is nc_news_test
