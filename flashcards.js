// Connect to MongoDB database
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://juliegdosher:<password>@dictionary.s5gatyt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err) {
    console.log('Error connecting to database: ', err);
  } else {
    console.log('Connected to database');

    const collection = client.db("_dictionary").collection("entries");
    collection.find({ type: "flashcard" }).toArray((err, data) => {
      if (err) {
        console.log('Error retrieving data from database: ', err);
      } else {
        console.log('Retrieved data from database: ', data);

        // Display the first flashcard
        let index = 0;
        displayFlashcard(data[index]);

        // Handle "Show Definition" button click
        const showDefButton = document.getElementById('show-def-button');
        showDefButton.addEventListener('click', toggleDefinition);

        // Handle "Next Card" button click
        const nextCardButton = document.getElementById('next-card-button');
        nextCardButton.addEventListener('click', () => {
          index = (index + 1) % data.length;
          displayFlashcard(data[index]);
        });
      }
    });
  }
});

function displayFlashcard(flashcard) {
  const word = document.getElementById('word');
  const definition = document.getElementById('definition');
  const showDefButton = document.getElementById('show-def-button');
  word.innerHTML = flashcard.english;
  definition.innerHTML = flashcard.translation;
  definition.style.display = 'none';
  showDefButton.innerHTML = 'Show Definition';
  
  showDefButton.addEventListener('click', () => {
    if (definition.style.display === 'none') {
      definition.style.display = 'block';
      showDefButton.innerHTML = 'Hide Definition';
    } else {
      definition.style.display = 'none';
      showDefButton.innerHTML = 'Show Definition';
    }
  });
}

function toggleDefinition() {
  const definition = document.getElementById('definition');
  const showDefButton = document.getElementById('show-def-button');
  if (definition.style.display === 'none') {
    definition.style.display = 'block';
    showDefButton.innerHTML = 'Hide Definition';
  } else {
    definition.style.display = 'none';
    showDefButton.innerHTML = 'Show Definition';
  }
}

function nextCard(data, index) {
  index = (index + 1) % data.length;
  displayFlashcard(data[index]);
}