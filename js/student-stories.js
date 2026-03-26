(function () {
  // The list page only needs one render target and the shared card helpers.
  // If either is missing we exit quietly so the rest of the page can still load.
  var storiesContainer = document.getElementById("studentStoriesCards");
  if (!storiesContainer || !window.StudentStoryCards) return;

  function renderCards(stories) {
    storiesContainer.innerHTML = "";

    // The backend team controls the base order in JSON. We only pin
    // Editor's Choice stories to the front before rendering.
    window.StudentStoryCards.sortStories(stories).forEach(function (story, index) {
      storiesContainer.appendChild(window.StudentStoryCards.createStoryCard(story, index));
    });
  }

  // One shared data file keeps the card list and story detail pages in sync.
  // When a story is updated in JSON, both views automatically use the same data.
  fetch("./data/student-stories.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load student stories data");
      }

      return response.json();
    })
    .then(function (data) {
      if (!data || !Array.isArray(data.stories)) {
        throw new Error("student-stories.json must contain a stories array");
      }

      renderCards(data.stories);
    })
    .catch(function (error) {
      console.error(error);
      storiesContainer.innerHTML = '<p class="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-black/60">Student stories could not be loaded right now.</p>';
    });
})();
