document.addEventListener('DOMContentLoaded', () => {
  const picker = document.getElementById('datePicker');
  const popup = document.getElementById('calendarPopup');
  const titleEl = popup.querySelector('.calendar-title');
  const grid = popup.querySelector('.calendar-grid');
  const prevBtn = popup.querySelector('.cal-prev');
  const nextBtn = popup.querySelector('.cal-next');
  const displayText = picker.querySelector('.data-picker-text');

  let selected = null; 
  let viewYear, viewMonth;

  function formatRu(d){
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  try {
    const parsed = new Date(displayText.textContent.trim());
    if (!isNaN(parsed)) { selected = parsed; }
  } catch(e){}

  const today = new Date();
  if (!selected) selected = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  viewYear = selected.getFullYear();
  viewMonth = selected.getMonth();

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

    for (let d = 1; d <= daysInMonth; d++){
      const el = document.createElement('div');
      el.className = 'day';
      const thisDate = new Date(year, month, d);
      const wd = thisDate.getDay();
      if (wd === 0 || wd === 6) el.classList.add('weekend');

      el.textContent = d;

      if (selected && selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === d) {
        el.classList.add('selected');
      }

      el.addEventListener('click', () => {
        selected = new Date(year, month, d);
        displayText.textContent = formatRu(selected);
        closePopup();
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

  function openPopup(){
    popup.classList.add('open');
    popup.setAttribute('aria-hidden', 'false');
    picker.setAttribute('aria-expanded', 'true');
    setTimeout(()=> {
      const firstDay = popup.querySelector('.calendar-grid .day:not(.muted)');
      if (firstDay) firstDay.focus?.();
    }, 220);
    document.addEventListener('click', outsideClick);
    document.addEventListener('keydown', onKeyDown);
  }

  function closePopup(){
    popup.classList.remove('open');
    popup.setAttribute('aria-hidden', 'true');
    picker.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', outsideClick);
    document.removeEventListener('keydown', onKeyDown);
  }

  function togglePopup(){
    if (popup.classList.contains('open')) closePopup();
    else {
      const rect = picker.getBoundingClientRect();
      const popupHeightGuess = 320;
      if (rect.bottom + popupHeightGuess > window.innerHeight && rect.top - popupHeightGuess > 0) {
        popup.style.top = 'auto';
        popup.style.bottom = 'calc(100% + 10px)';
      } else {
        popup.style.bottom = 'auto';
        popup.style.top = 'calc(100% + 10px)';
      }

      renderCalendar(viewYear, viewMonth);
      openPopup();
    }
  }

  function outsideClick(e){
    if (!popup.contains(e.target) && !picker.contains(e.target)) closePopup();
  }

  function onKeyDown(e){
    if (e.key === 'Escape') closePopup();
  }

  prevBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar(viewYear, viewMonth);
  });

  nextBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar(viewYear, viewMonth);
  });

  picker.addEventListener('click', (e) => { togglePopup(); });
  picker.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePopup(); }
  });

  popup.addEventListener('click', (e) => e.stopPropagation());

  renderCalendar(viewYear, viewMonth);
});

(function () {
  const picker = document.getElementById('timePicker');
  const list = document.getElementById('timeList');
  const text = document.getElementById('timePickerText');

  function openList() {
    picker.classList.add('open');
    list.classList.add('show');
    picker.setAttribute('aria-expanded', 'true');
  }
  function closeList() {
    picker.classList.remove('open');
    list.classList.remove('show');
    picker.setAttribute('aria-expanded', 'false');
  }
  function toggleList() {
    if (list.classList.contains('show')) closeList(); else openList();
  }

  picker.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleList();
  });

  list.addEventListener('click', (e) => {
    const item = e.target.closest('.time-item');
    if (!item) return;
    if (item.classList.contains('time-item--disabled')) return;

    list.querySelectorAll('.time-item').forEach(i => i.classList.remove('time-item--selected'));

    item.classList.add('time-item--selected');

    const val = item.dataset.value || item.textContent.trim();
    text.textContent = val;

    closeList();

  });

  document.addEventListener('click', (e) => {
    if (!picker.contains(e.target) && !list.contains(e.target)) closeList();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeList();
  });
})();