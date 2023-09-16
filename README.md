# Tech_blog

Tech Blog is a content management system (CMS) for tech enthusiasts and developers to publish articles, blog posts, and share their thoughts and opinions in the tech world.

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Development](#development)

## Description

Tech Blog provides a platform for tech-savvy individuals to create, edit, and publish their articles. Users can register for an account, log in, and start sharing their knowledge with the community. They can also interact with other users' posts by leaving comments.

## Getting Started

To get started with the Tech Blog project, follow these steps:

1. Clone the repository:

   - bash:
     git clone https://github.com/yourusername/tech_blog.git

2. Install dependencies:

- bash:
  cd tech_blog
  npm install

3. Set up the database:

   Create a MySQL database and update the database configuration in the .env file.
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password

4. Run the application:

- bash:
  npm run develop

- Access the application:

Open your web browser and go to http://localhost:3000 to access the Tech Blog.

## Usage

- Visit the homepage to read articles and blog posts.
- Sign up or log in to create and manage your own posts.
- Leave comments on posts to engage with the community.

## Dependencies

Tech Blog uses the following dependencies:

- bcrypt: Password hashing and authentication.
- connect-session-sequelize: Session storage using Sequelize.
- dotenv: Environment variable management.
- express: Web application framework.
- express-handlebars: Template engine for rendering views.
- express-session: Session management.
- mysql2: MySQL database driver.

## Development

For development purposes, you can use the following command to start the application with automatic reloading:

- bash:
  npm run develop
