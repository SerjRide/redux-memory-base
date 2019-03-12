const waveEffects = (e) => {
  const wave = document.createElement('div');
  const rect = e.target.getBoundingClientRect()
  const mValue = Math.max(e.target.clientWidth, e.target.clientHeight)
  wave.className = 'pulse';
  wave.style.left = e.clientX - rect.left - (mValue / 2) + 'px';
  wave.style.top = e.clientY - rect.top - (mValue / 2) + 'px';
  e.target.appendChild(wave);

  setTimeout(() => {
    wave.parentNode.removeChild(wave);
  },600)

  console.log();
}

export {
  waveEffects
};
