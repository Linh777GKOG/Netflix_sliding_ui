document.addEventListener('click', (e) => {
  let handle;
  if (e.target.matches('.handle')) {
    handle = e.target;
  } else {
    handle = e.target.closest('.handle');
  }
  if (handle != null) onHandleClick(handle);
});

const throttleProgressBar = throttle(() => {
  document.querySelectorAll('.progress-bar').forEach(calculateProgressBar);
}, 250);
window.addEventListener('resize', throttleProgressBar);

document.querySelectorAll('.progress-bar').forEach(calculateProgressBar);

function calculateProgressBar(progressBar) {
  progressBar.innerHTML = '';
  const slider = progressBar.closest('.row').querySelector('.slider');
  const itemCount = slider.children.length;
  const itemsPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue('--items-per-screen')
  );
  let sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue('--slider-index')
  );
  const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);

  if (sliderIndex >= progressBarItemCount) {
    slider.style.setProperty('--slider-index', progressBarItemCount - 1);
    sliderIndex = progressBarItemCount - 1;
  }

  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement('div');
    barItem.classList.add('progress-item');
    if (i === sliderIndex) {
      barItem.classList.add('active');
    }
    progressBar.append(barItem);
  }
}
