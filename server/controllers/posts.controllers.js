import puppeteer from "puppeteer"

let resp = { asserted: false, result: "", err: false }

export const createPost = async (req, res) => {
  try {
    console.log('apipup_api/posts')
    const { content, expected_result } = req.body

    const newPost = {
      content,
      expected_result,
    }

    const html = newPost.content

    ;(async () => {
      try {
        const browser = await puppeteer.launch({
          headless: "new",
        })
        const page = await browser.newPage()
        await page.goto(`data:text/html,${encodeURIComponent(html)}`)

        const result = await page.evaluate(
          () => document.querySelector("#numero").value
        )

        if (result == newPost.expected_result) {
          resp = { asserted: true, result }
          console.log("coincide")
        } else {
          resp = { asserted: false, result }
          console.log("NO coincide")
        }
        await browser.close()
      } catch (error) {
        console.log("error", error.message)
        resp = { asserted: false, err: error.message }
      }
      res.send(resp)
    })()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
