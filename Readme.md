Steps to run this project

1. Install dependencies
npm install

2. Create environment variables
Duplicate the file template.env and rename it to .env.

3. Configure the environment variables
Fill the .env file with your email credentials:
EMAIL_USER=your_email@gmail.com
MAILER_SECRET_KEY=your_google_app_password
EMAIL_TO=destination_email@gmail.com

4. Generate a Google App Password
Go to your Google account and generate an App Password to use with Nodemailer.
Steps:
Enable 2-Step Verification
Generate a password for Mail

5. Run the project
npm run dev