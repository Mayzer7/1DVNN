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
        if (tList._outsideHandler) document.removeEventListener('pointerdown', tList._outsideHandler);
        if (tList._keyHandler) document.removeEventListener('keydown', tList._keyHandler);
        tList._outsideHandler = tList._keyHandler = null;
      }
      function toggleList() { if (tList.classList.contains('show')) closeList(); else openList(); }

      tPicker.addEventListener('pointerdown', (e) => { e.stopPropagation(); e.preventDefault(); toggleList(); });

      tList.addEventListener('pointerdown', (e) => {
        const item = e.target.closest('.time-item');
        if (!item) return;
        if (item.classList.contains('time-item--disabled') || item.getAttribute('aria-disabled') === 'true') return;
        tList.querySelectorAll('.time-item').forEach(i => i.classList.remove('time-item--selected'));
        item.classList.add('time-item--selected');
        const val = item.dataset.value || item.textContent.trim();
        tText.textContent = val;
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
