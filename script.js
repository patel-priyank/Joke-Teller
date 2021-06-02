const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const modal = document.getElementById('modal');
const modalBodyText = document.getElementById('modal-body-text');

// Disable / Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

function getApiKey(joke) {
  try {
    modal.style.background = '';

    // key should be provided in 'key.js' file in the format
    // const key = 'ABC123'

    return key;
  } catch (error) {
    console.log(
      '%cTo hear the joke, you need to enter a valid API Key from\nhttp://www.voicerss.org/personel/',
      'color: orange; font-weight: bold; font-size: 16px'
    );

    modal.style.background = 'rgba(0, 0, 0, 0.4)';

    const wordsPerMin = 200;
    const numberOfWords = joke.split(' ').length;
    const extraTimeInMs = 3000;
    const timeoutInMs = Math.floor((numberOfWords / wordsPerMin) * 60000 + extraTimeInMs);

    setTimeout(() => {
      hideModal();
    }, timeoutInMs);

    return '';
  }
}

function tellMe(joke) {
  VoiceRSS.speech({
    key: getApiKey(joke),
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

function hideModal() {
  modal.style.display = 'none';
  modalBodyText.innerText = '';
}

// Get Jokes from Joke API
async function getJoke() {
  // Any / Programming, Miscellaneous, Dark, Pun, Spooky, Christmas
  const jokeCategory = 'Programming';

  // nsfw, religious, political, racist, sexist, explicit
  const blacklistFlags = 'nsfw,religious,political,racist,sexist,explicit';

  const apiUrl = `https://v2.jokeapi.dev/joke/${jokeCategory}?blacklistFlags=${blacklistFlags}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const joke = data.joke ? data.joke : `${data.setup} ... ${data.delivery}`;

    console.log(joke);

    modal.style.display = 'block';
    modalBodyText.innerText = joke;

    // Text to Speech
    tellMe(joke);

    // Disable Button
    toggleButton();
  } catch (error) {
    // catch error here
  }
}

// Event Listeners
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);

// Hide Modal after Joke ended
audioElement.addEventListener('ended', hideModal);

console.clear();
