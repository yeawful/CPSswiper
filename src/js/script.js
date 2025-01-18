// Создание медиа-запроса для проверки ширины экрана (максимум 767px)
const mediaQuery = window.matchMedia('(max-width: 767px)');

// Переменная для хранения экземпляра Swiper
let swiperInstance = null;

// Функция для инициализации Swiper
function initSwiper() {
    // Проверка, если ширина экрана меньше или равна 767px и Swiper еще не инициализирован
    if (mediaQuery.matches && !swiperInstance) {
        // Поиск контейнера, обертки, слайдов и пагинации
        const swiperContainer = document.querySelector('.brands-repair__content'); // Ищем контейнер для Swiper, который будет содержать слайд
        const swiperWrapper = document.querySelector('.brands-repair__list');  // Ищем обертку для слайдов
        const swiperSlides = document.querySelectorAll('.brands-repair__item'); // Ищем все слайды внутри обертки
        const swiperPagination = document.querySelector('.swiper-pagination'); // Ищем элемент пагинации (точки для навигации по слайдам)

        // Проверка, что все необходимые элементы существуют
        if (swiperContainer && swiperWrapper && swiperSlides.length > 0) {
            // Добавление классов Swiper к элементам
            swiperContainer.classList.add('swiper');
            swiperWrapper.classList.add('swiper-wrapper');
            swiperSlides.forEach(slide => slide.classList.add('swiper-slide'));

            // Инициализация Swiper
            // eslint-disable-next-line no-undef
            swiperInstance = new Swiper('.brands-repair__content', {
                // Настройка пагинации, если она существует
                pagination: swiperPagination ? {
                    el: swiperPagination, // Указываем элемент для пагинации
                    type: 'bullets',  // Тип пагинации — точки
                    clickable: true, // Делаем точки кликабельными

                    // Функция для отображения буллетов (ограничение до 9)
                    renderBullet: function (index, className) {
                        if (index < 9) {
                            return `<span class="${className}"></span>`;
                        }
                        return ''; 
                    },

                } : false,
                simulateTouch: true, // Включение симуляции касания
                grabCursor: true, // Изменение курсора при наведении
                slideToClickedSlide: true, // Переход к слайду по клику
                spaceBetween: 16, // Расстояние между слайдами
                slidesOffsetAfter: 32, // Отступ после последнего слайда
                slidesPerView: 1.2, // Количество слайдов, видимых одновременно
                breakpoints: {
                    // Настройка количества слайдов в зависимости от ширины экрана
                    320: { slidesPerView: 1.3 },
                    480: { slidesPerView: 1.6 },
                    560: { slidesPerView: 1.8 },
                    640: { slidesPerView: 2.0 },
                    720: { slidesPerView: 2.2 },
                },
            });

            // Скрытие пагинации, если ширина экрана больше 767px
            if (swiperPagination) {
                swiperPagination.style.display = mediaQuery.matches ? 'block' : 'none';
            }
        }
    } else if (!mediaQuery.matches && swiperInstance) {
        // Уничтожение Swiper, если ширина экрана больше или равна 768px
        swiperInstance.destroy(true, true); // Уничтожаем Swiper, освобождая ресурсы
        swiperInstance = null; // Сбрасываем переменную swiperInstance

        // Удаление классов Swiper с элементов
        const swiperContainer = document.querySelector('.brands-repair__content'); 
        const swiperWrapper = document.querySelector('.brands-repair__list');
        const swiperSlides = document.querySelectorAll('.brands-repair__item');

        // Проверяем, что элементы существуют
        if (swiperContainer && swiperWrapper && swiperSlides.length > 0) {
            swiperContainer.classList.remove('swiper');
            swiperWrapper.classList.remove('swiper-wrapper');
            swiperSlides.forEach(slide => slide.classList.remove('swiper-slide'));
        }

        // Скрытие пагинации, если ширина экрана больше 767px
        const swiperPagination = document.querySelector('.swiper-pagination');
        if (swiperPagination) {
            swiperPagination.style.display = 'none';
        }
    }
}

// Инициализация Swiper при загрузке страницы
initSwiper();

// Добавление обработчика изменения размера окна для переинициализации Swiper
mediaQuery.addEventListener('change', initSwiper);

// Поиск списка, кнопки раскрытия/скрытия и текста кнопки
const list = document.querySelector('.brands-repair__list');
const expandButton = document.querySelector('.brands-repair__expand-button');
const expandButtonText = document.querySelector('.brands-repair__expand-description');

// Проверка, что все элементы существуют
if (list && expandButton && expandButtonText) {
    // Добавление обработчика клика на кнопку
    expandButton.addEventListener('click', function () {
        // Переключение класса для раскрытия/скрытия списка
        list.classList.toggle('brands-repair__list--expanded');
        // Переключение класса для поворота кнопки
        expandButton.classList.toggle('brands-repair__expand-button--rotated');
        // Изменение текста кнопки в зависимости от состояния списка
        expandButtonText.textContent = list.classList.contains('brands-repair__list--expanded') ? 'Скрыть' : 'Показать все';
    });
}