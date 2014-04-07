---
layout: post
title: "Shopify - Adding meta data to a product"
date: 2014-04-07 10:43:38 +0200
comments: true
categories: [Shopify, Hacks]
author: Alexandra Munter
authorDescription: Alexandra Munter jobbar med frontend på Vinnovera.
authorImage: /images/profiles/sandra.jpg
authorTel: 070-491 84 29
authorMail: alexandra@vinnovera.se
---

While developing a Shopify site we encountered the issue of wanting to add custom content or meta data to a product page. There weren't any options in <!-- more -->the product settings that matched what we wanted to achieve - adding product specific pdf-files and movies.

The option we found to be suggested was to use metafields, a module for Shopify, but we didn't want to make a big hassle of poking around in the [Shopify API][1]. 

Our solution? We decided to use the product tags. If we wanted to add a pdf-file to a product we added the tag ```file:filename.pdf``` or if we wanted to add a video we wrote ```video:youtubeID```. By doing this we could with ease control what was added to each product.

![](https://photos-2.dropbox.com/t/0/AAABrpWUc3bcj4PVDukk6JZ0ORD0nqYf5fWzqCoudHhHYA/12/142551753/jpeg/2048x1536/3/1396864800/0/2/tags.jpg/-D_rJMN0VhoS_p9NAcirqcQxZkUpbi7rugvVZE15pD4)

Code example for tags containing video:

```html
{% raw %}{% for tag in product.tags %}
	{% if tag contains 'video:'%}
		<div>
			<iframe src="http://www.youtube.com/embed/{{ tag | replace: 'video:', ''}}"></iframe>
		</div>
	{% endif %}
{% endfor %}{% endraw %}
```

[1]: http://www.shopify.com/technology/3032322-new-feature-metafields#axzz2xvNXkLON
