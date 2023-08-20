## Project: Integrating Passport.js Authentication in Next.js with MongoDB, Prisma, and Tailwind CSS

### Steps:

1. **Clone the Repository:**
   Clone the repository using the following command:

    ```sh
    git clone https://github.com/abfdev/nextjs-passport-auth-mongodb.git
    ```

2. **Navigate to the Cloned Repository:**

    ```sh
    cd nextjs-passport-auth-mongodb
    ```

3. **Install Dependencies:**
   Install required npm packages:

    ```sh
    npm install
    ```

4. **Set Up Environment Variables:**
   Edit `.env` file and add environment variables:

    ```.env
      DATABASE_PROVIDER= "mongodb"
      DATABASE_URL= "mongodb+srv://<your-mongodb-connection-url>"

      SESSION_SECRET= "your-session-secret"

      GOOGLE_CLIENT_ID = "your-google-client-id"
      GOOGLE_CLIENT_SECRET = "your-google-client-secret"
      GOOGLE_CALLBACK_URL_PRODUCTION= "<domaine name>/api/auth/google/callback"
      GOOGLE_CALLBACK_URL_DEVELOPMENT= "<domaine name>/api/auth/google/callback"

      GITHUB_CLIENT_ID_PRODUCTION = "your-github-client-id"
      GITHUB_CLIENT_SECRET_PRODUCTION = "your-github-client-secret"
      GITHUB_CLIENT_ID = "your-github-client-id"
      GITHUB_CLIENT_SECRET = "your-github-client-secret"
      GITHUB_CALLBACK_URL_PRODUCTION = "<domaine name>/api/auth/github/callback"
      GITHUB_CALLBACK_URL_DEVELOPMENT= "http://localhost:3000/api/auth/github/callback"

      MAIL_HOST = "localhost"
      MAIL_PORT = 1025
      MAIL_USER =
      MAIL_PASS =

      NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

5. **Generate Prisma Client:**
   Generate Prisma client code:

    ```sh
    npx prisma generate
    ```

6. **Run Prisma Migrations:**
   Run migrations if schema changed:

    ```sh
    npx prisma migrate dev
    ```

7. **Start the Development Server:**
   Start Next.js server:

    ```sh
    npm run dev
    ```

8. **Access the Application:**
   Open a web browser and go to `http://localhost:3000`.

By following these steps, you'll integrate Passport.js authentication, MongoDB, Prisma, and Tailwind CSS into your Next.js application.
