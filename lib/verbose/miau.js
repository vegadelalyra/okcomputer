const fileUrl = new URL('./howManyWords.js', import.meta.url);
const filePath = new URL(fileUrl).pathname;
console.log(fileUrl);
import('fs').then(fs => {
    fs.promises.mkdir(path.dirname(filePath), { recursive: true })
        .then(() => fs.promises.writeFile(filePath, how_many_words))
        .catch(console.error);
});


let str = 'fuck my life'
str = str.slice(3)
console.log(str);