document.addEventListener('DOMContentLoaded', function() {

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bss-tooltip]'));
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	  return new bootstrap.Tooltip(tooltipTriggerEl);
	})

	var toastTriggers = document.querySelectorAll('[data-bs-toggle="toast"]');

	for (let toastTrigger of toastTriggers) {
		toastTrigger.addEventListener('click', function () {
			var toastSelector = toastTrigger.getAttribute('data-bs-target');

			if (!toastSelector) return;

			try {
				var toastEl = document.querySelector(toastSelector);

				if (!toastEl) return;

				var toast = new bootstrap.Toast(toastEl);
				toast.show();
			}
			catch(e) {
				console.error(e);
			}
		})
	}

	var swipers = document.querySelectorAll('[data-bss-swiper]');
	var swiperNavigations = document.querySelectorAll('.swiper-nav-standalone');

	for (var swiper of swipers) {
		let config = JSON.parse(swiper.dataset.bssSwiper);

		if (!config.navigation) {
			config.navigation = {};

			for (let swiperNavigation of swiperNavigations) {
				if (swiperNavigation.dataset.bssSwiperTarget === '#' + swiper.id) {
					config.navigation.prevEl = swiperNavigation.querySelector('.swiper-button-prev');
					config.navigation.nextEl = swiperNavigation.querySelector('.swiper-button-next');
					break;
				}
			}
		}

		let slider = new Swiper(swiper, config);
	}

	var products = document.querySelectorAll('[data-bss-dynamic-product]');

	for (var product of products) {
		var param = product.dataset.bssDynamicProductParam;
		product.dataset.reflowProduct = new URL(location.href).searchParams.get(param)
	}

}, false);