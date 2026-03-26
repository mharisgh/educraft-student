(function () {
  function getAppreciationCount(story) {
    // Keep the card total flexible. If the backend sends a direct total, we use it.
    // Otherwise we derive it from the detail-page reaction counts.
    if (typeof story.appreciationCount === "number") {
      return story.appreciationCount;
    }

    var reactions = story.reactions || {};
    return (reactions.like || 0) + (reactions.clap || 0) + (reactions.inspired || 0);
  }

  function getStoryLink(story) {
    return "./story-detail.html?story=" + encodeURIComponent(story.id);
  }

  function createReactionCluster(appreciationCount) {
    var wrapper = document.createElement("div");
    wrapper.className = "mt-2 inline-flex items-center gap-2";

    var iconStack = document.createElement("div");
    iconStack.className = "flex -space-x-1.5";
    iconStack.innerHTML =
      '<span class="flex h-5 w-5 items-center justify-center rounded-full border border-white/40 bg-[#4c8dff] shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" fill="#fff" viewBox="0 0 256 256" aria-hidden="true"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32Z"></path></svg></span>' +
      '<span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#f8740b] shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" fill="#fff" viewBox="0 0 256 256" aria-hidden="true"><path d="M188.87,65A18,18,0,0,0,157.62,83L133.36,41a18,18,0,0,0-31.22,18L96.4,49A18,18,0,0,0,65.18,67l3.34,5.77A26,26,0,0,0,39.74,111l3,5.2A26,26,0,0,0,23.5,155l35.27,61a80.14,80.14,0,0,0,149.52-39.57A71.92,71.92,0,0,0,210,101.58Zm1.2,127.56A64.12,64.12,0,0,1,72.65,208L37.38,147a10,10,0,0,1,17.34-10L75,172a8,8,0,0,0,13.87-8L53.62,103A10,10,0,0,1,71,93l31.81,55a8,8,0,0,0,13.87-8l-26-45a10,10,0,0,1,17.35-10l36.5,63a8,8,0,0,0,13.87-8l-12.6-21.75A10,10,0,0,1,163.44,109l20.22,35A63.52,63.52,0,0,1,190.07,192.57ZM160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0Zm33.22,6,8-13.1a8,8,0,0,1,13.68,8.33l-8,13.11a8,8,0,0,1-6.84,3.83A8,8,0,0,1,193.44,30Zm45,33.66-15.05,4.85a8.15,8.15,0,0,1-2.46.39,8,8,0,0,1-2.46-15.62l15.06-4.85a8,8,0,1,1,4.91,15.23Z"></path></svg></span>' +
      '<span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#ffbc00] shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" fill="#fff" viewBox="0 0 256 256" aria-hidden="true"><path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"></path></svg></span>';

    var count = document.createElement("span");
    count.className = "text-xs font-medium leading-none text-white/90";
    count.textContent = String(appreciationCount);

    wrapper.appendChild(iconStack);
    wrapper.appendChild(count);
    return wrapper;
  }

  function createEditorsChoiceBadge() {
    var badgeWrap = document.createElement("div");
    badgeWrap.className = "absolute right-4 top-4 z-20";
    badgeWrap.innerHTML =
      '<span class="inline-flex items-center gap-2 rounded-full bg-[#ffbc00] px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(255,188,0,0.28)]"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 3h8a1 1 0 0 1 1 1v16l-5-3-5 3V4a1 1 0 0 1 1-1Z"></path><path d="M9.5 8.5h5"></path></svg>Editor\'s Choice</span>';
    return badgeWrap;
  }

  function createStoryCard(story, visualIndex) {
    // The card design is intentionally fixed. New stories should only change data,
    // not markup, so the list page stays consistent as the story count grows.
    var cardRotations = [-2.2, 1.8, -1.6, 2, -1.2, 1.4, -1.8, 1.6];
    var article = document.createElement("article");
    article.className = "story-card group relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/70 bg-white";
    article.style.setProperty("--card-rot", cardRotations[visualIndex % cardRotations.length] + "deg");

    var coverImage = document.createElement("img");
    coverImage.src = story.coverImg || story.authorImg;
    coverImage.alt = story.title;
    coverImage.className = "absolute inset-0 h-full w-full object-cover";

    var overlay = document.createElement("div");
    overlay.className = "absolute inset-0 bg-gradient-to-b from-black/15 via-black/15 to-black/80";

    var content = document.createElement("div");
    content.className = "relative z-10 flex h-full flex-col justify-end p-4 text-white";

    var title = document.createElement("h3");
    title.className = "max-w-[16rem] text-xl font-semibold leading-tight text-white";
    title.textContent = story.title;

    var footer = document.createElement("div");
    footer.className = "mt-4";

    var footerRow = document.createElement("div");
    footerRow.className = "flex w-full items-end justify-between gap-4";

    var authorGroup = document.createElement("div");
    authorGroup.className = "flex items-center gap-2 justify-center";

    var authorAvatar = document.createElement("img");
    authorAvatar.src = story.authorImg;
    authorAvatar.alt = story.authorName;
    authorAvatar.className = "h-10 w-10 rounded-full border-2 border-white/20 object-cover";

    var authorMeta = document.createElement("div");
    var authorName = document.createElement("p");
    authorName.className = "font-semibold leading-none text-white";
    authorName.textContent = story.authorName;

    authorMeta.appendChild(authorName);
    authorMeta.appendChild(createReactionCluster(getAppreciationCount(story)));

    authorGroup.appendChild(authorAvatar);
    authorGroup.appendChild(authorMeta);

    var readLink = document.createElement("a");
    readLink.href = getStoryLink(story);
    readLink.className = "inline-flex rounded-full bg-white px-6 py-2 font-semibold text-black transition hover:bg-[#fff1e6]";
    readLink.textContent = "Read Story";

    footerRow.appendChild(authorGroup);
    footerRow.appendChild(readLink);
    footer.appendChild(footerRow);

    content.appendChild(title);
    content.appendChild(footer);

    article.appendChild(coverImage);
    article.appendChild(overlay);

    if (story.isEditorsChoice) {
      article.appendChild(createEditorsChoiceBadge());
    }

    article.appendChild(content);
    return article;
  }

  function sortStories(stories) {
    // Editor's Choice stories always stay at the front. The original file order is
    // preserved inside each group so the backend team can fully control ordering.
    return stories
      .map(function (story, index) {
        return { story: story, originalIndex: index };
      })
      .sort(function (a, b) {
        if (a.story.isEditorsChoice === b.story.isEditorsChoice) {
          return a.originalIndex - b.originalIndex;
        }

        return a.story.isEditorsChoice ? -1 : 1;
      })
      .map(function (entry) {
        return entry.story;
      });
  }

  // Expose one small shared API so both the list page and detail page can reuse
  // the same card design without duplicating markup in multiple files.
  window.StudentStoryCards = {
    createStoryCard: createStoryCard,
    createReactionCluster: createReactionCluster,
    createEditorsChoiceBadge: createEditorsChoiceBadge,
    getAppreciationCount: getAppreciationCount,
    getStoryLink: getStoryLink,
    sortStories: sortStories
  };
})();

