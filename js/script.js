document.addEventListener('click', burgerInit);

function burgerInit(e) {
    const burgerIcon = e.target.closest('.burger-icon');
    const burgerNavLink = e.target.closest('.nav__link');

    if(!burgerIcon && !burgerNavLink) return
    if(document.documentElement.clientWidth > 1000) return


    if(!document.body.classList.contains('body--opened-menu')){
        document.body.classList.add('body--opened-menu')
    } else {
        document.body.classList.remove('body--opened-menu')
    }
}




// --------------feedback-slider
const swiper = new Swiper('.feedback__slider', {
    slidesPerView: 1, 
    // centeredSlides: true, 
        // slidesOffsetBefore: 1,
        // initialSlide: 0,
    loop: false,
    scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
    breakpoints: {
    601:{
      slidesPerView: 3,
      spaceBetween: 10,
      // centeredSlides: false, 
    }
  }
});
// --------------portfolio-slider
new Swiper('.portfolio__slider', {
  
    slidesPerView: 1, 
    loop: true,
    navigation: {
        nextEl: '.portfolio-button-next',
        prevEl: '.portfolio-button-prev',
    },
    
});

class RunningLine {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.phrases = options.phrases || [];
        this.speed = options.speed || 30;
        // this.backgroundColor = options.backgroundColor || 'rgb(248, 107, 53)';
        this.textColor = options.textColor || 'white';
        
        this.init();
    }

    init() {
        this.container.parentElement.style.backgroundColor = this.backgroundColor;
        this.container.parentElement.style.color = this.textColor;
        
        this.createLine();
        this.startAnimation();
        
        new ResizeObserver(() => this.startAnimation()).observe(this.container);
    }

    createLine() {
        this.container.innerHTML = '';
        
        // Создаем достаточно копий для заполнения экрана
        const createItem = () => {
            const item = document.createElement('div');
            item.className = 'running-line__item';
            
            this.phrases.forEach((phrase) => {
                const text = document.createElement('div');
                text.className = 'running-line__text';
                text.textContent = phrase;
                item.appendChild(text);
            });
            return item;
        };

        const firstItem = createItem();
        this.container.appendChild(firstItem);
        
        // Дублируем пока не заполним минимум 2 ширины экрана
        const containerWidth = window.innerWidth;
        let itemsWidth = firstItem.offsetWidth;
        
        while (itemsWidth < containerWidth * 2) {
            this.container.appendChild(createItem());
            itemsWidth += firstItem.offsetWidth;
        }
    }

    startAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        const items = this.container.children;
        if (!items.length) return;
        
        const itemWidth = items[0].offsetWidth;
        const gap = parseInt(getComputedStyle(items[0]).marginRight) || 0;
        const totalWidth = (itemWidth + gap) * items.length;
        
        let offset = 0;
        const step = this.speed / 60; // 60fps
        
        const animate = () => {
            offset -= step;
            
            // Сброс позиции для бесконечной анимации
            if (Math.abs(offset) >= totalWidth / items.length) {
                offset = 0;
                // Переставляем первый элемент в конец
                this.container.appendChild(this.container.firstElementChild);
            }
            
            this.container.style.transform = `translateX(${offset}px)`;
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        this.animationFrame = requestAnimationFrame(animate);
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Создаем три строки с разными настройками
document.addEventListener('DOMContentLoaded', () => {
  const lines = [
    {
      id: 'runningLine1',
      options: {
      phrases: [
                    "#фотосессия   ",
                    "видеосъемка"
                ],
                speed: 14,
            }
        },
        {
            id: 'runningLine2',
            options: {
                phrases: [
                    "продвижение   ",
                    "#медицинское"
                ],
                speed: 10,
            }
        },
        {
            id: 'runningLine3',
            options: {
                phrases: [
                    "#корпоративняндекс  ",
                    "карты",
                    "#сайты"
                ],
                speed: 20.2,
            }
        },
    ];

    const runningLines = lines.map(line => new RunningLine(line.id, line.options));
    
    window.addEventListener('beforeunload', () => {
        runningLines.forEach(line => line.destroy());
    });
});







// --------------feedback-slider
new Swiper('.about__slider', {
    slidesPerView: 1, 
    centeredSlides: true, 
    // 
        // slidesOffsetBefore: 1,
        // initialSlide: 0,
    loop: true,
    navigation: {
      nextEl: '.about-button-next',
      prevEl: '.about-button-prev',
    },
    
    breakpoints: {
    601:{
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false, 
    },
    801:{
      slidesPerView: 3,
      spaceBetween: 10,
    }
  }
});


// --------------accordion-faq
const accordionLists = document.querySelectorAll('.accordion-list');

accordionLists.forEach(el => {

  el.addEventListener('click', (e) => {

    const accordionList = e.currentTarget
    const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
    const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')

    const accordionControl = e.target.closest('.accordion-list__control');
    if (!accordionControl) return
    e.preventDefault()
    const accordionItem = accordionControl.parentElement;
    const accordionContent = accordionControl.nextElementSibling;

    if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
      accordionOpenedItem.classList.remove('accordion-list__item--opened');
      accordionOpenedContent.style.maxHeight = null;
    }
    accordionItem.classList.toggle('accordion-list__item--opened');

    if (accordionItem.classList.contains('accordion-list__item--opened')) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
    } else {
      accordionContent.style.maxHeight = null;
    }

    });

});


// --------------input-tel
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Inputmask === 'function') {
    Inputmask("+7 (999) 999-99-99").mask('input[type="tel"]');
  }
});


// --------------file
const fileInput = document.getElementById('file__input');
const fileName = document.getElementById('file__name');
// const btnDelete = document.querySelector('.btn-delete')

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0]; 
      if (file) {
            fileName.textContent =  file.name;
        } else {
            fileName.textContent = 'Файл не выбран';
        }
});

// btnDelete.addEventListener('click', function(){
//       fileInput.value = '';
//       fileName.textContent = 'Файл не выбран';
// })
