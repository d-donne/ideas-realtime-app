// Socket.io setup
const socket = io("http://localhost:3030");

//   initialize Feathers client
const client = feathers();

// register socket.io as a transport
client.configure(feathers.socketio(socket));

// get input
const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ideaText = document.getElementById("idea-text").value;
  const ideaTech = document.getElementById("idea-tech").value;
  const ideaViewer = document.getElementById("idea-viewer").value;

  const idea = {
    text: ideaText,
    tech: ideaTech,
    viewer: ideaViewer,
  };

  // clear inputs
  document.getElementById("idea-text").value = "";
  document.getElementById("idea-tech").value = "";
  document.getElementById("idea-viewer").value = "";

  console.log(idea);

  await client.service("ideas").create(idea);
});

const renderIdea = (idea) => {
  const ideas = document.getElementById("ideas");
  ideas.innerHTML += `
            <div class="card bg-secondary my-3">
              <div class="card-body">
                <p class="lead">
                  ${idea.text} <strong>(${idea.tech})</strong>
                  <br />
                  <em>Submitted by ${idea.viewer}</em>
                  <br />
                  <small>${idea.time}</small>
                </p>
              </div>
        `;
};

const init = async () => {
  // get ideas
  const ideas = await client.service("ideas").find();
  console.log(ideas);

    // render ideas
  ideas.forEach(renderIdea);

    // listen for new ideas 
  client.service("ideas").on("created", renderIdea);
}

init();
