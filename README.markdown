# Vinnovera web

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

The theme is in its own github repo located at: https://github.com/Vinnovera/theme. Everytime you make changes there, you need to update the site with the following steps:

1. Pull the theme with `git submodule foreach git pull origin master`
2. Reinstall the theme with `rake install['vinnoveraTheme']` and say yes!
3. Publish the changes (`rake generate && rake deploy`) or preview (`rake preview`)

If you are lazy you can just run `sh preview_theme.sh` or `sh deploy_theme.sh`.

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
