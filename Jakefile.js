var stylus = require('stylus'),
	nib = require('nib'),
	fs = require('fs');
	browserify = require('browserify'),
	shim = require('browserify-shim'),
	path = require('path'),
	uglify = require('uglify-js');



desc('Build the client assets');
task('build', [], function ( ) {
	// clean first
	jake.Task.clean.addListener('complete', function () {

		// build hackakl site
		var styleTask = jake.Task.styles,
			scriptsTask = jake.Task.scripts;

		scriptsTask.invoke();
		styleTask.invoke();
	}).invoke();
});



desc('Clean the build and the public directory');
task('clean', [], function ( ) {
	jake.rmRf('./hackakl/public');
	jake.mkdirP('./hackakl/public');
	complete();
});



desc('Generate styles');
task('styles', [], function ( ) {

});



desc('Generate scripts');
task('scripts', [], function ( ) {

	shim(browserify().transform('brfs'), {
		jquery: {
			path: './scripts/lib/jquery-1.10.2.js',
			exports: '$'
		},
		knockout: {
			path: './scripts/lib/knockout-3.0.0.js',
			exports: 'ko'
		},
		Sammy: {
			path: './scripts/lib/sammy-0.7.4.js',
			exports: 'Sammy'
		}
	})
	.require(require.resolve(__dirname + '/scripts/main.js'), {
		entry: true
	})
	.bundle(function (err, src) {
		if (err) throw err;

		fs.writeFileSync('./hackakl/public/main.js', ';' + src);
	});
});



desc('Generate styles');
task('styles', [], function () {

	var mainStylePath = __dirname + '/styles/main.styl';

	stylus(fs.readFileSync(mainStylePath, 'utf8'))
	.set('filename', mainStylePath)
	.set('include css', true)
	.use(nib())
	.render(function(err, css) {
		if (err) throw err;

		fs.writeFile('./hackakl/public/main.css', css, function ( err ) {
			if (err) throw err;

			complete();
		});
	});
});

