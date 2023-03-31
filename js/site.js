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
  let currEvents = getEventData();

  // pull out JUST the city names 
  let eventCities = currEvents.map((event) =>{
    return event.city;
  } );
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
  dropdownMenu.appendChild(dropdownTemplateNode);

  for(let i = 0; i < distinctCities.length; i++) {
    let cityMenuItem = document.importNode(template.content, true);
    let cityButton = cityMenuItem.querySelector('a');
    
    cityButton.textContent = distinctCities[i];
    cityButton.setAttribute('data-string',distinctCities[i]);
    dropdownMenu.appendChild(cityMenuItem);
  }

  displayStats(currEvents);
  displayEventData(currEvents);
}

function displayStats(eventsArray) {
  let stats = calculateStats(eventsArray)
  // let totalAttendance = calculateTotal(eventsArray);
  // let averageAttendance = calculateAverage(eventsArray);
  // let mostAttended = calculateMostAttended(eventsArray);
  // let leastAttended = calculateLeastAttended(eventsArray);

  // do math
  
  document.getElementById('total').textContent = stats.total.toLocaleString();
  document.getElementById('average').textContent = stats.averageAttendance.toLocaleString("en-US", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });
  document.getElementById('most').textContent = stats.maxAttendance.toLocaleString();
  document.getElementById('least').textContent = stats.minAttendance.toLocaleString();

}

function calculateStats(eventsArray) {

  let sum = 0;
  let average = 0;
  let max = eventsArray[0].attendance;
  let min = eventsArray[0].attendance;



  for(i = 0; i < eventsArray.length; i++) {
    let currentEvent = eventsArray[i];
    
    sum += currentEvent.attendance;

    if(currentEvent.attendance > max) {
      max = currentEvent.attendance;
    }
  
    if(currentEvent.attendance < min) {
      min = currentEvent.attendance;
    }

  }

  average = sum / eventsArray.length;

  let stats = {
    total: sum,
    averageAttendance: average,
    minAttendance: min,
    maxAttendance: max
  }
  

  return stats;
  
}

function displayEventData(eventsArray) {

  let tableBody = document.getElementById('eventTableBody');
  const tableRowTemplate = document.getElementById('eventTableRowTemplate');

  tableBody.innerHTML = '';

  for(i = 0; i < eventsArray.length; i++) {
    let eventRow = document.importNode(tableRowTemplate.content, true);
    let currentEvent = eventsArray[i];

    
        // <td data-id="event"></td>
        // <td data-id="city"></td>
        // <td data-id="state"></td>
        // <td data-id="attendance"></td>
        // <td data-id="eventDate"></td>
    
    let tableCells = eventRow.querySelectorAll('td');
    
    tableCells[0].textContent = currentEvent.event;
    tableCells[1].textContent = currentEvent.city;
    tableCells[2].textContent = currentEvent.state;
    tableCells[3].textContent = currentEvent.attendance;
    tableCells[4].textContent = currentEvent.date;

    tableBody.appendChild(eventRow);
  }


}

function getEventData() {
  let currentEvents = JSON.parse(localStorage.getItem('zdEventData'));

  if (currentEvents == null) {
      currentEvents = events;
      localStorage.setItem('zdEventData', JSON.stringify(currentEvents) );
  }

  return currentEvents;
}

function getEvents(element) {
  let currentEvents = getEventData();
  let cityName = element.getAttribute('data-string');

  let filteredEvents = currentEvents;


  if(cityName !== 'All') {
     filteredEvents = currentEvents.filter(
      function (event) {
          if(cityName == event.city) {
        return event;
      }
    });

  }

  document.getElementById('statsHeader').textContent = cityName
  displayStats(filteredEvents);
  displayEventData(filteredEvents);
}

function saveEventData() {
  let eventName = document.getElementById('newEventName').value;
  let cityName = document.getElementById('newEventCity').value;
  let eventAttendance = parseInt(document.getElementById('newEventAttendance').value);
  let eventDate = document.getElementById('newEventDate').value;

  eventDate = `${eventDate} 00:00`;
  eventDate = new Date(eventDate).toLocaleDateString();

  let stateSelect = document.getElementById('newEventState');
  let state = stateSelect.options[stateSelect.selectedIndex].text;

  let newEvent = {
    attendance: eventAttendance,
    event: eventName,
    date: eventDate,
    state: state,
    city: cityName,
  }

  let currentEvents = getEventData();
  currentEvents.push(newEvent)

  localStorage.setItem('zdEventData', JSON.stringify(currentEvents));

  // update the page
  buildDropdown();
  document.getElementById('statsHeader').textContent = "All";
  document.getElementById('newEventForm').textContent = '';
}

