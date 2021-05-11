fetch("http://localhost:3000/task-2/temp.json")
  .then((res) => res.json())
  .then((resJson) => {
    const sDescription = resJson.data.sDescription
    const div = document.createElement("div")
    div.innerHTML = sDescription

    const twitterElements = div.getElementsByClassName("twitter-tweet")
    for (const element of twitterElements) {
      element.remove()
    }

    resJson.data.sDescription = div.innerHTML
    const fileData = JSON.stringify(resJson)
    document.body.innerText = fileData
    download("temp-1.json", fileData)
  })

function download(filename, text) {
  var element = document.createElement("a")
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  )
  element.setAttribute("download", filename)

  element.style.display = "none"
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
