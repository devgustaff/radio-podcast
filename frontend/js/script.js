let frequencyInput = document.querySelector("#frequencyInput");
let frequencyRange = document.querySelector("#frequencyRange");
let divPodcast = document.querySelector("#podcast");
let podcasts = [];

start();

function start() {
  doFetchPodcast();
  frequencyRange.addEventListener("input", handleInputRangeChange);
}

function handleInputRangeChange(event) {
  const currentFrequency = event.target.value;
  frequencyInput.value = currentFrequency;
  syncFrequency(currentFrequency);
}

function syncFrequency(frequency) {
  divPodcast.innerHTML = "";
  const podcastFound = podcasts.find(
    (podcast) => podcast.frequency === frequency
  );

  if (!podcastFound) divPodcast.innerHTML = "<p>Nenhum podcast encontrado</p>";
  else {
    divPodcast.innerHTML = renderPodcast(podcastFound);
  }
}

function renderPodcast(podcast) {
  return `
    <div>
      <h3 class="center">${podcast.title}</h3>
      <div class="center">
        <img src="././img/${podcast.img}" alt="${podcast.title}" />
        <p>${podcast.description}</p>
      </div>
    </div>`;
}

async function doFetchPodcast() {
  const podcastsResponse = await fetch("http://localhost:3001/podcasts");
  const podcastsJson = await podcastsResponse.json();
  podcasts = podcastsJson;
}
