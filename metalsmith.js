var
	metalsmith  = require('metalsmith'),
	handlebars  = require('handlebars'),
	helpers     = require('handlebars-helpers'),
	highlight   = require('highlight.js'),
	marked      = require('marked'),
	markdown    = require('metalsmith-markdown'),
	templates   = require('metalsmith-templates'),
	partial     = require('metalsmith-partial'),
	tags        = require('metalsmith-tags'),
	collections = require('metalsmith-collections'),
	define      = require('metalsmith-define'),
	more        = require('metalsmith-more'),
	slug        = require('metalsmith-slug'),
	permalinks  = require('metalsmith-permalinks'),
	stylus      = require('metalsmith-stylus'),
	nib         = require('nib'),
	stylusLib   = require('stylus');

helpers.register(handlebars, {});

handlebars.registerHelper('stripHTML', function(text) {
	return text.toString().replace(/(<([^>]+)>)/ig, '');
});

var renderer = new marked.Renderer();

renderer.code = function(code, language){
  return '<pre><code class="hljs ' + language + '">' +
    highlight.highlight(language, code).value +
    '</code></pre>';
};

module.exports = function(callback) {
	return metalsmith(__dirname)

		// Variables used in templates
		.use(define({
			site: {
				disqus_short_name:          'vinnovera',
				disqus_show_comment_count:  false
			}
		}))

		// Generate tag index
		.use(tags({
			handle: 'tags',                  // yaml key for tag list in you pages
			path: 'blogg/tagg',                   // path for result pages
			template: 'tag.html',    // template to use for tag listing
			sortBy: 'date',                  // provide posts sorted by 'date' (optional)
			reverse: true                    // sort direction (optional)
		}))

		// Create a collection of all blog entries
		.use(collections({
			posts: {
				pattern: 'blogg/*.markdown',
				sortBy: 'date',
				reverse: true
			}
		}))

		// Create url friendly slugs
		.use(slug({
			patterns: ['blogg/*.markdown'],
			property: 'title'
		}))

		// Render markdown to HTML
		.use(markdown({
			renderer: renderer
		}))

		// Create permalink paths frpm date and slug
		.use(permalinks({
			pattern: 'blogg/:date/:slug',
			date: 'YYYY/MM/DD'
		}))

		// Create excerpts with <!--more-->
		.use(more())

		// Partials support in templates
		.use(partial({
			directory: './templates/partials',
			engine: 'handlebars'
		}))

		// Render templates with handlebars
		.use(templates({
			engine: 'handlebars'
		}))

		// Render CSS with stylus
		.use(stylus({
			use: [nib()],
			define: {
				url: stylusLib.url()
			}
		}))

		// GO!
		.build(function (err, files) {
			if (err) {
				console.log(err);
			}
			callback();
		});
}