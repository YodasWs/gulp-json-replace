'use strict';

const through = require('through2');
const fs = require('fs');
const rs = require('replacestream');

module.exports = (options) => {
    let json;
    if (typeof options.src == 'string') {
        json = JSON.parse(fs.readFileSync(options.src, 'utf8'));
    } else if (typeof options.src == 'object') {
        json = options.src;
    }

    const isLoose = options.mode === 'loose';
    const prefix = options.prefix || '%%';
    const suffix = options.suffix || '';
    const stream = through.obj((file, enc, cb) => {
        // get the file path
        const path = file.path;
        if (file.isNull()) {
            return cb(null, file);
        }

		const search = new RegExp(
			suffix !== ''
				? `${prefix}(?!${suffix}).*${suffix}`
				: `${prefix}([\\w-]+)`,
			'g',
		);

		const replacement = (match, search) => {
			const keys = search.split('.');
			let replacement = '';
			keys.forEach((key) => {
				replacement = json[key];
			});
			return replacement === undefined ? '' : replacement;
		};

		// handle stream
		if (file.isStream()) {
			file.contents = file.contents.pipe(rs(search, replacement));
		}

		// handle buffer
		if (file.isBuffer()) {
			if (search instanceof RegExp) {
				file.contents = new Buffer(String(file.contents).replace(search, replacement));
			} else {
				const chunk = String(file.contents).split(search);
				file.contents = new Buffer(chunk.join(replacement));
			}
		}
		return cb(null, file);
    });
    return stream;
};
