import puppeteer from "puppeteer"
import Post from "../models/Post.js"
import { URL } from "../config.js"

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
    const { title, description, status } = req.body
    const newPost = new Post({ title, description, status })
    ;(async () => {
      try {

        const browser = await puppeteer.launch({
          headless: "new",
        })

        const page = await browser.newPage()
        await page.goto(URL)
        await page.waitForSelector('[id="esperado"]')

        await page.screenshot({ path: "cap2.jpg" })


        const html = await page.$eval("#esperado", (el) => el.innerHTML)
        const esperado = html
        // console.log(esperado)
        // console.log(title)

        if (esperado == title) {
          // console.log("*** el mismo ***")
          resp = true
          await browser.close()
          return res.json({ title, description, status: resp })
        } else {
          resp = false
          await browser.close()
          return res.json({ title, description, status: resp })
        }
      } catch (error) {
        // console.log(error)
        await browser.close()
        return error
      }
    })()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
