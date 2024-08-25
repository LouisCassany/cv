import { writeFileSync } from "fs";
import fs from "fs";

const cv = JSON.parse(fs.readFileSync("./cv.json", "utf-8"));

generate_html("fr", "./fr.html");
generate_html("en", "./en.html");

function generate_html(lang, page_name) {
  const education = add_section(cv[0], lang);
  const experience = add_section(cv[1], lang);
  const skills = add_section(cv[2], lang);
  const publications = add_section(cv[3], lang);

  const title = lang == "fr" ? "Docteur en automatique" : "Control systems engineer (PhD)";
  const infos = lang == "fr" ? "29 ans, permis B, Le Teich" : "29 years old, Le Teich (France)";
  const link_text = lang == "fr" ? "English version" : "Version française";
  const href = lang == "fr" ? "en.html" : "fr.html";

  let html = `
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

<style>
@media print {
    @page {
        size: A4 portrait;
        margin: 1cm 0cm;
    }

    .print {
        display: revert;
    }

    .no-print {
        display: none;
    }

    /* h1,
    h2,
    h3,
    h4,
    caption {
        page-break-after: avoid;
    } */

}
</style>

<body>
<div class="absolute top-2 w-full flex justify-center">
  <a class="no-print font-mono text-red-600 hover:text-red-900 underline" href="${href}">${link_text}</a>
</div>
  <div class="flex justify-center items-center py-4 md:p-10 mt-10 print:mt-0 px-4 sm:px-8">
  

<div class="flex sm:space-x-16 justify-between w-full sm:justify-center">
    <img src="./photo_cv.jpg" class="h-24 sm:h-36 rounded-lg shadow-2xl my-auto" />
    <div class="flex flex-col items-end text-right justify-between print:justify-start">
      <span class="text-xl sm:text-4xl text-blue-900"> Louis CASSANY </span>
      <span class="text-md sm:text-xl text-blue-900 font-bold "> ${title} </span>
      <span> cassany.louis@gmail.com </span>
      <span> (+33) 6 45 32 03 41</span>
    </div>
  </div>
  </div>
  <div class="print:columns-2 lg:columns-2 px-4 sm:px-8 xl:w-9/12 mx-auto pb-8 xl:text-xl" id="cv">
    ${education}
    ${experience}
    ${skills}
    ${publications}
  </div>
</body>

</html>`;

  writeFileSync(page_name, html);
}



function add_section(section, lang) {
  let html = `<div>`;
  let flag = false;

  for (const item of section.items) {
    html += `<div class="px-2 flex flex-col w-full mb-4 break-inside-avoid-column md:px-16 item">`;
    if (!flag) {
      html += `<h1 class="lg:text-2xl text-2xl text-blue-900  font-bold">${section.title[lang]}</h1>`;
      html += `<hr class="h-[3px] bg-blue-900 mb-4 border-0"/>`;
      flag = true;
    }
    if (item.date || item.title)
      html += `<div class="flex justify-between items-center">
                <h2 class="lg:text-xl text-lg font-bold text-blue-900">${item.title[lang]}</h2>
                ${item.date ? `<span class="text-sm whitespace-nowrap">${item.date[lang]}</span>` : ""}
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
  html += `</div>`;

  return html;
}
