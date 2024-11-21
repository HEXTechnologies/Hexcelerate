-------------------------------------------------------------------------------------------------------------------------------------------------------
Welcome to the Haumāna Exchange App!
We're excited to have you working on our project. This README will guide you through the setup and development process to get you started quickly.
------------------------------------------------------------------------------------------------------------------------------------------------------------
STEPS TO FOLLOW:
1. Install GitHub Desktop: Clone repositories using GitHub Desktop. It's a great way to avoid using the CLI and push code faster!

2. Download Android Studio: Connect it to GitHub Desktop. Use Android Studio for code development and testing with its virtual phone emulator.

3. Install Dependencies: After cloning the repo and opening it in Android Studio, run 'npm install' in the command line to install the necessary node modules for our web application.

4. Start the Development Server: Run 'npm start' or 'npx expo start' to start the Metro Bundler and open the local server to view your development changes instantly.
   - it should be localhost.....

6. Project Structure:
    - The website code is in the 'app' directory.
    - The homepage is in 'index.tsx'.
    - Other pages include 'AboutUs.tsx' and 'PartnerWithUs.tsx'.
    - '_layout.tsx' defines the layout for all screens.
    - 'assets' directory holds all the .png and .jpg files.
    - 'src'/'components' holds the 'ProductCard.tsx' which is contains the style for listings.

7. Main Development Focus: We will mostly be working on 'index.tsx' as it is the homepage.

8. Commit and Push: Commit and push your changes using Android Studio or GitHub Desktop. There's no need to use the CLI.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------
STOP HERE! (unless you are deploying website to firebase hosting)
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

8. Deploying to Firebase Hosting:
   - Run 'npx expo export' to generate a build called the 'dist' directory.
   - Ensure 'firebase.json' points to 'dist' e.g. "public": "dist".
     
9. Finally, run 'firebase deploy --only hosting' or 'firebase deploy'.
Clear your browser cache and refresh the domain to view the updates.
VERY IMPORTANT: After deployment, add 'node_modules/' back to '.gitignore' to avoid including large files in future commits.

Additional Details:
Feel free to reach out if you have any questions or need assistance. Happy coding!
if you are missing the IONICONS from the header, you messed up step 8 so redeploy and include node_modules in your export.
