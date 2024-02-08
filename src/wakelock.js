var wakeButton;

function enablewake() {
// status paragraph
wakeButton =  document.getElementById('wakebutton');
// change button and status if wakelock becomes aquired or is released
const changeUI = (status = 'acquired') => {
  const acquired = status === 'acquired' ? true : false;
  wakeButton.dataset.status = acquired ? 'on' : 'off';
  wakeButton.textContent = `Turn Wake Lock ${acquired ? 'OFF' : 'ON'}`;
  console.log(`Wake Lock ${acquired ? 'is active!' : 'has been released.'}`);
}

// test support
let isSupported = false;

if ('wakeLock' in navigator) {
  isSupported = true;
  console.log('Screen Wake Lock API supported 🎉');
} else {
  wakeButton.disabled = true;
  console.log('Wake lock is not supported by this browser.');
}

if (isSupported) {
  // create a reference for the wake lock
  let wakeLock = null;

  // create an async function to request a wake lock
  const requestWakeLock = async () => {
    document.getElementById('wakewindow').style.display='none';
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('wakelock done');
    } catch (err) {
      // if wake lock request fails - usually system related, such as battery
      console.log('wakelock not activated');
    }
  } // requestWakeLock()

  // if we click our button
  wakeButton.addEventListener('click', () => {
    // if wakelock is off request it
    if (wakeButton.dataset.status === 'off') {
      requestWakeLock()
    } else { // if it's on release it
      wakeLock.release()
        .then(() => {
          wakeLock = null;
        })
    }
  })

  const handleVisibilityChange = () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      requestWakeLock();
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);

} // isSupported

}
