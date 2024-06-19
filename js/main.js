document.addEventListener("DOMContentLoaded", function (){
	const bodyEl = document.body;
	/*========Lazy Load============ */
	$('.lazy').Lazy();

	/*========HEADER VIDEO============ */
	const videoBox = document.querySelector('#video-box');
	if(videoBox){
		const videoContent = videoBox.querySelector('#video');
		const videoToggleBtn = videoBox.querySelector('#video-btn');
		
		videoContent.addEventListener('click', ()=>{
			if(!videoToggleBtn.classList.contains('active')){
				videoContent.pause();
				videoToggleBtn.classList.add('active');
				videoToggleBtn.querySelector('span').textContent = 'Возобновить видео';
				
			}else{
				videoContent.play();
				videoToggleBtn.classList.remove('active');
				videoToggleBtn.querySelector('span').textContent = 'Приостановить видео';
			}
		});
		videoContent.addEventListener("ended", function () {
			videoContent.pause();
			videoToggleBtn.classList.add('active');
			videoToggleBtn.querySelector('span').textContent = 'Возобновить видео';
		});
	}
	/*========Partners'Zone  VIDEO============ */
	const videoBlock = document.querySelector('.video');
	if(videoBlock){
		const videoBlockContent = videoBlock.querySelector('video');
		videoBlock.addEventListener('click', ()=>{
			if(videoBlock.classList.contains('active')){
				videoBlockContent.pause();
				videoBlock.classList.remove('active');
			}else{
				videoBlockContent.play();
				videoBlock.classList.add('active');
			}
		});
		videoBlock.addEventListener("ended", function () {
			videoBlockContent.pause();
			videoBlock.classList.remove('active');
		});
	}
	/*==============FOR HEADER SEARCH FORM ============= */
	const headerEl = document.querySelector('header');
	const openSearchForm = document.querySelector('#search-btn');
	const searchFormPopup = document.querySelector('#search-popup');

	const menuToggle = document.querySelector('#menu-toggle');
	const mobileMenu = document.querySelector('#mobile-menu');
	const fixedButtons = document.querySelector('#fixed-buttons');

	function hideSerchForm(formBlock){
		formBlock.classList.remove('active');
		formBlock.style.top = 'auto';
		bodyEl.classList.remove('lock');
	}
	function resetActiveMenu(){
		mobileMenu.querySelector('.active')?.classList.remove('active'); 
		mobileMenu.classList.remove('active');
		menuToggle.classList.remove('active');
	}
	if(openSearchForm){
		openSearchForm.addEventListener('click', ()=>{
			
			if(searchFormPopup.classList.contains('active')){
				hideSerchForm(searchFormPopup);
			}else{
				/*положение нижнего края меню */
				const topPosition = headerEl.getBoundingClientRect().bottom;
				resetActiveMenu();
				searchFormPopup.classList.add('active');
				searchFormPopup.style.top = topPosition + 'px';
				bodyEl.classList.add('lock');
				fixedButtons.classList.remove('active');
				
			}
			
		});
		/*====== click for overlay ====*/
		searchFormPopup.addEventListener('click', (e)=>{
			if(e.target == e.currentTarget){
				searchFormPopup.classList.remove('active');
				bodyEl.classList.remove('lock');
			}
		});
	}
    /*===============MOBILE MENU ==================*/
	if (menuToggle) {
		const  mobMenuDropItem = mobileMenu.querySelectorAll('.drop-menu-li');
		
		/*   клик по иконке гамбургер*/  
		menuToggle.addEventListener('click', ()=> {
			hideSerchForm(searchFormPopup);
			if (menuToggle.classList.contains('active')) {
				resetActiveMenu();
				bodyEl.classList.remove('lock');
				if(window.scrollY > 500){
					fixedButtons.classList.add('active');
					
				}
				
			
			} else {
				menuToggle.classList.add('active');
			    mobileMenu.classList.add('active');
				bodyEl.classList.add('lock');
				
				if(window.scrollY > 500 ){
					
					fixedButtons.classList.remove('active');
					
				}
			}
		});

       /*   клик по мобильному меню*/  
		for(let item of mobMenuDropItem){
			item.addEventListener('click', function(e){
				item.querySelector('.drop-menu-wrapper').classList.add('active');
				if(window.scrollY > 500){
					fixedButtons.classList.remove('active');
				}
			});
			item.querySelector('.back-link').addEventListener(
				'click', 
				(e) => {
					e.stopPropagation();
					e.target.closest('.drop-menu-wrapper').classList.remove('active');
					if(window.scrollY > 500){
						fixedButtons.classList.remove('active');
					}
				}
			);
		}
	}
	//================ FIXED BOTTOM BUTTONS======*/

	if(fixedButtons){
		window.addEventListener('scroll', ()=>{
			
			if(window.scrollY > 500 && 
				!mobileMenu.classList.contains('active') && 
				!searchFormPopup.classList.contains('active') 			
			){
				fixedButtons.classList.add('active');
			}else{
				fixedButtons.classList.remove('active');
			}
		});
	}
	/*================ STAGES TABS============ */
	$('.custom-tabs').each(function() {
		let ths = $(this);
		ths.find('.custom-tab').not(':first').hide();
		ths.find('.tab-btn').click(function() {
			ths.find('.tab-btn').removeClass('active').eq($(this).index()).addClass('active');
			ths.find('.custom-tab').hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass('active');
		
	});


	/*============== ACORDION ========== */
	;(function ($, window, document, undefined) {
		"use strict";
		var pluginName = 'simpleAccordion',
		defaults = {
			multiple: false,
			speedOpen: 300,
			speedClose: 150,
			easingOpen: null,
			easingClose: null,
			headClass: 'accordion-header',
			bodyClass: 'accordion-body',
			openClass: 'open',
			defaultOpenClass: 'default-open',
			cbClose: null, //function (e, $this) {},
			cbOpen: null //function (e, $this) {}
		};
		function Accordion(element, options) {
			this.$el = $(element);
			this.options = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;
			if (typeof this.$el.data('multiple') !== 'undefined') {
				this.options.multiple = this.$el.data('multiple');
				} else {
				this.options.multiple = this._defaults.multiple;
			}
			this.init();
		}
		Accordion.prototype = {
			init: function () {
				var o = this.options,
				$headings = this.$el.children('.' + o.headClass);
				$headings.on('click', {_t:this}, this.headingClick);
				$headings.filter('.' + o.defaultOpenClass).first().click();
			},
			headingClick: function (e) {
				var $this = $(this),
				_t = e.data._t,
				o = _t.options,
				$headings = _t.$el.children('.' + o.headClass),
				$currentOpen = $headings.filter('.' + o.openClass);
				if (!$this.hasClass(o.openClass)) {
					if ($currentOpen.length && o.multiple === false) {
						$currentOpen.removeClass(o.openClass).next('.' + o.bodyClass).slideUp(o.speedClose, o.easingClose, function () {
							if ($.isFunction(o.cbClose)) {
								o.cbClose(e, $currentOpen);
							}
							$this.addClass(o.openClass).next('.' + o.bodyClass).slideDown(o.speedOpen, o.easingOpen, function () {
								if ($.isFunction(o.cbOpen)) {
									o.cbOpen(e, $this);
								}
							});
						});
						} else {
						$this.addClass(o.openClass).next('.' + o.bodyClass).slideDown(o.speedOpen, o.easingOpen, function () {
							$this.removeClass(o.defaultOpenClass);
							if ($.isFunction(o.cbOpen)) {
								o.cbOpen(e, $this);
							}
						});
					}
					} else {
					$this.removeClass(o.openClass).next('.' + o.bodyClass).slideUp(o.speedClose, o.easingClose, function () {
						if ($.isFunction(o.cbClose)) {
							o.cbClose(e, $this);
						}
					});
				}
			}
		};
		$.fn[pluginName] = function (options) {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName,
					new Accordion(this, options));
				}
			});
		};
	}(jQuery, window, document));
	$(function() {
    	$('.accordion-group').simpleAccordion();
	});

	/*=================REVIEW SLIDER ================== */
    var reviewSlider = new Swiper(".review-slider", {
	   slidesPerView: 1.07,
	   loop: true,
	   speed: 1000,
	    spaceBetween: 10,
       navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
      },
	  breakpoints: {
        640: {
          slidesPerView: 1.2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 1.4,
          spaceBetween: 16,
        },
		1024: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
		
    	1099: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },    
	   1199: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
	/*=================BLOG CARDS SLIDER ================== */
    var blogCardsSlider = new Swiper(".blog-cards-slider", {
	   slidesPerView: 1.15,
	   loop: true,
	   speed: 1000,
	    spaceBetween: 20,
       navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
      },
	  breakpoints: {
        376: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        576: {
          slidesPerView: 1.8,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 16,
        },
		1024: {
		slidesPerView: 3,
		spaceBetween:20,
	},       
	   1280: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
    

	/* подсветка активного меню при скролле Article Page */
	const backlitMenu = document.querySelector('.backlit-menu');
	if(backlitMenu){
		const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				
				backlitMenu.querySelectorAll('a').forEach((link) => {
					
				let id = link.getAttribute('href').replace('#', '');
				if (id === entry.target.id) {
					
					link.classList.add('active');
				} else {
				link.classList.remove('active');
				}
			});
			}
		});
		}, {
		threshold: 0.5
		});
	
		document.querySelectorAll('.anchor').forEach(section => { observer.observe(section)} );
	}
   
	const dynamicMenu = document.querySelector('.dynamic-menu');
   
	/* меню Содержание страницы на моб версии */
     if(dynamicMenu){
	   dynamicMenuBtn = dynamicMenu.querySelector('.dynamic-menu__header');
	   dynamicMenuList = dynamicMenu.querySelector('.dynamic-menu__list');
	  
	    dynamicMenuBtn.addEventListener('click', ()=>{
			
			if(dynamicMenuBtn.classList.contains('active')){
				dynamicMenuList.style.maxHeight = 0;
				dynamicMenuBtn.classList.remove('active');
				
			}else{
				dynamicMenuList.style.maxHeight = dynamicMenuList.scrollHeight + 'px';
				dynamicMenuBtn.classList.add('active');
			}
		});
		dynamicMenuList.addEventListener('click', ()=>{
			dynamicMenuList.style.maxHeight = 0;
			dynamicMenuBtn.classList.remove('active');
		});
		const stickyDynamicMenu = document.querySelector('#sticky-menu');
		const stickyFiltersList = document.querySelector('.filters-drop');
		
		if(stickyDynamicMenu){
			window.addEventListener('scroll', ()=>{
				if(window.innerWidth <= 1280){
					if(window.scrollY > 550){
						stickyDynamicMenu.classList.add('active');
						
					}else{
						stickyDynamicMenu.classList.remove('active');
					}
				}
			});
			window.addEventListener('resize', ()=>{
				if(window.innerWidth > 1279){
					dynamicMenuList.style.maxHeight = 'unset';
					dynamicMenuBtn.classList.remove('active');
				}else{
					dynamicMenuList.style.maxHeight = '0';
					dynamicMenuBtn.classList.remove('active');
				}
			});
		}
		if(stickyFiltersList){
			window.addEventListener('resize', ()=>{
				if(window.innerWidth > 1023){
					stickyFiltersList.style.maxHeight = 'unset';
					dynamicMenuBtn.classList.remove('active');
				}else{
					stickyFiltersList.style.maxHeight = '0';
					dynamicMenuBtn.classList.remove('active');
				}
			});
		}
   }
    /*====main page ETAPS TAB BUTTONS WIDTH ========== */
	const buttons = document.querySelectorAll('.tab-btn');
  
	if(buttons.length > 0 && window.innerWidth < 584){
		
		/*==== ширина первой кнопки по загрузке страницы ==== */
		buttons[0].style.width = 'calc(100vw - 56px - 32px - 12px)'; 
		/*===== обработка клика по кнопке===== */
		for(let i = 0; i < buttons.length; i++){
			buttons[i].addEventListener('click', function() {
				const parent = buttons[i].parentNode;
				/*делаем все кнопки сначала одной ширины */
				for(btn of buttons){
					btn.style.width = '56px';
				}
				/*кнопке по которой был клик, задаем динамичную ширину */
				if( i > 0 && i < (buttons.length - 1)){buttons[i].style.width = 'calc(100vw - 168px)';	}
				else{
					buttons[i].style.width = 'calc(100vw - 56px - 32px - 12px)';	
				}
				/*вычисляем , на сколько надо сдвинуть родителя, в зависимости от номера кнопки */
				const offsetLength = -((i-1) * 56 + ((i-1) * 12));
				const stopScrolling = buttons[buttons.length-1];
					
				if( i <2 ){parent.style.transform =`translateX(0)`;}
				else if( i == buttons.length - 1){parent.style.transform =`translateX(-272px)`;}
				else {parent.style.transform =`translateX(${offsetLength}px)`;}
			});
		}
	}
	/***********COUNTRIES SLIDER********* */
	/*=================COUNTRY FLAGS SLIDER ================== */
	const swiperRoot = document.querySelector('.country-swiper');
	if(swiperRoot){

		var mySwiper  = new Swiper(".country-swiper", {
		slidesPerView: 'auto',
		speed: 1000,
		autoWidth: true,
		
		navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			}
		});
	
		// Флаг для отслеживания перетаскивания
		var isDragging = false;

		mySwiper.on('sliderMove', function() {
			isDragging = true;
		});

		mySwiper.on('touchEnd', function() {
		setTimeout(function() { 
			isDragging = false;
		}, 100);
		});

		// Создаем блок один раз и добавляем его в первый слайд
		var block = document.createElement('div');
		block.className = 'new-block';
		mySwiper.slides[0].appendChild(block);

		// Функция для перемещения блока и обновления его ширины
		function moveBlockToClickedSlide(slide) {
			if (!isDragging && !slide.classList.contains('active')) {
				// Удаляем класс active со всех слайдов
				mySwiper.slides.forEach(function(el) {
				el.classList.remove('active');
				});

				// Добавляем класс active к выбранному слайду
				slide.classList.add('active');

				// Рассчитываем смещение для блока
				var offset = slide.offsetLeft - mySwiper.wrapperEl.offsetLeft;
				
				// Обновляем позицию и ширину блока
				block.style.left = offset + 'px';
				block.style.width = slide.offsetWidth + 'px'; 
			}
		}

		// Добавляем обработчик клика, который перемещает блок, но не слайдер
		mySwiper.slides.forEach(function(slide) {
			slide.addEventListener('click', function() {
				moveBlockToClickedSlide(this);
			});
		});

		// Перемещаем блок в первый слайд при загрузке страницы
		moveBlockToClickedSlide(mySwiper.slides[0]);
		
		// Изменение стилей для new-block
		block.style.height = '2px'; // Высота блока
		block.style.width = mySwiper.slides[0].offsetWidth + 'px'; 
		block.textContent = ''; // Удаление текста из блока

		// Обработчик события resize для обновления ширины new-block
		window.addEventListener('resize', function() {
		var activeSlide = document.querySelector('.swiper-slide.active');
		if (activeSlide) {
			block.style.width = activeSlide.offsetWidth + 'px'; 
			block.style.left = activeSlide.offsetLeft - mySwiper.wrapperEl.offsetLeft + 'px';
		}
		});

		// Добавляем обработчик события на изменение слайда
		mySwiper.on('slideChangeTransitionEnd', function() {
		
		var activeIndex = mySwiper.activeIndex;
		document.querySelectorAll('.scool-description').forEach(function(content) {
			content.classList.remove('active');
		});

		var activeContent = document.querySelectorAll('.scool-description')[activeIndex];
		activeContent.classList.add('active');
		});

		// Добавляем обработчик клика по слайду
		mySwiper.slides.forEach(function(slide, index) {
			slide.addEventListener('click', function() {
				
				document.querySelectorAll('.scool-description').forEach(function(content) {
				content.classList.remove('active');
				});

				var activeContent = document.querySelectorAll('.scool-description')[index];
				activeContent.classList.add('active');
			});
		});
		mySwiper.off('slideChangeTransitionEnd');
		window.dispatchEvent(new Event('resize'));
	}	
});
