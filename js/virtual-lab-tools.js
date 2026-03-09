(function () {
  var container = document.getElementById("virtualLabTools");
  if (!container) return;

  function createToolCard(tool) {
    var link = document.createElement("a");
    link.href = tool.toolLink;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className =
      "flex gap-2 flex-col items-center justify-center hover:bg-[#e1d8cc] p-4 rounded-lg transition-all duration-300 cursor-pointer";

    var image = document.createElement("img");
    image.className = "w-14 h-14 object-contain";
    image.src = tool.toolLogoImg;
    image.alt = tool.alt || tool.toolName;

    var title = document.createElement("p");
    title.className = "font-semibold text-center";
    title.textContent = tool.toolName;

    link.appendChild(image);
    link.appendChild(title);
    return link;
  }

  function renderTools(tools) {
    container.innerHTML = "";

    tools.forEach(function (tool) {
      var hasAllFields =
        tool &&
        tool.toolName &&
        tool.toolLogoImg &&
        tool.alt &&
        tool.toolLink;

      if (hasAllFields) {
        container.appendChild(createToolCard(tool));
      }
    });
  }

  fetch("./data/virtual-lab-tools.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load virtual lab tools JSON");
      }
      return response.json();
    })
    .then(function (tools) {
      if (Array.isArray(tools)) {
        renderTools(tools);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
})();
