# Jumpstart shop demo

# Requirements

- Node.js
- Contentful API access tokens
- Empty Contentful Space
- Contentful CLI tools

# Step 1

Create an empty space in Contentful if you haven't already.
Create your first API key and note the API access tokens (Delivery and Preview).
From the Contentful web app go to SPACE SETTINGS --> API keys....

# Step 2

After downloading/cloning this repo, navigate to the project's directory on your computer and run "npm install" from
your terminal window to install the dependencies.

# Step 3

After installing the dependencies run the "npm run setup" command to configure the app.
Type in the API tokens from step 1 at the prompt. The script will connect to the provided space, please use a demo space
as the script will DELETE all entries and content types. I repeat the script will WIPE! the space clean before importing
new content.

# Step 4

Create the environment variable "HOST" and set it to "http://localhost:8888" when testing locally. On a production
environment, you should set this according to your public hostname. This is required for the app to utilize the
Serverless Functions.

# Step 5

Install the Netlify CLI using the command "npm install -g netlify-cli". This is required to run the app locally and
deploy it to Netlify.

# Step 7

Run the app with "netlify dev". The app will now be running locally on port 8888, you may also change the port in the
package.json file.

# Step 8

Using the command "netlify login" you can authenticate with your Netlify account and connect the app's repository
using "netlify init". This will allow you to build the app using the "netlify build" command and deploy it to Netlify
using "netlify deploy".
