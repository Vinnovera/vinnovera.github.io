# Vinnovera web

__IMPORTANT__ always use sh deploy.sh instead of rake deploy when deploying.

## Setup

1. Clone this repo `git clone https://github.com/Vinnovera/vinnovera.github.io.git vinnovera`
2. Checkout the __source__ branch `git checkout source`
3. Installera bundler `gem install bundler`
4. Installera dependencies `bundle install`
5. Now you are ready to create a post or update the theme

## Create a post

1. Open the terminal
2. `cd` to root of the project.
3. `rake new_post['My new post']`
4. Open your markdown editor and edit the file /path/to/project/source/\_posts/2013-12-12-my-new-post.markdown
5. Edit, save and back to the terminal.
6. `rake generate` to generate the static site including your post.
7. `rake deploy` to publish.
8. `git add .` to stage your new post in the source branch
9. `git commit -m "New post!"` to commit your post to the source branch
10. And finally `git push origin source` to push your commit

If you are lazy, you can skip step 6-10 and run `sh publish.sh`

## Update theme

Theme files is in the __source__ directory and styles in the __sass__ directory. Octopress will autogenerate everything when you save a file in those two directories if you have started previewing (rake preview).
Don't mind the __themes__ directory and __never__ run `rake install[...]`

## Preview

If you run `rake preview` you can watch the site with changes in real-time, locally at http://localhost:4000

## License
(The MIT License)

Copyright © 2009-2013 Brandon Mathis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


#### If you want to be awesome.
- Proudly display the 'Powered by Octopress' credit in the footer.
- Add your site to the Wiki so we can watch the community grow.
