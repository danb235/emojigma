# emojigma
Emojigma -- Emoticon Cryptography

## Installation
Download and install [Node.js](http://nodejs.org/). Once you have Node.js installed you will be able to use [npm](https://www.npmjs.org/) to install [CoffeeScript](http://coffeescript.org/) and [Brunch](http://brunch.io):
```
npm install -g coffeescript
npm install -g brunch
```

Clone the repo and enter the dir:
```
git clone git@github.com:tkdan235/emojigma.git
cd webapp
```

Install the [Node.js package](package.json) dependencies then run the brunch server:
```
npm install
brunch watch --server
```

 The ```brunch watch --server``` task will build the app, start the local server, and watch for file changes. Once the brunch watch command is finished the app will be available at [https://localhost:3333](https://localhost:3333).

## Deploy
```
git add public && git commit -m "public subtree commit"
git subtree push --prefix public origin gh-pages
```
