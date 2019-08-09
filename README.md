

## Available Scripts

In the project directory, you can run:

### Yarn

#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn lint`

Runs linting tools in the project in order to warn us and show a list of files not following our standard code styling.<br>

Configuration file is at ./config/local/linter/.eslintrc.json, more options can be added based on the following 
[Eslint Documentation](https://eslint.org/docs/rules/).

#### `yarn lint-fix`
**IMPORTANT NOTE**: Beware as this command will automatically change all the files in the project that are not formatted according to the style and it can cause serious side effects.

Runs linting tools in the project in order to fix code styling.<br>

Configuration file is at ./config/local/linter/.eslintrc.json, more options can be added based on the following 
[Eslint Documentation](https://eslint.org/docs/rules/).

#### `yarn test` 

Executes all tests.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn test-watch` 

Launches the test runner in the interactive watch mode that executes tests related to changes that were made.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Shell +  Docker *EXPERIMENTAL* 

#### `./run.sh dev`

It will start docker container and the application will be build in development mode.  


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
