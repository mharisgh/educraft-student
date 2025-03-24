document.addEventListener("DOMContentLoaded", () => {
  const notesBtn = document.getElementById("notesBtn");
  const notesPopup = document.getElementById("notesPopup");
  const closeNotesBtn = document.getElementById("closeNotesBtn");


  // ✅ Show the notes popup
  notesBtn.addEventListener("click", () => {
    notesPopup.classList.remove("hidden");
    notesPopup.classList.add("flex");
    makeDraggable(notesPopup); // Ensure draggable only when shown
  });

  // ✅ Hide the popup when close button is clicked
  closeNotesBtn.addEventListener("click", () => {
    notesPopup.classList.add("hidden");
    notesPopup.classList.remove("flex");

  });

  // ✅ Enable dragging only from `.header`
  function makeDraggable(element) {
    interact(element).draggable({
      allowFrom: ".notes-header", // 👈 Drag only from the header
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true
        })
      ],
      autoScroll: true,
      listeners: { move: dragMoveListener }
    });
  }

  // ✅ Drag move logic
  function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  // ✅ Make function globally accessible
  window.dragMoveListener = dragMoveListener;
});

// The following script is for choose color
document.querySelectorAll('input[name="color"]').forEach(input => {
  input.addEventListener('change', function () {
    document.querySelectorAll('input[name="color"] + span + svg').forEach(svg => {
      svg.classList.add('hidden');
    });
    if (this.checked) {
      this.nextElementSibling.nextElementSibling.classList.remove('hidden');
      const selectedColor = window.getComputedStyle(this.nextElementSibling).backgroundColor;
      document.getElementById('notesPopup').style.backgroundColor = selectedColor;
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        ['image'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        
      ]
    }
  });

  // Customize the toolbar container
  const toolbar = quill.getModule('toolbar').container;
  toolbar.style.backgroundColor = 'white';
  toolbar.style.borderRadius = '5px';
  toolbar.style.padding = '5px';
});


document.getElementById("saveNoteBtn").addEventListener("click", () => {
  alert("Your note has been successfully sent to the teacher for review. Good effort!");
});