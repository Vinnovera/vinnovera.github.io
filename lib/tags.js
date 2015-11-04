var slug = require('slug');

module.exports = tags;

function tags(opts){
  opts = _.defaults(opts||{},{path:"tags/",yaml:{template:"tag.html"}});
  return function(files, metalsmith, done){
    var meta = metalsmith.metadata();

    // loop through all files, building an object with data about all tags
    var tags = _.reduce(files,function(memo,file,path){
      // make sure all tags are lower case, to prevent distinction between `Backbone` and `backbone`.
      file.tags = file.tags ? _.map(file.tags,function(t){return slug(t.toLowerCase());}) : [];
      // loop through all tags found in the `tags` YAML data for this file
      _.each(file.tags,function(tag){
        // build a path for where the file for this tag is supposed to go
        var key = opts.path+tag+"/index.md";
        memo[key] = _.defaults({},memo[key],{tag:tag,posts:[],contents:""},opts.yaml);
        memo[key].posts = _.sortBy(memo[key].posts.concat(file),"date").reverse();
      });
      return memo;
    },{});

    // add this data to the files object, causing Metalsmith to create these files
    _.extend(files,tags);

    // add a taglist array to the metadata, to be consumed by a tagcloud type page
    meta.taglist = _.sortBy(_.reduce(tags,function(memo,tag){
      return memo.concat({tag:tag.tag,count:tag.posts.length,posts:tag.posts});
    },[]),"count").reverse();

    // also add the same data but with tagnames as key, for use by individual tag pages
    meta.tags = _.reduce(tags,function(memo,tag){
      memo[tag.tag] = {tag:tag.tag,count:tag.posts.length,posts:tag.posts};
      return memo;
    },{});

    // note metalsmith that we are done!
    done();
  };
};