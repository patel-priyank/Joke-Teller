// Create an account on VoiceRSS and enter the API key here
const voiceRssApiKey = 'API_KEY';
const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

const button = document.querySelector('#button');
const audioElement = document.querySelector('#audio');

// Passing joke to VoiceRSS API
const tellJoke = joke => {
  VoiceRSS.speech({
    key: voiceRssApiKey,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
};

// Disable/enable button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Get jokes from Joke API
const getJoke = async () => {
  try {
    let joke = '';
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellJoke(joke);
    toggleButton();
  } catch (error) {
    // Catch error here
  }
};

// Event Listeners
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
