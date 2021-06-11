# CDNCovering
[![Build Status](https://travis-ci.com/K-Rintaro/CoveringCDN.svg?branch=main)](https://travis-ci.com/K-Rintaro/CoveringCDN)

When CDN is down, CDNCovering can detect it, and run designated commands automatically.

## Install
```
$ npm i CDNCovering
```

```js
const CDNCovering = require("CDNCovering")
```

## how to use
CDNCovering has two modes: localfile (ex. ./public/index.html) and remotefile (ex. https://www.rintaro.tech)

### 1. Localfile mode
```js
CDNCovering.local(path, command)
```
**Path means the path of the file that you want to check CDN status.**\
**Command means the command that you want to run when CDN is down.**\
Example:
```js
CDNCovering.local('./public/index.html', 'heroku logs')
```

### 2. Remotefile mode
```js
CDNCovering.remote(uri, command)
```
Example:
```js
CDNCovering.remote('https://www.rintaro.tech', 'heorku logs')
```

## LICENSE
This software is released under the MIT license.

