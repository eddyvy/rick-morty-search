# Rick and Morty Search Info

## Introduction

This is a React App using the [Rick and Morty API](https://rickandmortyapi.com/documentation/) to practise what I have learned about React.

It consists in a display of the information and a searching bar to find what any info appearing there.

## Commands

Install Dependencies
```
npm i
```

Start development mode
```
npm start
```

Build the app
```
npm run build
```

## Dependencies

```
npx create-react-app

npm i axios

```

Bootstrap


## Code explanation


### RickMortyApp.js

```javascript
export const CharactersContext = React.createContext()

export const RickMortyApp = () => {
    const [characters, setCharacters] = useState(null)
    const [charsFiltered, setCharsFiltered] = useState(null)

    useEffect(() => {
        const getCharacters = async() => {
            const characters = await getAllCharacters()
            setCharacters( characters )
        }
        getCharacters()
    }, [setCharacters])

    useEffect(() => {
        setCharsFiltered(characters)
    }, [setCharsFiltered, characters])

    return (
        <CharactersContext.Provider value={ characters } >
            <main className="d-flex flex-column align-items-center pb-5" >
                <SearchBar setCharsFiltered={ setCharsFiltered }  />
                <MultipleCards charsFiltered={ charsFiltered } />
            </main>
        </CharactersContext.Provider>
    )
}

```

A context is created which will be set with an array with all characters data got with the helper `getAllCharacters`.

This values, as a context, can be used by the rest of the components of the application (with exception of index.js).

This are passed by the characters state.

The values shown ate the screen are the filtered characters, which are modified by the search component and used by the multiplecards component.

The first useEffect sets all the characters to our context value and the second useEffect passes them to filtered values
when loaded for the first view with all cards.



### getAllCharacters.js

```javascript

export const getAllCharacters = async () => {
    const API_URL = 'https://rickandmortyapi.com/api/character'

    try {
        const { data } = await axios.get(API_URL)
        const numOfCharacters = data.info.count
        
        const gettingCharactersOneByOne = async() => {
            const chars = []
            for (let i = 0; i < numOfCharacters; i++) {
                const addingCharacter = await axios.get(`${API_URL}/${i + 1}`)
                chars.push( addingCharacter )
            }
            return chars
        }

        const characters = await gettingCharactersOneByOne()
        return characters

    } catch (error) {
        console.log('Error fetching data', error)
        return []
    }

}

```

Autodescriptive function that returns all characters array thanks to axios.

After the GET it keeps the total number of characters at `const numOfCharacters = data.info.count`.

This number is used for the loop at `gettingCharactersOneByOne` so it gets the array with all characters.

Inside the loop there is another GET request to the API for every character.



### MultipleCard.js

```javascript
export const MultipleCards = ({ charsFiltered }) => {

    const interval = 25
    const [charsWanted, setCharsWanted] = useState(interval)
    const characters = charsFiltered

    const handleClick = () => {
        setCharsWanted( charsWanted + interval )
    }

    return (
        <>
            <div className="d-flex flex-wrap justify-content-center m-3 mb-5">
                {
                    ( !characters ) && <Loading />
                }
                {
                    ( characters )
                    &&(
                        ( characters.length === 0 ) && <h3 className="mt-5">Could not find any match :(</h3>
                    )
                }
                { 
                    ( characters )
                    &&(
                        ( characters.length > 0 )
                        && (
                            characters.map( (char, index) => ( (index < charsWanted) && ( <Card key={ char.data.id } id={ char.data.id } /> ) ))
                        )
                    )
                }
            </div>
            { 
                ( characters )
                &&(
                    ( characters.length > 0 )
                    && (
                        <button
                            type="button"
                            className="btn btn-primary mb-5"
                            onClick={ handleClick }
                        >
                            Load { interval } more
                        </button>
                    )
                )
            }
        </>
    )
}
```

The interval and the charsWanted state are the max number of cards shown and the state adds another interval when the button "load more" is pressed.

With the condition `(index < charsWanted)` at the array map we get the no more than this max number.

The characters are the filtered passed through RickMortyApp.

If the characters are null (as the initial state) it will show the component Loading because it didnt change jet this initial state.

Once characters are loadede it will show all cards with the map function.

After first load the characters constant is not null again but can be an empty array if no matches are found, so it will display a message.


### Card.js

```javascript

    export const Card = ({ id }) => {

    const characters = useContext(CharactersContext)
    
    const character = characters[ id - 1 ].data
    
    const {
        gender,
        image,
        location,
        name,
        origin,
        species,
        status,
        type
    } = character

    return (
        // card jsx
    )
}

```

It gets the character receiving the id.

It gets all characters array through useContext.

The character wanted at the array is at position `id - 1` because the array starts at 0 and the ids at 1.

All character data is destructured and used at the jsx return.

At the jsx a condition to show an image is added, it will display an image next to the character status
(green = alive, red = dead, grey = unknown).



### SearchBar.js

```javascript

export const SearchBar = ({ setCharsFiltered }) => {

    const characters = useContext(CharactersContext)

    const findCharsMatching = (str) => {
        const strWanted = str.trim().toLowerCase()
        
        const charsMatching = characters.filter( character => {
            const char = character.data

            const charValues = Object.values(char).map( value => value.toString().trim().toLowerCase() )
            for (let i = 0; i < 6; i++) {
                charValues.pop()
            }
            charValues.push(char.location.name.trim().toLowerCase())
            charValues.push(char.origin.name.trim().toLowerCase())

            if (charValues.find( value => value.includes(strWanted))) {
                return char
            }

            return null

        } )

        setCharsFiltered( charsMatching )

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const searchingStr = e.target[0].value

        findCharsMatching(searchingStr)
    }

    return (
        // form jsx
    )
}

```

It gets the setCharsFiltered from parent RickMortyApp and all characters through useContext.

When the submit is done, the `handleSubmit` function sends the string written to the function `findCharsMatching`.

This function first uses trim() and lowerCase() to our string and then filters all the characters to `charsMatching` constant.

The filter transforms the object gotten to an array of values through `Object.values(char)` and map them to get the values
in `charValues` ( trim() and loweCase() used ).

Then the 6 last values are popped because we dont want them to be taken into account (url, date of creation...).

In these 6 values are included location and origin because they are saved as "[object object]" strings.

As we want these values we push them from the initial character item, as we only want the name.
( `charValues.push(char.location.name.trim().toLowerCase())` )

If the string we are searching is included in any of these values (which correspond to name, location.name, gender ...)
it will return the character complete.

After all filter it will set at our filtered characters array the ones we were looking for and pass them to father component.

The father component will send it to MultipleCards (as explained before) and will display our searching results.