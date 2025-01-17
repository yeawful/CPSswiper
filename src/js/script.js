const mediaQuery = window.matchMedia('(max-width: 767px)');
let swiperInstance = null;

// Функция для инициализации Swiper
function initSwiper() {
    if (mediaQuery.matches && !swiperInstance) {
        const swiperContainer = document.querySelector('.brands-repair__content');
        const swiperWrapper = document.querySelector('.brands-repair__list');
        const swiperSlides = document.querySelectorAll('.brands-repair__item');
        const swiperPagination = document.querySelector('.swiper-pagination');

        if (swiperContainer && swiperWrapper && swiperSlides.length > 0) {
            swiperContainer.classList.add('swiper');
            swiperWrapper.classList.add('swiper-wrapper');
            swiperSlides.forEach(slide => slide.classList.add('swiper-slide'));

            // Инициализация Swiper
            swiperInstance = new Swiper('.brands-repair__content', {
                pagination: swiperPagination ? {
                    el: swiperPagination,
                    type: 'bullets',
                    clickable: true,

                    renderBullet: function (index, className) {
                        // Ограничиваем количество буллетов до 9
                        if (index < 9) {
                            return `<span class="${className}"></span>`;
                        }
                        return ''; // Не отображаем буллеты после 9
                    },

                } : false,
                simulateTouch: true,
                grabCursor: true,
                slideToClickedSlide: true,
                spaceBetween: 16,
                slidesOffsetAfter: 32,
                slidesPerView: 1.2,
                breakpoints: {
                    320: { slidesPerView: 1.3 },
                    480: { slidesPerView: 1.6 },
                    560: { slidesPerView: 1.8 },
                    640: { slidesPerView: 2.0 },
                    720: { slidesPerView: 2.2 },
                },
            });

            // Скрыть пагинацию, если ширина экрана больше 767px
            if (swiperPagination) {
                swiperPagination.style.display = mediaQuery.matches ? 'block' : 'none';
            }
        }
    } else if (!mediaQuery.matches && swiperInstance) {
        // Уничтожение Swiper, если ширина экрана больше или равна 768px
        swiperInstance.destroy(true, true);
        swiperInstance = null;

        // Удаление классов Swiper
        const swiperContainer = document.querySelector('.brands-repair__content');
        const swiperWrapper = document.querySelector('.brands-repair__list');
        const swiperSlides = document.querySelectorAll('.brands-repair__item');

        if (swiperContainer && swiperWrapper && swiperSlides.length > 0) {
            swiperContainer.classList.remove('swiper');
            swiperWrapper.classList.remove('swiper-wrapper');
            swiperSlides.forEach(slide => slide.classList.remove('swiper-slide'));
        }

        // Скрыть пагинацию, если ширина экрана больше 767px
        const swiperPagination = document.querySelector('.swiper-pagination');
        if (swiperPagination) {
            swiperPagination.style.display = 'none';
        }
    }
}

// Инициализация Swiper при загрузке страницы
initSwiper();

// Обработчик изменения размера окна
mediaQuery.addEventListener('change', initSwiper);

// Поиск списка, кнопки раскрытия/скрытия и текста кнопки
const list = document.querySelector('.brands-repair__list');
const expandButton = document.querySelector('.brands-repair__expand-button');
const expandButtonText = document.querySelector('.brands-repair__expand-description');

// Проверка, что все элементы существуют
if (list && expandButton && expandButtonText) {
    // Добавление обработчика клика на кнопку
    expandButton.addEventListener('click', function () {
        // Переключение класса 'brands-repair__list--expanded' для раскрытия/скрытия списка
        list.classList.toggle('brands-repair__list--expanded');
        // Переключение класса 'brands-repair__expand-button--rotated' для поворота кнопки
        expandButton.classList.toggle('brands-repair__expand-button--rotated');
        // Изменение текста кнопки в зависимости от состояния списка
        expandButtonText.textContent = list.classList.contains('brands-repair__list--expanded') ? 'Скрыть' : 'Показать все';
    });
}