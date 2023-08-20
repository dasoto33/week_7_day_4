const form = document.getElementById("input-form")

// create variable for the table body to use easily 
// use query selector to target the table body 
const tableBody = document.querySelector("#racer-table tbody")


// add listener for the search button
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  
  const season = document.getElementById("season").value
  const round = document.getElementById("round").value
  

  // make conditionals for the inputs 

  //
  // error message if either input is empty
  if (!season || !round) {
    alert("Please enter both season and round.")
    return
  }
  
  // Error message if year is earlier than 1950 (no data available)
  if (season < 1950 || season < 1000) {
    alert("Season must be 1950 or later and include 4 digits (YYYY)")
    return
  }

  // use axios to make a get request, which is assigned to variable
  try {
    const response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    const driverData = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    // clear any existing table rows
    tableBody.innerHTML = ""

    // create the table with the fetched data
    // change to for loop to only display top 7, not all results
    // create variabe for the rows to populate the data assigned to driverData variable
    // create a variable for each cell and its position and create the cell/row using insertCell method
    for (let i=0; i < Math.min(7, driverData.length); i++) {
      const driver = driverData[i]
      const row = tableBody.insertRow(i)
      const positionCell = row.insertCell(0)
      const driverCell = row.insertCell(1)
      const constructorCell = row.insertCell(2)
      const pointsCell = row.insertCell(3)


      // assign the data from driver to each cell 
      positionCell.textContent = driver.position
      driverCell.textContent = `${driver.Driver.givenName} ${driver.Driver.familyName}`
      constructorCell.textContent = driver.Constructors[0].name
      pointsCell.textContent = driver.points
    };
  } catch (error) { // throw an error message if something went wrong
    console.error("Error fetching data:", error);
  }
});