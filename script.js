const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const volumeModal = document.getElementById('volume-modal');
const jokeModal = document.getElementById('joke-modal');
const jokeModalBodyText = document.getElementById('joke-modal-body-text');
const volumeModalClose = document.getElementById('volume-modal-close');
const volume = document.getElementById('volume');
const github = document.getElementById('github');

// Disable / Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

function getApiKey(joke) {
  try {
    // key should be provided in 'key.js' file in the following format
    // const key = 'ABC123'

    return key;
  } catch (error) {
    console.log(
      '%cTo hear the joke, you need to enter a valid API Key from\nhttp://www.voicerss.org/personel/',
      'color: orange; font-weight: bold; font-size: 16px'
    );

    const wordsPerMin = 200;
    const numberOfWords = joke.split(' ').length;
    const extraTimeInMs = 3000;
    const timeoutInMs = Math.floor((numberOfWords / wordsPerMin) * 60000 + extraTimeInMs);

    reduceTime(timeoutInMs);
    toggleButton();

    setTimeout(() => {
      hideModal();
      toggleButton();
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
  jokeModal.style.display = 'none';
  jokeModalBodyText.innerText = '';
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

    jokeModal.style.display = 'block';
    jokeModalBodyText.innerText = joke;

    // Text to Speech
    tellMe(joke);

    // Disable Button
    toggleButton();
  } catch (error) {
    // catch error here
  }
}

function browseCode() {
  window.open('https://github.com/patel-priyank/Joke-Teller/');
}

// Event Listeners
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);

github.addEventListener('click', browseCode);

volume.addEventListener('click', () => {
  volumeModal.style.display = 'block';
});

volumeModalClose.addEventListener('click', () => {
  volumeModal.style.display = '';
});

// Hide Modal after Joke ended
audioElement.addEventListener('ended', hideModal);

console.clear();

function reduceTime(timeoutInMs) {
  $(function () {
    $d = timeoutInMs; // duration
    $w = $('.joke-modal-content').width(); // modal width

    $('.timer').animate({ width: 0 }, 0);
    $('.timer').animate({ width: $w }, $d, 'linear');
  });
}
