var startDate = "";
function createGrid() {
    var dateSelected = document.getElementById("txtWeek").value;
    var gridChange = true;

    if (!dateSelected == '') {

        var clientdate = new Date(dateSelected);

        clientdate.setTime(clientdate.getTime() + clientdate.getTimezoneOffset() * 60 * 1000);
        var date = new Date(clientdate.getTime());
      var day = date.getDay();

        var array = [];
        for (var i = 0; i < 7; i++) {
            if (i - day != 0) {
                var days = i - day;
                var newDate = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
                array.push(newDate);

            }
            else
                array.push(date);
        }




        var firstdate = array[0].toString();

        if (startDate == firstdate)
            gridChange = false;
        else
            startDate = firstdate;

        var dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var newtable='', startTag='', endTag='', sumtable='';

        for (var t = 0; t < array.length; t++) {
            var date = new Date(array[t]);
            var month = date.getMonth() + 1;
            if (t == 6) {
                setWeekEndDate(date);
            }

            newtable += "<tr onmouseover=\"this.style.backgroundColor='#e6f7ff';\" onmouseout=\"this.style.backgroundColor='#ffffff';\"><td>" + dayArray[date.getDay()] + ' ' + month + '/' + date.getDate()
                + "</td><td contenteditable='true' id='hr" + t + "' + onkeyup='javascript:validateNumericHours(this);calculateTotHours(this);' align='right'> 0</td><td contenteditable='true'> </td></tr>";

        }
        if (!gridChange)
            return 0;
        startTag ="<table class='timesheet'><tr><th width='20%'>Days</th><th width='20%'>Hours</th><th width='60%'>Task Details</th></tr>";
        endTag = "</table></br></br>";
        sumtable = "<table class ='timesheet' ><tr><td><b>Total Hours</b> </td> <td id ='tot_Hours'  align='right'>0</td></tr>";
        sumtable += "<tr><td><b>Total Pay</b></td> <td id ='tot_Pay' align='right'>0</td></tr></table> ";
        document.getElementById("Datetable").innerHTML = startTag + newtable + endTag + sumtable;


    }


}

function calculateTotHours(element) {

    var total = 0;
    if (!isNaN(parseFloat(element.textContent))) {
        for (var i = 0; i < 7; i++) {
            if (!isNaN(parseFloat(document.getElementById("hr" + i).textContent)))
                total += parseFloat(document.getElementById("hr" + i).textContent);
        }
        document.getElementById("tot_Hours").innerHTML = total;
        calculateSum();
    }

}

function calculateSum() {
    var totalHr = parseFloat(document.getElementById("tot_Hours").textContent);
    var payRate = parseFloat(document.getElementById("txtRate").value);
    if (totalHr > 0 && payRate > 0 && !isNaN(totalHr))
        document.getElementById("tot_Pay").innerHTML = Math.round(totalHr * payRate * 100) / 100;
    else
        document.getElementById("tot_Pay").innerHTML = 0;
}

function selectCurrentWeek() {
    var date = new Date();


    var month = parseInt(date.getMonth()) + 1;
    var monFormat = (month > 9) ? month : '0' + month;
    var toDate = (parseInt(date.getDate()) > 9) ? date.getDate() : '0' + date.getDate();
    var today = date.getUTCFullYear() + "-" + monFormat + "-" + toDate;
    document.getElementById("txtWeek").value = today;


    createGrid();
    document.getElementById("Date").innerHTML = "<p>Date:</br>" + today + "</p>";

}

function validateNumeric(e) {

    e.value = e.value.replace(/[^0-9\.]/g, "").replace(/\./, "y").replace(/\./g, "").replace(/y/, ".");
}

function validateNumericHours(e) {

    e.textContent = e.textContent.replace(/[^0-9\.]/g, "").replace(/\./, "y").replace(/\./g, "").replace(/y/, ".");
    if (e.textContent > 24)
        e.textContent = 0;

}

function validateAlphabets(e) {
    e.value = e.value.replace(/[^a-z A-Z \s]/g, "");

}
function setWeekEndDate(date) {
    var month = parseInt(date.getMonth()) + 1;
    var monFormat = (month > 9) ? month : '0' + month;
    var toDate = (parseInt(date.getDate()) > 9) ? date.getDate() : '0' + date.getDate();
    var today = date.getUTCFullYear() + "-" + monFormat + "-" + toDate;
    document.getElementById("txtWeek").value = today;

}



function printPage() {
    document.getElementById("printButton").innerHTML = "";
    window.print();
    setTimeout(function () {
        document.getElementById("printButton").innerHTML = "<button onclick='javascript:printPage()' > Print </button>";
    }, 500);



}