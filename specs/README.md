npm install --save-dev jasmine-browser-runner jasmine-core
Initialize Jasmine in your project

npx jasmine-browser-runner init
Set jasmine as your test script in your package.json

"scripts": { "test": "jasmine-browser-runner runSpecs" }
Run your tests

npm test