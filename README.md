# gulp-json-replace
> Replace strings from a json file.

## Setup

```bash
yarn add --dev @yodasws/gulp-json-replace
```

`gulpfile.js`:
```javascript
const jr = require('gulp-json-replace');

gulp.task('json-replace', function() {
    return gulp.src('src/**/*.html')
        .pipe(jr({
            src: './config.json',
            prefix: '%%'
        }))
        .pipe(gulp.dest('dist/'));
});
```

## Usage

Assume you wanna replace a few things in an html file:<br/>
**index.html**
```html
<html>
<head>
    <meta charset="utf-8" />
    <title>%%title</title>
</head>
<body>
<h1>%%title</h1>
<u>%%author</u>
</body>
</html>
```

And you put all your content in your config file:<br/>
**config.json**
```javascript
{
	"title": "JSON Replace for Gulp",
	"author": "Sam Grundman"
}
```

Rusult:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>JSON Replace for Gulp</title>
</head>
<body>
<h1>JSON Replace for Gulp</h1>
<u>Sam Grundman</u>
</body>
</html>
```

### replace(options)

#### options
Type: `Object`

##### options.src
Type: `String` or `Object`<br/>
Accept the path of json file, or an JavaScript Object Literals.

##### options.prefix
Type: `String`<br/>
Default: `%%`<br/>
The string to open the search field.

##### options.suffix
Type: `String`<br/>
Default: ``<br/>
The string to close the search field.

##### options.mode
Type: `String`<br/>
Default: `strict`<br/>
Specify the match mode, the value would be `strict` or `loose`, if set to `loose`, it will ignore the file extension. For example: "index.html" will match files of "index.hbs", "index.html", "index.xxx"...

[MDN documentation for RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[MDN documentation for String.replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
