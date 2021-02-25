const URL = 'https://rickandmortyapi.com/graphql';

export async function getCharacters<T>(page: number): Promise<Response> {
  const body = {
    query: `
      query {
        characters(page: ${page}) {
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
  const options : RequestInit = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }
    return fetch(URL, options)


}