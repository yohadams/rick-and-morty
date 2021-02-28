const URL = 'https://rickandmortyapi.com/graphql';
const OPTIONS = {
  method: 'POST',
  headers: { "Content-Type": "application/json" },
}

export async function getCharacters<T>(page: number, phrase: string): Promise<Response> {
  const body = {
    query: `
      query {
        characters(page: ${page}, filter: { name: "${phrase}" }) {
          info {
            count
            pages
            next
          }
          results {
            image
            id
            name
            gender
            species
            episode {
              episode
            }
          }
        }
      }
      
    `
  };

  const options: RequestInit = {
    ...OPTIONS,
    body: JSON.stringify(body),
  };

  return fetch(URL, options)
}

export async function getCharactersById<T>(ids: Array<number>) {
  const body = {
    query: `
      query {
        charactersByIds(ids: [${ids.join(',')}]){
          image
          id
          name
          gender
          species
          episode {
            episode
          }
        }
      }
      
    `
  };

  const options: RequestInit = {
    ...OPTIONS,
    body: JSON.stringify(body),
  };

  return fetch(URL, options)
}