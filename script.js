const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

function correctApiKey() {
  try {
    return getApiKey();
  } catch (error) {
    console.log(
      '%cTo hear the joke, you need to enter a valid API Key from\nhttp://www.voicerss.org/personel/',
      'color: orange; font-weight: bold; font-size: 16px'
    );

    return '';
  }
}

function tellMe(joke) {
  VoiceRSS.speech({
    key: correctApiKey(),
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
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

console.clear();
