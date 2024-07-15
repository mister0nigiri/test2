// スワイパー
const swiper = new Swiper('.swiper', {


});



// アコーディオンメニュー
document.addEventListener('DOMContentLoaded', () => {
  setUpAccordion();
});

const setUpAccordion = () => {
  const details = document.querySelectorAll('.js-details');
  const RUNNING_VALUE = 'running';
  const IS_OPENED_CLASS = 'is-opened';

  details.forEach((element) => {
    const summary = element.querySelector('.js-summary');
    const content = element.querySelector('.js-content');
    const closeButton = element.querySelector('.close-button');

    summary.addEventListener('click', (event) => {
      event.preventDefault();
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      if (element.open) {
        element.classList.toggle(IS_OPENED_CLASS);
        const closingAnim = content.animate(closingAnimKeyframes(content),
animTiming);
        element.dataset.animStatus = RUNNING_VALUE;
        closingAnim.onfinish = () => {
          element.removeAttribute('open');
          element.dataset.animStatus = '';
        };
      }else{
        element.setAttribute('open', 'true');
        element.classList.toggle(IS_OPENED_CLASS);
        const openingAnim = content.animate(openingAnimKeyframes(content),
animTiming);
        element.dataset.animStatus = RUNNING_VALUE;
        openingAnim.onfinish = () => {
          element.dataset.animStatus = '';
        };
      }
    });

    if (closeButton) {
      closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (element.open) {
          const closingAnim = content.animate(closingAnimKeyframes(content),
animTiming);
          element.dataset.animStatus = RUNNING_VALUE;
          closingAnim.onfinish = () => {
            element.removeAttribute('open');
            element.dataset.animStatus = '';
          };
        }
      });
    }
  });
}

const animTiming = {
  duration: 400,
  easing: 'ease-out'
};

const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }, {
    height: 0,
    opacity: 0,
  }
];

const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
];