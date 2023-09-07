import { writeFileSync } from "fs";
import fs from "fs";

const cv = JSON.parse(fs.readFileSync("./cv.json", "utf-8"));

console.log(cv);

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Louis CASSANY</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css">
    <style>
    body {
      font-family: "Computer Modern Serif", serif;
    }
  </style>
</head>
<body>
</body>
</html>`;

await writeFileSync("./build/index.html", html);
