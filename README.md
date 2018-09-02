# gulp-json-replace
> Replace strings from a json file.

## Setup

```bash
yarn add --dev @yodasws/gulp-json-replace
```

```bash
npm install @yodasws/gulp-json-replace --save-dev
```

## Usage

### Basic
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

**config.json**
```javascript
{
	"title": "JSON Replace for Gulp",
	"author": "Sam Grundman"
}
```

**gulpfile.js**:
```javascript
const replace = require('gulp-json-replace');

gulp.task('json-replace', function() {
    return gulp.src('src/**/*.html')
        .pipe(replace({
            src: './config.json',
        }))
        .pipe(gulp.dest('dist/'));
});
```

Result:
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

### Advanced
**index.html**
```html
<h1>{title}</h1>
<p>{openParagraph}</p>
```

**gulpfile.js**:
```javascript
gulp.task('json-replace', function() {
    return gulp.src('src/**/*.html')
        .pipe(replace({
            src: {
				title: 'Great New Story!',
			},
			keepNoMatch: true,
			prefix: '{',
			suffix: '}',
        }))
        .pipe(gulp.dest('dist/'));
});
```

Result:
```html
<h1>Great New Story!</h1>
<p>{openParagraph}</p>
```

## Options

### options.src
Type: `String` or `Object`<br/>
Accepts either the path of the JSON content file or a JavaScript object.

### options.prefix
Type: `String`<br/>
Default: `%%`<br/>
The string to open the search field.

### options.suffix
Type: `String`<br/>
Default: ``<br/>
The string to close the search field.

### options.keepNoMatch
Type: `Boolean`<br/>
Default: `false`<br/>
If true, will replace any search pattern not found in your JSON with an empty string.

## See also
[MDN documentation for RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[MDN documentation for String.replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
