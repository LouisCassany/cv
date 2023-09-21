import { writeFileSync } from "fs";
import fs from "fs";

const cv = JSON.parse(fs.readFileSync("./cv.json", "utf-8"));

let education = add_section(cv[0], "fr");
let experience = add_section(cv[1], "fr");
let skills = add_section(cv[2], "fr");
let publications = add_section(cv[3], "fr");

const html = `
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Louis CASSANY</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css">
  <link rel="stylesheet" href="./styles.css">
</head>

<body>
  <div class= "flex justify-center items-center md:p-10 my-8">
    <div class="flex space-x-16">
      <img src="./photo_CV.png" class="h-36 rounded-lg shadow-xl" />
      <div class="flex flex-col justify-between items-end">
        <span class="text-4xl text-blue-900"> Louis CASSANY </span>
        <span class="text-xl text-blue-900 font-bold"> Docteur en automatique </span>
        <span class="underline"> cassany.louis@gmail.com </span>
        <span> (+33) 6 45 32 03 41</span>
        <span> 28 ans, permis B</span>
      </div>
    </div>
  </div>
  <div class="columns-2 px-8 md:w-3/4 mx-auto pb-8">
    ${education}
    ${experience}
    ${skills}
    ${publications}
  </div>
</body>

</html>`;

await writeFileSync("./index.html", html);

function add_section(section, lang) {
  let html = ``;
  let flag = false;

  for (const item of section.items) {
    html += `<div class="flex flex-col w-full mb-4 break-inside-avoid-column md:px-16 px-4 item">`;
    if (!flag) {
      html += `<h1 class="text-2xl text-blue-900 mx-auto font-bold text-center">${section.title[lang]}</h1>`;
      html += `<hr class="w-48 mx-auto h-[3px] bg-blue-900 mb-4"/>`;
      flag = true;
    }
    if (item.date || item.title)
      html += `<div class="flex justify-between items-center">
                <h2 class="text-lg font-bold text-blue-900">${item.title[lang]}</h2>
                ${item.date ? `<span class="text-sm">${item.date[lang]}</span>` : ""}
              </div>`;
    if (item.location) html += `<div class="font-bold">${item.location[lang]}</div>`;
    if (item.subtitle) html += `<div class="whitespace-pre-line">${item.subtitle[lang]}</div>`;
    if (item.list) {
      html += `<ul class="marker:text-blue-900 list-inside list-disc">`;
      for (const listItem of item.list[lang]) {
        html += `<li>${listItem}</li>`;
      }
      html += `</ul>`;
    }
    html += "</div>";
  }

  return html;
}
