import React, { useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import '../styles/Main.css'
import { CallGenerativeAPI } from '../hooks/generateQuestions'
import { useSelector, useDispatch } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export default function Generate() {
    const userId = useSelector(state => state.result.userId)
    const dispatch = useDispatch()

    const prompt = useRef(null)
    const [selectedNumber, setSelectedNumber] = useState('');
    const sourceType = useRef(null)
    const nameOfMCQ = useRef(null)

    const [go, setGo] = useState(false)

    const startQuiz = () => {

        console.log("start quiz 1")

        if(prompt.current?.value && sourceType.current?.value && nameOfMCQ.current?.value && (selectedNumber !== '')){
        // const prompt = (prompt.current?.value)
        // function needs { promt, numberOfMCQ, sourceType, userID, nameOfMCQ }
        
        console.log(userId)

        const resultData = {
            prompt: prompt.current.value,
            numberOfMCQ: selectedNumber,
            sourceType: sourceType.current.value,
            userID: userId,
            nameOfMCQ: nameOfMCQ.current.value
          };

        console.log("start quiz 2")
        
        CallGenerativeAPI(resultData, dispatch)
        
        console.log("start quiz 3")
        
        setGo(true)

        console.log("start quiz 4")
        }
    }

    const handleDropdownChange = (event) => {
        setSelectedNumber(event.target.value);
      };

    if(go) {
        return <Navigate to={{ pathname: '/quiz'}} replace={true}></Navigate>
    }

    const headerStyle = {
        //textAlign: 'left', // Align text to the most left
        color: 'white',
        padding: '20px',
        margin: '0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      };

      const styles = {
        container: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px',
        },
        label: {
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: 'white'
        },
        select: {
          padding: '8px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          outline: 'none',
          cursor: 'pointer',
        },
        selected: {
          marginTop: '10px',
          fontSize: '16px',
          color: 'white'
        },
      };

      const Component = (
        <Tabs>
          <TabList>
            <Tab>Mario</Tab>
            <Tab disabled>Luigi</Tab>
            <Tab>Peach</Tab>
            <Tab>Yoshi</Tab>
            <Tab>Toad</Tab>
          </TabList>
      
          <TabPanel>
            <p>
              <b>Mario</b> (<i>Japanese: マリオ Hepburn: Mario, [ma.ɾʲi.o]</i>) (<i>English:
              /ˈmɑːrioʊ/; Italian: [ˈmaːrjo]</i>) is a fictional character in the Mario video
              game franchise, owned by Nintendo and created by Japanese video game designer
              Shigeru Miyamoto. Serving as the company's mascot and the eponymous protagonist
              of the series, Mario has appeared in over 200 video games since his creation.
              Depicted as a short, pudgy, Italian plumber who resides in the Mushroom
              Kingdom, his adventures generally center upon rescuing Princess Peach from the
              Koopa villain Bowser. His younger brother and sidekick is Luigi.
            </p>
            <p>
              Source:{' '}
              <a href="https://en.wikipedia.org/wiki/Mario" target="_blank">
                Wikipedia
              </a>
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <b>Luigi</b> (<i>Japanese: ルイージ Hepburn: Ruīji, [ɾɯ.iː.dʑi̥]</i>) (<i>English: /luˈiːdʒi/;
              Italian: [luˈiːdʒi]</i>) is a fictional character featured in video games and related media
              released by Nintendo. Created by prominent game designer Shigeru Miyamoto, Luigi is portrayed
              as the slightly younger but taller fraternal twin brother of Nintendo's mascot Mario, and
              appears in many games throughout the Mario franchise, often as a sidekick to his brother.
            </p>
            <p>
              Source:{' '}
              <a href="https://en.wikipedia.org/wiki/Luigi" target="_blank">
                Wikipedia
              </a>
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
              is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
              Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
              attack by Bowser. She often plays the damsel in distress role within the series and
              is the lead female. She is often portrayed as Mario's love interest and has appeared
              in Super Princess Peach, where she is the main playable character.
            </p>
            <p>
              Source:{' '}
              <a href="https://en.wikipedia.org/wiki/Princess_Peach" target="_blank">
                Wikipedia
              </a>
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <b>Yoshi</b> (<i>ヨッシー Yosshī, [joɕ.ɕiː]</i>) (<i>English: /ˈjoʊʃi/ or /ˈjɒʃi/</i>), once
              romanized as Yossy, is a fictional anthropomorphic dinosaur who appears in
              video games published by Nintendo. Yoshi debuted in Super Mario World (1990) on the
              Super Nintendo Entertainment System as Mario and Luigi's sidekick. Yoshi later starred
              in platform and puzzle games, including Super Mario World 2: Yoshi's Island, Yoshi's Story
              and Yoshi's Woolly World. Yoshi also appears in many of the Mario spin-off games, including
              Mario Party and Mario Kart, various Mario sports games, and Nintendo's crossover fighting
              game series Super Smash Bros. Yoshi belongs to the species of the same name, which is
              characterized by their variety of colors.
            </p>
            <p>
              Source:{' '}
              <a href="https://en.wikipedia.org/wiki/Yoshi" target="_blank">
                Wikipedia
              </a>
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <b>Toad</b> (<i>Japanese: キノピオ Hepburn: Kinopio</i>) is a fictional character who primarily
              appears in Nintendo's Mario franchise. Created by Japanese video game designer Shigeru Miyamoto,
              he is portrayed as a citizen of the Mushroom Kingdom and is one of Princess Peach's most loyal
              attendants; constantly working on her behalf. He is usually seen as a non-player character (NPC)
              who provides assistance to Mario and his friends in most games, but there are times when Toad(s)
              takes center stage and appears as a protagonist, as seen in Super Mario Bros. 2, Wario's Woods,
              Super Mario 3D World, and Captain Toad: Treasure Tracker.
            </p>
            <p>
              Source:{' '}
              <a href="https://en.wikipedia.org/wiki/Toad_(Nintendo)" target="_blank">
                Wikipedia
              </a>
            </p>
          </TabPanel>
        </Tabs>
      );
    

    return (

        <div className="container">
            <h1 className='title text-light'>New AI Generated Quiz</h1>

            <h2 style={headerStyle}>Provide data for AI to generate a new quiz</h2>

            <form id="form">
            <input ref={nameOfMCQ} className="userid" type="text" placeholder='Name your quiz*' />
            </form>

            <form id="form">
            <input ref={sourceType} className="userid" type="text" placeholder='Source type*' />
            </form>

            <div style={styles.container}>
            <label style={styles.label}>How many questions do you want?</label>
            <select value={selectedNumber} onChange={handleDropdownChange} style={styles.select}>
                <option value="">Choose a number</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
            {selectedNumber && <p style={styles.selected}>You selected: {selectedNumber}</p>}
            </div>

            <form id="form">
            <input ref={prompt} className="userid" type="text" placeholder='Source to make quiestions go here*' />
            </form>

            <div className='start'>
            <button className='btn' onClick={startQuiz}>Generate Quiz</button>
        </div>

        </div>
    )

}