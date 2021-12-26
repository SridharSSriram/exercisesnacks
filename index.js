
function generateCards(coredb){
	
	var card_container = document.getElementById("cardcontainer");
	// workout_database.forEach(function(workout_entry){
	// 	card_container.appendChild(generate_HTML_card(workout_entry));
	// });
	for (var i = 0; i < coredb.length; i++) {
		card_container.appendChild(generate_HTML_card(coredb[i]));
	}
}

function generate_HTML_card(workout_entry){
	console.log(workout_entry);
	var wrapper_div=document.createElement('div');
		wrapper_div.className="col-lg-4 col-md-7 col-sm-8 workoutcard";
		wrapper_div.id="workoutcard_"+workout_entry.id;
		// console.log(wrapper_div.id);

	// console.log(workout_entry);
	var big_div = document.createElement('div');
		big_div.className= "single-services mt-30 wow fadeIn";
		// data-wow-duration="1s" data-wow-delay="0.2s"
		big_div.setAttribute("data-wow-duration","1s");
		big_div.setAttribute("data-wow-delay","0.2s");
	var smaller_div = document.createElement('div');
		smaller_div.className = "services-content mt-30";
	// big_div.appendChild(smaller_div);
	
	var heading = document.createElement("h4");
		heading.className="services-title";
		heading.innerHTML = workout_entry.name;
		smaller_div.appendChild(heading);

	var body_part = document.createElement("p");
		body_part.className="text";
		body_part.innerHTML="<strong>Workout Type:</strong> "+workout_entry.type;
		smaller_div.appendChild(body_part);

	var body_part = document.createElement("p");
		body_part.innerHTML="<strong>Body part:</strong> "+workout_entry.bodyPart;
		smaller_div.appendChild(body_part);

	var duration = document.createElement("p");
		duration.className="workout_duration"
		duration.innerHTML = "<strong>Time:</strong> " + workout_entry.time +" min.";
		smaller_div.appendChild(duration);

	var equipment = document.createElement("p");
		equipment.innerHTML = "<strong>Equipment:</strong> " + workout_entry.equipment +"<br><br>";
		smaller_div.appendChild(equipment);

	var link = document.createElement("a");
		link.className="external_link";
		link.target="_blank";
		link.href=workout_entry.link;
		link.innerHTML="link"
		smaller_div.appendChild(link);

	big_div.appendChild(smaller_div);
	wrapper_div.appendChild(big_div);
	return wrapper_div;

}
// CODE FOR DETECTING IF BODY PART ALIGNS WITH PREFERENCE

var LOWER_BODY = ["lower body", "hips", "ankles", "legs"];
var UPPER_BODY = ["upper body", "spine", "arms", "back", "neck", "wrists"];
var FULL_BODY = ["full body"];

var testing_tings = "Spine, Hips, Legs";

var spliced_tings = testing_tings.toLowerCase().split(", ");

spliced_tings.forEach(function(ting){
	if(LOWER_BODY.includes(ting)){
		console.log("lower body");
	}else if(UPPER_BODY.includes(ting)){
		console.log("upper body");
	} else if(FULL_BODY.includes(ting)){
		console.log("full body");
	}

})




function toggleVisibility(passed_in_item){
	if (passed_in_item.style.display === "none") {
		passed_in_item.style.display = "block";
	} else {
		passed_in_item.style.display = "none";
	}
}


var value_array = [];
var article_list = document.querySelectorAll('.workoutcard');

function valueUpdate(totalItems){
	// console.log(totalItems);
	var value_entity = totalItems.value.toLowerCase();
	if(value_entity.includes(" ")){
		value_entity=value_entity.replace(" ","");
	}
	var workout_list = document.querySelectorAll('.workoutcard');
	switch (value_entity){
		case "fullbody":
			workout_list.forEach(function(workoutentry){
				if(!(workoutentry.innerHTML.toLowerCase().includes(FULL_BODY))){
					workoutentry.style.display = "none";
				}
				console.log("check this: " + workoutentry);
			})
		case "lowerbody":
			console.log("lowerbod");
		case "upperbody":
			console.log("yikies");
		case "min5":
			
			workout_database.forEach(function(workoutentry){
				if(workoutentry.time >5){
					// console.log("#workoutcard_"+workoutentry.backend_ID);
					var hide_this=document.getElementById("workoutcard_"+workoutentry.backend_ID);
					hide_this.style.display="none";
					
				}
			});
		case "under10min":
			
			workout_database.forEach(function(workoutentry){
				if(workoutentry.time >10){
					// console.log("#workoutcard_"+workoutentry.backend_ID);
					var hide_this=document.getElementById("workoutcard_"+workoutentry.backend_ID);
					hide_this.style.display="none";
					
				}
			});
		case "over10min":
			
			workout_database.forEach(function(workoutentry){
				if(workoutentry.time <10){
					// console.log("#workoutcard_"+workoutentry.backend_ID);
					var hide_this=document.getElementById("workoutcard_"+workoutentry.backend_ID);
					hide_this.style.display="none";
					
				}
			});
	}


	var showing_things = document.querySelectorAll('article.'+value_entity);
	// console.log(showing_things);

	var article_toggle = document.querySelectorAll('article');
	article_toggle.forEach(function(userItem){
		// console.log(userItem.className);
		if(!(userItem.className.includes(value_entity))){
			toggleVisibility(userItem);
		}
	})
	if(totalItems.checked){
		console.log("it's been checked");
		value_array.push(value_entity);	
		console.log(value_array);
		return;
	} else{
		console.log("it has NOT BEEN CHECKED");
		value_array.pop(value_entity);
		// showing_things.forEach(function(userItem) {
		// 	toggleVisibility(userItem);
			
		// });

	}
}

function filterResults(){
	value_array.forEach(function(userItem){
		console.log(userItem);
		var applicable_entities=document.querySelectorAll('.'+userItem);
	});
}

// function CSVToArray( strData, strDelimiter ){
// 		// Check to see if the delimiter is defined. If not,
// 		// then default to comma.
// 		strDelimiter = (strDelimiter || ",");

// 		// Create a regular expression to parse the CSV values.
// 		var objPattern = new RegExp(
// 			(
// 				// Delimiters.
// 				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

// 				// Quoted fields.
// 				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

// 				// Standard fields.
// 				"([^\"\\" + strDelimiter + "\\r\\n]*))"
// 			),
// 			"gi"
// 			);


// 		// Create an array to hold our data. Give the array
// 		// a default empty first row.
// 		var arrData = [[]];

// 		// Create an array to hold our individual pattern
// 		// matching groups.
// 		var arrMatches = null;


// 		// Keep looping over the regular expression matches
// 		// until we can no longer find a match.
// 		while (arrMatches = objPattern.exec( strData )){

// 			// Get the delimiter that was found.
// 			var strMatchedDelimiter = arrMatches[ 1 ];

// 			// Check to see if the given delimiter has a length
// 			// (is not the start of string) and if it matches
// 			// field delimiter. If id does not, then we know
// 			// that this delimiter is a row delimiter.
// 			if (
// 				strMatchedDelimiter.length &&
// 				(strMatchedDelimiter != strDelimiter)
// 				){

// 				// Since we have reached a new row of data,
// 				// add an empty row to our data array.
// 				arrData.push( [] );

// 			}


// 			// Now that we have our delimiter out of the way,
// 			// let's check to see which kind of value we
// 			// captured (quoted or unquoted).
// 			if (arrMatches[ 2 ]){

// 				// We found a quoted value. When we capture
// 				// this value, unescape any double quotes.
// 				var strMatchedValue = arrMatches[ 2 ].replace(
// 					new RegExp( "\"\"", "g" ),
// 					"\""
// 					);

// 			} else {

// 				// We found a non-quoted value.
// 				var strMatchedValue = arrMatches[ 3 ];

// 			}


// 			// Now that we have our value string, let's add
// 			// it to the data array.
// 			arrData[ arrData.length - 1 ].push( strMatchedValue );
// 		}

// 		// Return the parsed data.
// 		return( arrData );
// 	}

// function parseCSV(str) {
//     var arr = [];
//     var quote = false;  // 'true' means we're inside a quoted field

//     // Iterate over each character, keep track of current row and column (of the returned array)
//     for (var row = 0, col = 0, c = 0; c < str.length; c++) {
//         var cc = str[c], nc = str[c+1];        // Current character, next character
//         arr[row] = arr[row] || [];             // Create a new row if necessary
//         arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary

//         // If the current character is a quotation mark, and we're inside a
//         // quoted field, and the next character is also a quotation mark,
//         // add a quotation mark to the current column and skip the next character
//         if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

//         // If it's just one quotation mark, begin/end quoted field
//         if (cc == '"') { quote = !quote; continue; }

//         // If it's a comma and we're not in a quoted field, move on to the next column
//         if (cc == ',' && !quote) { ++col; continue; }

//         // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
//         // and move on to the next row and move to column 0 of that new row
//         if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

//         // If it's a newline (LF or CR) and we're not in a quoted field,
//         // move on to the next row and move to column 0 of that new row
//         if (cc == '\n' && !quote) { ++row; col = 0; continue; }
//         if (cc == '\r' && !quote) { ++row; col = 0; continue; }

//         // Otherwise, append the current character to the current column
//         arr[row][col] += cc;
//     }
//     return arr;
// }