export async function get(url) {
  try {
      var response = await fetch(url)
      return response.json()
  } catch {
      console.log("Unable to fetch")
  }
}

export async function post(url, data) {
  try {
      var requestOptions = {
          method: 'POST',
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
   
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        }

        var response = await fetch(url, requestOptions)
        return response.json()
  } catch {
      console.log("Unable to post")
  }
}

export async function DELETE(url, data) {
  try {
    var requestOptions = {
        method: 'DELETE',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
 
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      }

      var response = await fetch(url, requestOptions)
      return response.json()
} catch {
    console.log("Unable to delete")
}
}

export const API_URL = process.env.REACT_APP_API_URL
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL