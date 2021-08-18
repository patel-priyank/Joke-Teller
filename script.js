const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const volumeModal = document.getElementById('volume-modal');
const jokeModal = document.getElementById('joke-modal');
const jokeModalBodyText = document.getElementById('joke-modal-body-text');
const volumeModalClose = document.getElementById('volume-modal-close');
const volume = document.getElementById('volume');
const github = document.getElementById('github');

const key = '9a17dad19aee4d5c8dfa278eee7f1999';

// Disable / Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMe(joke) {
  VoiceRSS.speech({
    key: key,
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

    jokeModal.style.display = 'block';
    jokeModalBodyText.innerText = joke;

    // Change Joke Teller Header
    document.getElementById('modal-header-text').innerText = 'Joke Teller (Loading...)';

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

function reduceTime(timeoutInMs) {
  $(function () {
    $d = timeoutInMs; // duration
    $w = $('.joke-modal-content').width(); // modal width

    $('.timer').animate({ width: 0 }, 0);
    $('.timer').animate({ width: $w }, $d, 'linear');
  });
}
