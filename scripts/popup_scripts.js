document.addEventListener('DOMContentLoaded', () => {
  const instances = Array.from(document.querySelectorAll('.popup-data-inputs'));

  function closeAllTimeLists(exceptRoot = null) {
    document.querySelectorAll('.time-list.show').forEach(list => {
      const root = list.closest('.popup-data-inputs');
      if (root !== exceptRoot) list.classList.remove('show');
      const picker = root && root.querySelector('.time-picker');
      if (picker) picker.classList.remove('open');
      if (picker) picker.setAttribute('aria-expanded', 'false');
    });
  }
  function closeAllCalendars(exceptRoot = null) {
    document.querySelectorAll('.calendar-popup.open').forEach(popup => {
      const root = popup.closest('.popup-data-inputs');
      if (root !== exceptRoot) popup.classList.remove('open');
      const datePicker = root && root.querySelector('.date-picker');
      if (datePicker) datePicker.setAttribute('aria-expanded', 'false');
    });
  }

  instances.forEach(root => {
    const picker = root.querySelector('.date-picker');
    const popup = root.querySelector('.calendar-popup');
    const titleEl = popup && popup.querySelector('.calendar-title');
    const grid = popup && popup.querySelector('.calendar-grid');
    const prevBtn = popup && popup.querySelector('.cal-prev');
    const nextBtn = popup && popup.querySelector('.cal-next');
    const displayText = picker && picker.querySelector('.data-picker-text');

    const tPicker = root.querySelector('.time-picker');
    const tList = root.querySelector('.time-list');
    const tText = root.querySelector('.time-picker-text');

    if (picker && popup && titleEl && grid && prevBtn && nextBtn && displayText) {
      let selected = null;
      let viewYear, viewMonth;
      const today = new Date();
      const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      selected = todayDateOnly;
      displayText.textContent = formatRu(selected);
      viewYear = selected.getFullYear();
      viewMonth = selected.getMonth();

      function formatRu(d){
        return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
      }

      function renderCalendar(year, month){
        grid.innerHTML = '';
        const monthStr = new Date(year, month, 1).toLocaleString('ru-RU', { month: 'long' });
        titleEl.textContent = monthStr[0].toUpperCase() + monthStr.slice(1) + ' ' + year;

        const firstDate = new Date(year, month, 1);
        let startWeekday = firstDate.getDay(); 
        startWeekday = (startWeekday + 6) % 7; 

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevDays = startWeekday;
        const prevMonthLastDate = new Date(year, month, 0).getDate();

        for (let i = prevMonthLastDate - prevDays + 1; i <= prevMonthLastDate; i++){
          const el = document.createElement('div');
          el.className = 'day muted';
          el.textContent = i;
          grid.appendChild(el);
        }

        // текущий
        for (let d = 1; d <= daysInMonth; d++){
          const el = document.createElement('div');
          el.className = 'day';
          el.setAttribute('tabindex', '0');
          el.setAttribute('role', 'button');
          const thisDate = new Date(year, month, d);
          const wd = thisDate.getDay();
          if (wd === 0 || wd === 6) el.classList.add('weekend');
          el.textContent = d;
          if (selected && selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === d) {
            el.classList.add('selected');
          }
          const onSelect = (ev) => {
            ev.stopPropagation();
            selected = new Date(year, month, d);
            displayText.textContent = formatRu(selected);

            try {
              picker.dataset.userSelected = 'true';
              picker.dataset.selectedText = formatRu(selected);
            } catch(e){  }

            closePopup();
          };
          el.addEventListener('pointerdown', onSelect);
          el.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onSelect(ev); }
          });
          grid.appendChild(el);
        }

        const totalCells = grid.children.length;
        const cellsToAdd = (7 * Math.ceil(totalCells / 7)) - totalCells;
        for (let i = 1; i <= cellsToAdd; i++){
          const el = document.createElement('div');
          el.className = 'day muted';
          el.textContent = i;
          grid.appendChild(el);
        }
      }

      let outsideHandler = null;
      let keyHandler = null;

      function openPopup(){
        closeAllTimeLists(root);
        popup.classList.add('open');
        popup.setAttribute('aria-hidden', 'false');
        picker.setAttribute('aria-expanded', 'true');

        setTimeout(()=> {
          const sel = popup.querySelector('.calendar-grid .day.selected');
          const firstDay = sel || popup.querySelector('.calendar-grid .day:not(.muted)');
          if (firstDay) try { firstDay.focus(); } catch(e){}
        }, 150);

        outsideHandler = (e) => {
          if (!popup.contains(e.target) && !picker.contains(e.target)) closePopup();
        };
        keyHandler = (e) => { if (e.key === 'Escape') closePopup(); };
        document.addEventListener('pointerdown', outsideHandler);
        document.addEventListener('keydown', keyHandler);
      }
      function closePopup(){
        popup.classList.remove('open');
        popup.setAttribute('aria-hidden', 'true');
        picker.setAttribute('aria-expanded', 'false');
        if (outsideHandler) document.removeEventListener('pointerdown', outsideHandler);
        if (keyHandler) document.removeEventListener('keydown', keyHandler);
        outsideHandler = keyHandler = null;
      }

      function togglePopup(){
        if (popup.classList.contains('open')) closePopup();
        else {
          renderCalendar(viewYear, viewMonth);
          openPopup();
        }
      }

      prevBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; }
        renderCalendar(viewYear, viewMonth);
      });
      nextBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; }
        renderCalendar(viewYear, viewMonth);
      });

      picker.addEventListener('pointerdown', (e) => { e.preventDefault(); togglePopup(); });
      picker.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePopup(); } });

      popup.addEventListener('pointerdown', (e) => e.stopPropagation());

      renderCalendar(viewYear, viewMonth);
    } 

    if (tPicker && tList && tText) {
      (function setDefaultTime() {
        const items = Array.from(tList.querySelectorAll('.time-item'));
        if (!items.length) return;
        const firstAvailable = items.find(i => i.getAttribute('aria-disabled') !== 'true' && !i.classList.contains('time-item--disabled')) || items[0];
        items.forEach(i => { i.classList.remove('time-item--selected'); i.setAttribute('tabindex', '0'); i.setAttribute('role', 'option'); });
        firstAvailable.classList.add('time-item--selected');
        const val = firstAvailable.dataset.value || firstAvailable.textContent.trim();
        tText.textContent = val;
      })();

      function openList() {
        closeAllCalendars(root);
        tPicker.classList.add('open');
        tList.classList.add('show');
        tPicker.setAttribute('aria-expanded', 'true');

        const formEl = root.closest('form');
        if (formEl) formEl.classList.add('no-nav');

        const outside = (e) => {
          if (!tPicker.contains(e.target) && !tList.contains(e.target)) closeList();
        };
        const keyEsc = (e) => { if (e.key === 'Escape') closeList(); };

        tList._outsideHandler = outside;
        tList._keyHandler = keyEsc;
        document.addEventListener('pointerdown', outside);
        document.addEventListener('keydown', keyEsc);
      }
      function closeList() {
        tPicker.classList.remove('open');
        tList.classList.remove('show');
        tPicker.setAttribute('aria-expanded', 'false');

        const formEl = root.closest('form');
        if (formEl) formEl.classList.remove('no-nav');

        if (tList._outsideHandler) document.removeEventListener('pointerdown', tList._outsideHandler);
        if (tList._keyHandler) document.removeEventListener('keydown', tList._keyHandler);
        tList._outsideHandler = tList._keyHandler = null;
      }
      function toggleList() { if (tList.classList.contains('show')) closeList(); else openList(); }

      tPicker.addEventListener('pointerdown', (e) => { e.stopPropagation(); e.preventDefault(); toggleList(); });

      tList.addEventListener('pointerdown', (e) => {
      if (tList.classList.contains('show')) {
        const anchor = e.target.closest('a');
        if (anchor) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          e.preventDefault();
        }
      }

      const item = e.target.closest('.time-item');
      if (!item) return;

      if (item.classList.contains('time-item--disabled') || item.getAttribute('aria-disabled') === 'true') return;

      tList.querySelectorAll('.time-item').forEach(i => i.classList.remove('time-item--selected'));
      item.classList.add('time-item--selected');

      const val = item.dataset.value || item.textContent.trim();
      if (tText) tText.textContent = val;

      if (tPicker) {
        tPicker.dataset.userSelected = 'true';
        tPicker.dataset.selectedTime = val;
      }

      closeList();
    });

      tList.addEventListener('keydown', (e) => {
        const focused = document.activeElement;
        if (!focused || !focused.classList.contains('time-item')) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); focused.click(); }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const items = Array.from(tList.querySelectorAll('.time-item'));
          const idx = items.indexOf(focused);
          const next = e.key === 'ArrowDown' ? items[idx+1] : items[idx-1];
          if (next) next.focus();
        } else if (e.key === 'Escape') { closeList(); tPicker.focus(); }
      });
    } 
  });
});



// Модальное окно Успеха 

(function(){
  var inited = false;
  var overlays = {}; 

  function init() {
    if (inited) return;
    inited = true;

    var nodeList = document.querySelectorAll('.modal-overlay');
    if (!nodeList || nodeList.length === 0) {
      console.warn('Нет элементов .modal-overlay в DOM');
      return;
    }

    nodeList.forEach(function(ov, i){
      var type = (ov.dataset && ov.dataset.modal) ? ov.dataset.modal.toLowerCase()
                : (i === 0 ? 'success' : (i === 1 ? 'error' : 'modal' + i));
      overlays[type] = ov;

      ov.setAttribute('aria-hidden', ov.classList.contains('open') ? 'false' : 'true');

      ov.addEventListener('click', function(e){
        if (e.target === ov) hideByType(type);
      });

      var closeBtns = ov.querySelectorAll('.success-modal-close, .modal-go-back-btn');
      closeBtns.forEach(function(btn){
        btn.addEventListener('click', function(e){
          e.preventDefault();
          hideByType(type);
        });
      });
    });
  }

  function showByType(type) {
    if (!inited && document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function onLoad(){
        init();
        showByType(type); 
      }, { once: true });
      return;
    }

    init();
    var ov = overlays[type];
    if (!ov) {
      console.warn('Overlay не найден для типа:', type);
      return;
    }
    ov.classList.add('open');
    ov.setAttribute('aria-hidden', 'false');
  }

  function hideByType(type) {
    if (!inited && document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function(){
        init();
        hideByType(type);
      }, { once: true });
      return;
    }

    init();
    var ov = overlays[type];
    if (!ov) return;
    ov.classList.remove('open');
    ov.setAttribute('aria-hidden', 'true');
  }

  window.showSuccessModal = function(){ showByType('success'); };
  window.hideSuccessModal = function(){ hideByType('success'); };
  window.showErrorModal   = function(){ showByType('error'); };
  window.hideErrorModal   = function(){ hideByType('error'); };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();


// Вызовы и скрытие модальных окон

// showSuccessModal();
// hideSuccessModal();
// showErrorModal();
// hideErrorModal();








(function(){
  function formatRuFromText(text) { return text && text.trim() ? text.trim() : null; }
  function todayRu(){ return new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }); }

  document.addEventListener('pointerdown', function(e){
    const day = e.target.closest('.calendar-grid .day');
    if (day && !day.classList.contains('muted')) {
      const root = day.closest('.popup-data-inputs');
      if (!root) return;
      const picker = root.querySelector('.date-picker');
      const display = root.querySelector('.data-picker-text');
      if (picker && display) {
        picker.dataset.userSelected = 'true';
        picker.dataset.selectedText = formatRuFromText(display.textContent);
      }
    }
    const timeItem = e.target.closest('.time-item');
    if (timeItem) {
      const root = timeItem.closest('.popup-data-inputs');
      if (!root) return;
      const tPicker = root.querySelector('.time-picker');
      const val = timeItem.dataset.value || timeItem.textContent.trim();
      if (tPicker) {
        tPicker.dataset.userSelected = 'true';
        tPicker.dataset.selectedTime = val;
      }
    }
  }, true);

  window.formReset = function(form){
    if (!form) return;
    try { form.reset(); } catch (e) {}
    form.querySelectorAll('.invalid-checkbox').forEach(el => el.classList.remove('invalid-checkbox'));
    const dateTextEls = form.querySelectorAll('.data-picker-text');
    dateTextEls.forEach(el => el.textContent = todayRu());
    form.querySelectorAll('.calendar-grid .day.selected').forEach(d => d.classList.remove('selected'));
    form.querySelectorAll('.date-picker, .time-picker').forEach(p => {
      delete p.dataset.userSelected;
      delete p.dataset.selectedText;
      delete p.dataset.selectedTime;
    });
    form.querySelectorAll('.time-list').forEach(list => {
      const parent = list.closest('.popup-data-inputs');
      const tText = parent && parent.querySelector('.time-picker-text');
      const first = list.querySelector('.time-item:not(.time-item--disabled)') || list.querySelector('.time-item');
      if (tText && first) tText.textContent = first.dataset.value || first.textContent.trim();
      list.querySelectorAll('.time-item').forEach(i => i.classList.remove('time-item--selected'));
      if (first) first.classList.add('time-item--selected');
      list.classList.remove('show');
    });
    form.querySelectorAll('.calendar-popup.open').forEach(p => p.classList.remove('open'));
    form.querySelectorAll('.time-picker.open').forEach(p => p.classList.remove('open'));
  };

  function handleFormSubmit(e){
    const form = e.target;
    if (!(form && form.tagName === 'FORM')) return;
    e.preventDefault();

    form.querySelectorAll('.invalid-checkbox').forEach(el => el.classList.remove('invalid-checkbox'));

    const requiredCheckboxes = Array.from(form.querySelectorAll('input[type="checkbox"]')).filter(cb => cb.hasAttribute('required') || cb.getAttribute('aria-required') === 'true' );
    let invalid = false;
    requiredCheckboxes.forEach(cb => {
      if (!cb.checked) {
        cb.classList.add('invalid-checkbox');
        const id = cb.getAttribute('id');
        if (id) {
          const lab = form.querySelector('label[for="' + id + '"]');
          if (lab) lab.classList.add('invalid-checkbox');
        }
        invalid = true;
      }
    });
    if (invalid) return;

    const formData = new FormData(form);
    const dataObj = {};
    for (const [k, v] of formData.entries()) {
      if (dataObj.hasOwnProperty(k)) {
        if (!Array.isArray(dataObj[k])) dataObj[k] = [dataObj[k]];
        dataObj[k].push(v);
      } else {
        dataObj[k] = v;
      }
    }

    const datePicker = form.querySelector('.date-picker');
    let selectedDate = null;
    if (datePicker) {
      if (datePicker.dataset.userSelected === 'true' || datePicker.dataset.selectedText) {
        selectedDate = datePicker.dataset.selectedText || (form.querySelector('.data-picker-text') && form.querySelector('.data-picker-text').textContent.trim());
      } else {
        selectedDate = todayRu();
      }
    } else {
      selectedDate = todayRu();
    }
    if (selectedDate) dataObj.selected_date = selectedDate;

    const timePicker = form.querySelector('.time-picker');
    let selectedTime = null;
    if (timePicker) {
      if (timePicker.dataset.userSelected === 'true' || timePicker.dataset.selectedTime) {
        selectedTime = timePicker.dataset.selectedTime || (form.querySelector('.time-picker-text') && form.querySelector('.time-picker-text').textContent.trim());
      } else {
        const tList = form.querySelector('.time-list');
        if (tList) {
          const preselected = tList.querySelector('.time-item.time-item--selected') || tList.querySelector('.time-item:not(.time-item--disabled)') || tList.querySelector('.time-item');
          if (preselected) selectedTime = preselected.dataset.value || preselected.textContent.trim();
        } else {
          selectedTime = (form.querySelector('.time-picker-text') && form.querySelector('.time-picker-text').textContent.trim()) || null;
        }
      }
    } else {
      selectedTime = null;
    }
    if (selectedTime) dataObj.selected_time = selectedTime;

    const pageUrlInput = form.querySelector('input[name="page_url"], input[name="page_url2"]');
    if (pageUrlInput) dataObj.page_url = pageUrlInput.value;
    dataObj.submitted_at = (new Date()).toISOString();

    console.log('Заявка:', dataObj);

    formReset(form);

  }

  document.addEventListener('DOMContentLoaded', function(){
    const forms = Array.from(document.querySelectorAll('form'));
    forms.forEach(f => {
      if (f._hasCustomSubmitHandler) return;
      f.addEventListener('submit', handleFormSubmit);
      f._hasCustomSubmitHandler = true;
    });
  });
})();








// Блокируем переход по ссылкам когда выбираем дату или время

let activePopups = 0; 
let disableLinksListener = null;

function disableAllLinks() {
    if (!disableLinksListener) {
        disableLinksListener = function(event) {
            const target = event.target.closest('a');
            if (target) {
                event.preventDefault();
                console.log('Переход по ссылке запрещён:', target.href);
            }
        };
        document.addEventListener('click', disableLinksListener);
    }
}

function enableAllLinks() {
    if (disableLinksListener && activePopups === 0) {
        document.removeEventListener('click', disableLinksListener);
        console.log('Переходы по ссылкам разрешены');
        disableLinksListener = null;
    }
}

function watchPopup(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    const hasOpenClass = target.classList.contains('show') || target.classList.contains('open');

                    if (hasOpenClass && !target.dataset.popupOpen) {
                        target.dataset.popupOpen = 'true';
                        console.log('Попап открыт', target);
                        activePopups++;
                        disableAllLinks();
                    } else if (!hasOpenClass && target.dataset.popupOpen) {
                        delete target.dataset.popupOpen;
                        console.log('Попап закрыт', target);
                        activePopups--;
                        setTimeout(enableAllLinks, 50);
                    }
                }
            });
        });

        observer.observe(el, { attributes: true, subtree: true });
    });
}

// Отслеживаем все формы и меню
watchPopup('form');
watchPopup('.time-list');