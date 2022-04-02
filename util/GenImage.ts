import puppeteer from "puppeteer";
import { styles } from "../constants/options";

export default async function GenImage(word: string, artStyle: any): Promise<any> {

    const browser =
        await puppeteer.launch({
            defaultViewport: {
                width: 1200,
                height: 750
            }
        });

    const page = await browser.newPage();
    await page.goto('https://app.wombo.art/', {
        waitUntil: 'networkidle2',
    });
    await page.waitForSelector("input[label='Enter prompt']");
    await page.type("input[label='Enter prompt']", word);
    await page.click(`img[alt='${styles[artStyle - 1]}']`)
    const [button] = await page.$x("//button[contains(., 'Create')]");
    if (button) {
        await button.click();
    }
    await page.waitForSelector("input[label='Name artwork']");


    const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('img'))
        return tds.map(td => {
            return td.src;
        });
    });
    const url = data.pop()


    await browser.close();
    return url;
}