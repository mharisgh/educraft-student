document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.getElementById('virtualCityCountdown');

  if (!countdown) {
    return;
  }

  const daysEl = document.getElementById('countDays');
  const hoursEl = document.getElementById('countHours');
  const minutesEl = document.getElementById('countMinutes');
  const secondsEl = document.getElementById('countSeconds');
  const launchLabelEl = document.getElementById('launchDateLabel');
  const launchMessageEl = document.getElementById('launchMessage');

  const launchDateString = countdown.dataset.launchDate;
  const launchDays = Number.parseInt(countdown.dataset.launchDays || '0', 10);
  const launchHours = Number.parseInt(countdown.dataset.launchHours || '0', 10);
  const launchMinutes = Number.parseInt(countdown.dataset.launchMinutes || '0', 10);
  const launchSeconds = Number.parseInt(countdown.dataset.launchSeconds || '0', 10);
  const hasRelativeDuration = [launchDays, launchHours, launchMinutes, launchSeconds].some(
    (value) => Number.isFinite(value) && value > 0
  );

  let launchDate = null;
  let launchLabel = countdown.dataset.launchLabel || launchDateString || '';

  if (hasRelativeDuration) {
    const relativeMs = (
      (Math.max(launchDays, 0) * 86400) +
      (Math.max(launchHours, 0) * 3600) +
      (Math.max(launchMinutes, 0) * 60) +
      Math.max(launchSeconds, 0)
    ) * 1000;

    launchDate = new Date(Date.now() + relativeMs);

    if (!countdown.dataset.launchLabel) {
      launchLabel = `${Math.max(launchDays, 0)} days, ${Math.max(launchHours, 0)} hours, ${Math.max(launchMinutes, 0)} minutes`;
    }
  } else if (launchDateString) {
    launchDate = new Date(launchDateString);
  }

  if (launchLabelEl && launchLabel) {
    launchLabelEl.textContent = `Launch target: ${launchLabel}`;
  }

  if (!launchDate || Number.isNaN(launchDate.getTime())) {
    if (launchMessageEl) {
      launchMessageEl.textContent = 'Set a valid launch date or launch duration to start the countdown.';
    }
    return;
  }

  function setValue(element, value) {
    if (element) {
      element.textContent = String(value).padStart(2, '0');
    }
  }

  function renderCountdown() {
    const now = new Date();
    const diff = launchDate.getTime() - now.getTime();

    if (diff <= 0) {
      setValue(daysEl, 0);
      setValue(hoursEl, 0);
      setValue(minutesEl, 0);
      setValue(secondsEl, 0);

      if (launchMessageEl) {
        launchMessageEl.textContent = 'Virtual City is ready to launch!';
      }

      return true;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setValue(daysEl, days);
    setValue(hoursEl, hours);
    setValue(minutesEl, minutes);
    setValue(secondsEl, seconds);

    return false;
  }

  const finished = renderCountdown();

  if (finished) {
    return;
  }

  const intervalId = window.setInterval(() => {
    const isFinished = renderCountdown();

    if (isFinished) {
      window.clearInterval(intervalId);
    }
  }, 1000);
});
