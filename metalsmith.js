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
	paginate    = require('metalsmith-paginate'),
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
		.use(define({
			site: {
				disqus_short_name:          'vinnovera',
				disqus_show_comment_count:  false
			}
		}))
		.use(tags({
			handle: 'tags',                  // yaml key for tag list in you pages
			path: 'blogg/tagg',                   // path for result pages
			template: 'tag.html',    // template to use for tag listing
			sortBy: 'date',                  // provide posts sorted by 'date' (optional)
			reverse: true                    // sort direction (optional)
		}))
		.use(collections({
			posts: {
				pattern: 'blogg/*.markdown',
				sortBy: 'date',
				reverse: true
			}
		}))
		/*	.use(pagination({
		 'collections.posts': {
		 perPage: 5,
		 template: 'posts.html',
		 first: 'posts.html',
		 path: 'page/:num/index.html',
		 pageMetadata: {
		 title: 'Archive'
		 }
		 }
		 }))*/
		.use(paginate({
			perPage: 10,
			path: 'blogg'
		}))
		.use(slug({
			patterns: ['blogg/*.markdown'],
			property: 'title'
		}))
		.use(markdown({
			renderer: renderer
		}))
		.use(permalinks({
			pattern: 'blogg/:date/:slug',
			date: 'YYYY/MM/DD'
		}))
		.use(more())
		.use(partial({
			directory: './templates/partials',
			engine: 'handlebars'
		}))
		.use(templates({
			engine: 'handlebars'
		}))
		.use(stylus({
			use: [nib()],
			define: {
				url: stylusLib.url()
			}
		}))
		.build(function (err, files) {
			if (err) {
				console.log(err);
			}
			callback();
		});
}