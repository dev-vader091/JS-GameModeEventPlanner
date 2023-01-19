var events = [{
  event: "ComicCon",
  city: "New York",
  state: "New York",
  attendance: 240000,
  date: "06/01/2017",
},
{
  event: "ComicCon",
  city: "New York",
  state: "New York",
  attendance: 250000,
  date: "06/01/2018",
},
{
  event: "ComicCon",
  city: "New York",
  state: "New York",
  attendance: 257000,
  date: "06/01/2019",
},
{
  event: "ComicCon",
  city: "San Diego",
  state: "California",
  attendance: 130000,
  date: "06/01/2017",
},
{
  event: "ComicCon",
  city: "San Diego",
  state: "California",
  attendance: 140000,
  date: "06/01/2018",
},
{
  event: "ComicCon",
  city: "San Diego",
  state: "California",
  attendance: 150000,
  date: "06/01/2019",
},
{
  event: "HeroesCon",
  city: "Charlotte",
  state: "North Carolina",
  attendance: 40000,
  date: "06/01/2017",
},
{
  event: "HeroesCon",
  city: "Charlotte",
  state: "North Carolina",
  attendance: 45000,
  date: "06/01/2018",
},
{
  event: "HeroesCon",
  city: "Charlotte",
  state: "North Carolina",
  attendance: 50000,
  date: "06/01/2019",
},
];

function buildDropdown() {
  // get the dropdown menu from the page
  let dropdownMenu = document.getElementById('eventDropdown');

  // empty the innerHTML to ensure it is clean
  dropdownMenu.innerHTML = "";

  // get our events
  let currEvents = events;

  // pull out JUST the city names 
  let eventCities = currEvents.map((event) => event.city);
  // filter the cities to only DISTINCT city names
  let distinctCities = [...new Set(eventCities)];

  // get template from the page
  const template = document.getElementById('dropdownItemTemplate');

  // copy the template
  let dropdownTemplateNode = document.importNode(template.content, true);
  // get the <a> tag from the template copy
  let menuItem = dropdownTemplateNode.querySelector('.dropdown-item');
  // change the text
  menuItem.textContent = "All Cities";
  menuItem.setAttribute('data-string', 'All');
  // add item to the page 
  dropdownMenu.appendChild(menuItem);
}