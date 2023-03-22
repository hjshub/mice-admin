//
//-----------------------------------------------------------------
// 공통 스크립트
//-----------------------------------------------------------------
//

const gb = (function () {
  return {
    wW: window.innerWidth,
    wH: window.innerHeight,
    html: $('html'),
    body: $('body'),
    main: $('main'),
    sideMenu: document.querySelectorAll('.side-mid li'),
    btnActiveModal: $('.btn-active-modal'),
    isMob: window.innerWidth <= 768 ? true : false,
    isMobTab: false,
  };
})();

window.addEventListener('load', () => {
  gb.CommonFunction.init();
});

gb.CommonFunction = (function () {
  const snb = () => {
    const u = location.pathname;

    gb.sideMenu.forEach(function (el) {
      const h = $(el).find('> a').attr('href').split('/');
      if (u.indexOf(h[h.length - 2]) !== -1) {
        $(el).addClass('on');
      }
    });
  };
  const modalOn = () => {
    // 공통 모달 열기
    gb.btnActiveModal.on('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      const trg = $(this);
      const modalName = trg.data('modal-name');

      $('.modal').removeClass('zoomIn');
      $('.dimmed').remove();

      trg.addClass('selected');
      trg.closest('.list-item').addClass('on');
      $('.modal#modal-' + modalName).addClass('zoomIn');

      gb.body.append('<div class="dimmed btn-close-modal"></div>');
      gb.body.css({
        height: '100vh',
        'overflow-y': 'hidden',
      });
    });

    $(document).on('click', '.btn-close-modal', () => {
      modalOff();
    });
  };
  const modalOff = () => {
    // 공통 모달 닫기
    gb.btnActiveModal.removeClass('selected');
    $('.list-item').removeClass('on');
    $('.modal').removeClass('zoomIn');
    $('.dimmed').remove();

    gb.body.css({
      height: 'auto',
      'overflow-y': 'visible',
    });
  };
  const fileUpload = (el, type) => {
    // input file
    const pathpoint = el.value.lastIndexOf('.');
    const filepoint = el.value.substring(pathpoint + 1, el.length);
    const filetype = filepoint.toLowerCase(); // 업로드 파일 확장자
    const fileReader = new FileReader();
    const fileName = $(el)[0].files[0].name; // 첨부 파일 명
    const filesize = $(el)[0].files[0].size; // 첨부 파일 용량

    fileReader.readAsDataURL($(el)[0].files[0]);

    if (type == 'image') {
      // 이미지 업로드
      if (filetype == 'jpg' || filetype == 'gif' || filetype == 'png' || filetype == 'jpeg' || filetype == 'bmp') {
        // 정상적인 이미지 확장자 파일일 경우
        // fileReader.onload = function (e) {
        //   $(el).closest('.file-up-list').find('.file-attach-image img').attr('src', e.target.result);
        // };
      } else {
        alert('이미지 파일만 선택 할 수 있습니다.');
        parentObj = el.parentNode;
        node = parentObj.replaceChild(el.cloneNode(true), el);
        return false;
      }
    }

    $(el).closest('.file-attach').find('.text-wrap input[type=text]').val(fileName);
  };
  const toolTipOver = () => {
    gb.tipOver = $('.toolTipBox').filter('._hover');

    gb.tipOver.each(function () {
      const trg = $(this);

      trg.on({
        'mouseenter focusin': function () {
          const trgOffsetTop = trg.offset().top;
          const currentScrollTop = document.documentElement.scrollTop;
          const clientHeight = document.documentElement.clientHeight;
          const scrollHeight = currentScrollTop + clientHeight;
          const _clientY = trgOffsetTop - currentScrollTop;
          const clientY = scrollHeight - trgOffsetTop;

          if (_clientY >= clientY) {
            trg.find('.toolTip').removeClass('up').addClass('down');
          } else {
            trg.find('.toolTip').removeClass('down').addClass('up');
          }

          console.log(_clientY, clientY);

          trg.closest('.list-item').addClass('active');
          trg.find('.toolTip').stop().fadeIn(300);
        },
        'mouseleave focusout': function () {
          const trgOffsetTop = trg.offset().top;
          const currentScrollTop = document.documentElement.scrollTop;
          const clientHeight = document.documentElement.clientHeight;
          const scrollHeight = currentScrollTop + clientHeight;
          const _clientY = trgOffsetTop - currentScrollTop;
          const clientY = scrollHeight - trgOffsetTop;

          if (_clientY >= clientY) {
            trg.find('.toolTip').removeClass('up').addClass('down');
          } else {
            trg.find('.toolTip').removeClass('down').addClass('up');
          }

          trg.closest('.list-item').removeClass('active');
          trg.find('.toolTip').stop().fadeOut(100);
        },
      });
    });
  };
  const toolTipEdit = () => {
    gb.edit = document.querySelectorAll('.edit');

    gb.edit.forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const trg = $(this);
        const trgOffsetTop = trg.offset().top;
        const currentScrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = currentScrollTop + clientHeight;
        const _clientY = trgOffsetTop - currentScrollTop;
        const clientY = scrollHeight - trgOffsetTop;

        if (_clientY >= clientY) {
          trg.next('.toolTip').removeClass('up').addClass('down');
        } else {
          trg.next('.toolTip').removeClass('down').addClass('up');
        }

        if (trg.closest('.toolTipBox').hasClass('active')) {
          trg.closest('.toolTipBox').removeClass('active');
          trg.closest('.list-item').removeClass('selected');
          trg.next('.toolTip').stop().fadeOut(300);
        } else {
          $('.toolTipBox').removeClass('active');
          $('.list-item').removeClass('selected');
          trg.closest('.toolTipBox').addClass('active');
          trg.closest('.list-item').addClass('selected');
          $('.toolTipBox').find('.toolTip').stop().fadeOut(300);
          trg.next('.toolTip').stop().fadeIn(300);
        }
      });
    });
  };
  const activate = (t) => {
    $(t).closest('.list-item').removeClass('disabled');
  };
  const niceSelect = () => {
    $('.select-wrap:not(.default) select').niceSelect();
  };
  const showInput = () => {
    const input = document.querySelectorAll('.input');

    input.forEach((el) => {
      el.addEventListener('click', function () {
        this.firstElementChild.style.opacity = 1;
      });
    });
  };
  const createCalendar = function () {
    const defaultOption = {
      closeText: '닫기',
      currentText: '오늘',
      prevText: '이전 달',
      nextText: '다음 달',
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      weekHeader: '주',
      yearSuffix: '년',
    };

    $.datepicker.setDefaults(defaultOption);

    $('.calendar > input[type=text]').datepicker({
      showOn: 'both',
      dateFormat: 'yy-mm-dd',
      minDate: 'd',
    });
  };
  const createTimePicker = function () {
    $('.time > input[type=text]').timepicker({
      timeFormat: 'hh:mm p',
      interval: 60,
      minTime: '00:00',
      maxTime: '12:00pm',
      defaultTime: '06:00',
      startTime: '06:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true,
    });
  };
  const listDropDown = function () {
    gb.btnDropDown = $('.btn-dropDown');

    gb.btnDropDown.on('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      const trg = $(this);

      if (trg.hasClass('on')) {
        trg.removeClass('on');
        $('.dropDown').stop().slideUp(300);
      } else {
        gb.btnDropDown.not(trg).removeClass('on');
        $('.dropDown').stop().slideUp(300);
        trg.addClass('on');
        trg.closest('li').find('.dropDown').stop().slideDown(300);
      }
    });
  };
  const init = () => {
    snb();
    modalOn();
    toolTipOver();
    toolTipEdit();
    niceSelect();
    showInput();
    createCalendar();
    createTimePicker();
    listDropDown();
  };

  return {
    init,
    modalOff,
    fileUpload,
    activate,
  };
})();
