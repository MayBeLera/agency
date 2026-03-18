document.addEventListener('click', burgerInit);

function burgerInit(e) {
    const burgerIcon = e.target.closest('.burger-icon');
    const burgerNavLink = e.target.closest('.nav-link');
    // const headerButtons = document.querySelector('.header__btns')

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
    spaceBetween: 10,
    slidesPerView: 3, 
    // centeredSlides: true, 
        // slidesOffsetBefore: 1,
        // initialSlide: 0,
    loop: true,
});


// --------------feedback-slider
new Swiper('.about__slider', {
    spaceBetween: 10,
    slidesPerView: 3, 
    // centeredSlides: true, 
        // slidesOffsetBefore: 1,
        // initialSlide: 0,
    loop: true,
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
