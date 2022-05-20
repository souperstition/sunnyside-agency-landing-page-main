const navbar = document.querySelector('nav');
const hero = document.querySelector('#hero');
const ul = document.querySelector('.header-nav');
const hamburger = document.querySelector('.hamburger');
const lis = ul.querySelectorAll('li');

let heroHeight = hero.clientHeight - 5;

setTimeout(function() {
	ul.classList.remove('preload');
}, 1000);

window.addEventListener('resize', () => {
	heroHeight = hero.clientHeight - 5;
	ul.classList.add('preload');
	setTimeout(function() {
		ul.classList.remove('preload');
	}, 1000);
});

window.addEventListener('scroll', () => {
	let scrolled = window.scrollY;

	if (scrolled <= heroHeight) {
		navbar.classList.remove('scrolled');
	} else {
		navbar.classList.add('scrolled');
	}
});

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
