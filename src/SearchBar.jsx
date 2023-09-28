import { useState } from "react"
import './SearchBar.css'

function SearchBar () {
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ errorMessage, setErrorMessage] = useState('');
    const [ currentWord, setCurrentWord] = useState(null);

    const handleSearchInputChange = async () => {
        // Clear all error messages before trying.
        setErrorMessage('');
        setCurrentWord(null);

        if(searchQuery === '' || searchQuery.length <= 0) {
          setErrorMessage("Sorry pal, we couldn't see any word been typed inside input section to search.");
          return;
        }

        // Call API to get data about the word we are searching for.
        try {
          const resp  = await fetch ( 'https://api.dictionaryapi.dev/api/v2/entries/en/' + searchQuery);
          const response = await resp.json();
          if (resp.status == 404) {
            setErrorMessage(response.message);
          } else {
            console.log(response);
            let newWord = {
              word: response[0].word,
              phonetic: response[0].phonetic,
              phonetics: response[0].phonetics,
              meanings: response[0].meanings,

            };
            setCurrentWord(newWord);
          }
      } catch(error) {
          console.log(error);
          setErrorMessage(error.message)
      }
    }

    return (
        <div>
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
            <button onClick={() => handleSearchInputChange() } >Search</button>
            <div>{ errorMessage }</div>
        
            {currentWord != null ? (
              <div>
                <div className="Word">
                  <h2>word {currentWord.word}</h2> <br />
                  Phonetic {currentWord.phonetic} <br />
                </div>

                <div className="Phonetics">
                  <h5>Phonetics</h5>
                  {currentWord.phonetics?.map((p, i) => (
                    <div key={i}>
                      <span>Text {p.text}</span><br />
                      <div>
                        {p.audio != null ?
                        (<audio controls>
                          <source src={p.audio} type="audio/mp3" />
                        </audio>)
                        : ''}
                        
                      </div>
                    </div>
                    ))}
                </div>

                <div className="Meanings">
                  <h5>Meanings</h5>
                  {currentWord.meanings?.map((p, i) => (
                    <div key={i}>
                      <div>Part of speech: {p.partOfSpeech}</div>
                      

                      <div>antonyms: {p.antonyms?.map((a, i) => (
                          <span key={i}>
                            {a},&nbsp; 
                          </span>
                       ))}
                      </div>

                      <div>synonyms: {p.synonyms?.map((s, i) => (
                          <span key={i}>
                            {s},&nbsp; 
                          </span>
                       ))}
                      </div>

                      <div>Definitions: {p.definitions?.map((d, ii) => (
                          <div key={ii}>
                            definition: {d.definition} <br />
                            example: {d.example} <br />
                          </div>
                       ))}
                      </div>
                      <hr />
                      <br />
                    </div>
                    ))}
                </div>
            </div>
          ): ''}       
        </div>
  );
}

  
export default SearchBar

