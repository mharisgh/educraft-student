(function () {
  var heroContainer = document.getElementById("studentStoriesHeroCards");
  var storiesContainer = document.getElementById("studentStoriesCards");
  if (!heroContainer || !storiesContainer) return;

  var rotations = [-2.4, 1.8, -1.6, 2.1, -1.3, 1.5, -2, 1.7];

  function createHeroCard(item, index) {
    var card = document.createElement("div");
    var liftClass = index % 3 === 0 ? "sm:-translate-y-3" : index % 3 === 1 ? "sm:translate-y-2" : "";
    card.className =
      "h-28 w-24 sm:h-36 sm:w-28 overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-[0_14px_28px_rgba(15,23,42,0.12)] " +
      liftClass;

    var img = document.createElement("img");
    img.src = item.img;
    img.alt = item.alt || "Student story profile";
    img.className = "h-full w-full object-cover";

    card.appendChild(img);
    return card;
  }

  function createStoryCard(story, index) {
    var card = document.createElement("article");
    card.className =
      "story-card group relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/70 bg-white";
    card.style.setProperty("--card-rot", rotations[index % rotations.length] + "deg");

    var image = document.createElement("img");
    image.src = story.authorImg;
    image.alt = story.authorName + " profile";
    image.className = "absolute inset-0 h-full w-full object-cover";

    var overlay = document.createElement("div");
    overlay.className = "absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/70";

    var content = document.createElement("div");
    content.className = "relative z-10 flex h-full flex-col justify-between p-5 text-white";

    var title = document.createElement("h3");
    title.className = "text-2xl font-semibold leading-tight";
    title.textContent = story.storyTitle;

    var footer = document.createElement("div");
    footer.className = "flex items-center justify-between rounded-full bg-white/90 p-2 text-black";

    var authorWrap = document.createElement("div");
    authorWrap.className = "flex items-center gap-2";

    var avatar = document.createElement("img");
    avatar.src = story.authorImg;
    avatar.alt = story.authorName;
    avatar.className = "h-9 w-9 rounded-full object-cover";

    var meta = document.createElement("div");
    var name = document.createElement("p");
    name.className = "text-sm font-semibold leading-none";
    name.textContent = story.authorName;

    var grade = document.createElement("p");
    grade.className = "text-xs text-black/60";
    grade.textContent = story.authorClass;

    var cta = document.createElement("button");
    cta.className = "rounded-full bg-black px-3 py-1 text-xs font-semibold text-white";
    cta.textContent = "Read";

    meta.appendChild(name);
    meta.appendChild(grade);
    authorWrap.appendChild(avatar);
    authorWrap.appendChild(meta);
    footer.appendChild(authorWrap);
    footer.appendChild(cta);

    content.appendChild(title);
    content.appendChild(footer);

    card.appendChild(image);
    card.appendChild(overlay);
    card.appendChild(content);

    return card;
  }

  function render(data) {
    heroContainer.innerHTML = "";
    storiesContainer.innerHTML = "";

    (data.heroCards || []).forEach(function (item, index) {
      if (item && item.img) {
        heroContainer.appendChild(createHeroCard(item, index));
      }
    });

    (data.stories || []).forEach(function (story, index) {
      var valid = story && story.storyTitle && story.authorName && story.authorClass && story.authorImg;
      if (valid) {
        storiesContainer.appendChild(createStoryCard(story, index));
      }
    });
  }

  fetch("./data/student-stories.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Failed to load student stories data");
      return response.json();
    })
    .then(render)
    .catch(function (error) {
      console.error(error);
    });
})();
