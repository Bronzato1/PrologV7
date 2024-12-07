# PrologV7

- Backend : Azure Functions
- Frontend: Angular

## Steps to Host an Angular App in GitHub Pages

To enable deployment of your Angular app to GitHub Pages, you'll need to add the Angular GitHub Pages external library. You can do this by running the following command:

```
ng add angular-cli-ghpages
```

This command extends the Angular CLI by adding support for deploying to GitHub Pages.

Once you've added the library, you can use the deploy command to deploy your Angular application to GitHub Pages. Simply run:

```
ng deploy --base-href=/test-deploy/
```

Replace _"test-deploy"_ with your <repositoryname>. 

Ex: _ng deploy --base-href=/PrologV7/_ (lower/uppercase are important!)

Attention: if you have a custom domain name attached to your repository, you have to run:

```
ng deploy --base-href=https://www.domain.com/
```

Replace "www.domain.com" with your <domain name>. 

Ex: _ng deploy --base-href=https://www.prolog.red_

This command will deploy your current Angular application to GitHub Pages, making it accessible to the public. The index file serves as the main entry point for a website or application and publishing source determines the branch, folder, or directory from which GitHub Pages serves site's files.

Once you run the ng deploy command, Angular CLI will build your application and push the final static files to the gh-pages branch of your GitHub repository. After the first successful deployment, GitHub will automatically enable the GitHub Pages feature for new file in your repository.

You can find more information about GitHub Pages in the Settings tab of your repository, under the GitHub Pages section. Here, you'll see options for customizing your GitHub Pages site, such as choosing a custom domain or enabling HTTPS. Once GitHub Pages is enabled, your Angular application will be accessible to the public at the GitHub Pages URL associated with the project folder your site's repository.

To streamline your development workflow for web applications hosted on GitHub Pages, it's essential to maintain separate branches for your source code and final static files. Here we can use the master branch to manage application's source code, where we can make frequent updates, improvements, and extensions as needed.

Once the changes are complete, deploy them to the gh-pages branch, which is reserved for the final static files of your application. This approach allows you to keep your source code organized and easily deploy updates. GitHub pages support is necessary, to ensure a smooth and efficient development process.



