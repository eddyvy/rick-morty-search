import axios from 'axios'


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