
const apiKey = 'AIzaSyCXmP8PiWwMAEL7zRDRigOzLMa1YuzLFK0'; 
const searchEngineId = '55b17226c8e364c3a'; 
const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}`;

// DOM elements
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");


async function fetchSearchResults(query) {
  const response = await fetch(`${searchUrl}&q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.items;
}


function displayResults(results) {
  searchResults.innerHTML = ""; 

  if (results.length === 0) {
    searchResults.innerHTML = "<p>No results found</p>";
  } else {
    results.forEach(result => {
      const div = document.createElement("div");
      div.className = "search-result";
      const heading = document.createElement("h3");
      heading.textContent = result.title;
      const link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.href = result.link;
      link.textContent = result.link;
      const snippet = document.createElement("p");
      snippet.textContent = result.snippet;

      div.appendChild(heading);
      div.appendChild(link);
      div.appendChild(snippet);

      searchResults.appendChild(div);
    });
  }
}


searchInput.addEventListener("input", async function() {
  const searchTerm = searchInput.value;
  if (searchTerm.length > 0) {
    const results = await fetchSearchResults(searchTerm);
    displayResults(results);
  } else {
    searchResults.innerHTML = ""; // Clear results if search input is empty
  }
});

