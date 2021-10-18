import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // User created stories in the format of array of objects.
  // Each object represents a story and its details.
  const stories = [
    {
      title: "Story 1",
      desc: "Description 1"
    },
    {
      title: "Story 2",
      desc: "Description 2"
    }
  ];

  // set the stories which is already created in localstorage.

  // get the current stories stored in the localstorage
  const [currentStories, setCurrentStories] = useState(
    JSON.parse(localStorage.getItem("freshstories"))
  );

  const postStory = () => {
    console.log("hello");
    let newStory = {
      title: document.getElementById("title").value,
      desc: document.getElementById("desc").value
    };

    let tempCurrentStories = JSON.parse(localStorage.getItem("freshstories"));
    tempCurrentStories.push(newStory);
    localStorage.setItem("freshstories", JSON.stringify(tempCurrentStories));
    setCurrentStories(tempCurrentStories);
    window.parent.postMessage(tempCurrentStories, "*");
  };

  const clearForm = () => {
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
  };

  return (
    <div className="App">
      <header>
        <h2>ReactJs - Freshstories App</h2>
        <div>This app will be embedded into freshdesk through iframe URL</div>
      </header>
      <main>
        {currentStories?.map((story) => {
          return (
            <div className="story-box">
              <div className="story-title">{story.title}</div>
              <div className="story-desc">{story.desc}</div>
            </div>
          );
        })}
      </main>
      <section>
        <h4>Create story 1</h4>
        <div className="story-create-box">
          <div>
            <div>Title:</div>
            <div>
              <input id="title" type="text" />
            </div>
          </div>
          <div>
            <div>Desc:</div>
            <div>
              <input id="desc" type="text" />
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            postStory();
            clearForm();
          }}
        >
          Post
        </button>
      </section>
    </div>
  );
}

export default App;
