import puppeteer from "puppeteer"
import Post from "../models/Post.js"

let resp = false

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  try {
    const {
      title,
      exercise,
      languaje,
      code_base,
      exercise_type,
      expected_result,
      status,
    } = req.body
    const newPost = new Post({
      title,
      exercise,
      languaje,
      code_base,
      exercise_type,
      expected_result,
      status,
    })
    console.log("newPost")
    console.log(newPost)

    const html = `
        <html>
          <body>
            <div id="resultado"><p>Sample</p></div>
            <script>${newPost.exercise}</script>
          </body>
        </html>
      `

    ;(async () => {
      const browser = await puppeteer.launch({
        headless: "new",
      })
      const page = await browser.newPage()
      await page.goto(`data:text/html,${html}`)

      const result = await page.evaluate(
        () => document.querySelector("#resultado").outerHTML
      )

      console.log(result)
      const fraccion = result.split('<div id="resultado" ') // fijo en area de pruebas
      
      console.log(newPost.expected_result)
      if (
        fraccion[1] == newPost.expected_result
      ) {
        resp = true
        console.log("coincide")
      } else {
        resp = false
        console.log("NO coincide")
      }
      await browser.close()
      res.send(resp)
    })()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
