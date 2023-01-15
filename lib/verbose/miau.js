import path from 'path'

const how_many_words = `const howManyWords = new Uint8Array([69])[0]
export default howManyWords`

const fileUrl = new URL('./howManyWords.js', import.meta.url);
console.log(fileUrl);
const filePath = new URL(fileUrl).pathname;
import('fs').then(fs => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFile(filePath, how_many_words)
});