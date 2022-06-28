[Demo](https://s3.amazonaws.com/itsdani.me/portfolio/sunnyside/index.html)

![screenshot](https://github.com/souperstition/sunnyside-agency-landing-page-main/blob/master/images/thumbs/screenshot1.png?raw=true)

## Table of Contents

- [Built with](#built-with)
- [Project Setup](#project-setup)
- [Designing the Mobile Navigation Menu](#designing-the-mobile-navigation-menu)
- [Disabling Animations on Page Load](#disabling-animations-on-page-load)
- [Planned Revisions](#planned-revisions)


## Built with

- Semantic HTML5 markup
- Flexbox
- CSS Grid
- Sass
- Javascript

## Project Setup

In order to stay on top of compiling SCSS code, I used the VS Code extension [Live Sass Compiler](#https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass). This extension compiles your SCSS into CSS automatically on save.

I began my project by planning out the organization of my scss files. Here's a look at my folder structure: 

```
/scss
	/components
    	_footer.scss
    	_hero.scss
    	_index.scss // forwards
    	_mobile.scss
    	_nav.scss
    	_reset.scss // CSS reset by Josh Comeau
    	_sections.scss

	/variables
    	_colors.scss
		_fonts.scss
		_index.scss // forwards
		_math.scss 

	index.scss // main file
```

In the components directory, I separated my files into different parts of the site (ie. nav, hero, footer). The variables directory contained colors, fonts, and basic sizing information. My main index.scss file was relatively empty, just containing references to the components and variables:

~~~scss
@use './variables/' as *;
@use './components/' as *;
~~~

I found this structure fairly easy to work with, and it was nice being able to easily find the styles I was looking for.

[[back to top]](#table-of-contents)

## Designing the Mobile Navigation Menu

To get the mobile navbar to work, I used the CSS clip-path property to create the shape of the menu:

![mobile nav](https://github.com/souperstition/sunnyside-agency-landing-page-main/blob/master/images/thumbs/mobile-nav.png?raw=true)

~~~scss
ul {
	clip-path: polygon(0 10%, 94% 10%, 100% 0%, 100% 100%, 0 100%);
}
~~~

I used javascript to add a "show" class to the ul when the menu was open, and a "hide" class when the menu was closed. As a bonus, I wanted to make sure the menu would close not just when the menu icon was clicked but also if a user clicked **outside** the menu, or if the user clicks an item in the navigation menu. The *if* and *forEach* statements below accomplish this.

~~~js
hamburger.addEventListener('click', () => {
	ul.classList.toggle('show');
	ul.classList.toggle('hide');
	const isVisible = ul.classList.contains('show');

	if (isVisible) {
		document.addEventListener('click', e => {
			if (!document.querySelector('.nav').contains(e.target) && e.target !== hamburger) {
				ul.classList.remove('show');
				ul.classList.add('hide');
			}
		});

		lis.forEach(li => {
			li.addEventListener('click', () => {
				ul.classList.remove('show');
				ul.classList.add('hide');
			});
		});
	}
});
~~~

Now, when the menu is opened, it is given the "show class" and the CSS animation shown below is triggered. The same happens when the menu is closed. 

~~~scss
.show {
	display: flex;
	animation: slide-down 1000ms forwards;
}
.hide {
	display: flex;
	animation: slide-up 1000ms forwards;
}
@keyframes slide-down {
	0% {
		transform: scale(0);
		transform-origin: top right;
    }
	100% {
		transform: scale(1);
		transform-origin: top right;
	}
}

@keyframes slide-up {
	0% {
		transform: scale(1);
		transform-origin: top right;
	}
	100% {
		transform: scale(0);
		transform-origin: top right;
	}
}
~~~

[[back to top]](#table-of-contents)

## Disabling Animations on Page Load

By default, the "hide" animation will run every time the page loads or refreshes. I solved this issue by adding a preload class to remove animations. A setTimeout function removes this class after the page loads and a short delay, and then allows for animations to continue as normal.

~~~js
setTimeout(function() {
	ul.classList.remove('preload');
}, 1000);
~~~

I also decided to make the navbar sticky, and in doing so ran into contrast issues. I decided that adding a slightly transparent background color which only appears when the use scrolls outside the hero section would make the text more legible. This was not specified in the project's design, but it follows the color scheme and allows for the text to be read. 

~~~js
window.addEventListener('scroll', () => {
	let scrolled = window.scrollY;

	if (scrolled <= heroHeight) {
		navbar.classList.remove('scrolled');
	} else {
		navbar.classList.add('scrolled');
	}
});
~~~

Finally, to make sure things continued working as expected even if a user resized their browser window, I added an event listener to check for resizes and adjust as needed. In case the hero section's height changes, the window will notice and update the variable. The window will also add the *preload* class to the ul again to make sure a window resize doesn't trigger an unwanted animation.

~~~js
window.addEventListener('resize', () => {
	heroHeight = hero.clientHeight - 5;
	ul.classList.add('preload');
	setTimeout(function() {
		ul.classList.remove('preload');
	}, 1000);
});
~~~

[[back to top]](#table-of-contents)

## Planned Revisions

- Replace keyframe animations with transitions instead
- Separate mobile scss files

