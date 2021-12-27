/*
TO-DO LISTS:
[]Responsive sizing
[] Format of 3 dropdowns
[] Functionality
[] Button
[] README
[X] Tinyurl https://tinyurl.com/ExerciseSnacksWebApp
[] Message
[X] Footer
[] Disclaimer privacy
[] Disclaimer inspo
[] CSS scrub
[] Selection logic

*/

console.log(getComputedStyle(document.getElementById("time-box")).width);
var EXERCISE_SNACKS_DATABASE=[];
var CURRENT_FILTER = {};
var ID_TRACKER ={};
var FILTER_TRACKER=[];
var UNIVERSAL_ID = [];

function loadApp(database){
	EXERCISE_SNACKS_DATABASE = database;
	
	var card_container = document.getElementById("cardcontainer");
	for (var i = 0; i < database.length; i++) {
		card_container.appendChild(generateHTMLCard(database[i]));
	}
	setUniversalIDtracker();
	
}



function setUniversalIDtracker(){
	for(var i =0; i<Object.values(EXERCISE_SNACKS_DATABASE).length; i++){
		var key = String(i);
		ID_TRACKER[key] = [true];
	}
}

console.log(ID_TRACKER);

function generateHTMLCard(exercise_snack){
	var wrapper_div=document.createElement('div');
		wrapper_div.className="col-lg-4 col-md-6 col-sm-8 workoutCard";
		wrapper_div.id="workoutCard_"+exercise_snack.id;

	var big_div = document.createElement('div');
		big_div.className= "single-services mt-30 wow fadeIn";
		big_div.setAttribute("data-wow-duration","1s");
		big_div.setAttribute("data-wow-delay","0.2s");
	var smaller_div = document.createElement('div');
		smaller_div.className = "services-content mt-30";
	
	var heading = document.createElement("h4");
		heading.className="services-title";
		heading.innerHTML = exercise_snack.name;
		smaller_div.appendChild(heading);

	var workout_type = document.createElement("p");
		workout_type.className="text";
		workout_type.innerHTML="<strong>Workout type:</strong> "+exercise_snack.type;
		smaller_div.appendChild(workout_type);

	var body_part = document.createElement("p");
		body_part.innerHTML="<strong>Body part:</strong> "+exercise_snack.bodyPart;
		smaller_div.appendChild(body_part);

	var duration = document.createElement("p");
		duration.className="workout_duration"
		duration.innerHTML = "<strong>Duration:</strong> " + exercise_snack.time +" min.";
		smaller_div.appendChild(duration);

	var equipment = document.createElement("p");
		equipment.innerHTML = "<strong>Equipment:</strong> " + exercise_snack.equipment +"<br><br>";
		smaller_div.appendChild(equipment);

	var link = document.createElement("a");
		link.className="external_link";
		link.target="_blank";
		link.href=exercise_snack.link;
		link.innerHTML="link"
		smaller_div.appendChild(link);

	big_div.appendChild(smaller_div);
	wrapper_div.appendChild(big_div);
	
	return wrapper_div;

}

function filter(filter_value){
	var time = ["under10min","under20min","over20min"];
	var type = ["mobility","conditioning","core","strength","workoutvariations","breathingbloodflow"];
	var bodypart = ["fullbody","upperbody","lowerbody"];

	var value = filter_value.value.toLowerCase().replaceAll(" ","").replaceAll("&","");

	// check to see if the passed in value is triggered because the checkbox is CHECKED or NOT CHECKED
	var filter_checked = false;
	if(document.getElementById(filter_value.id).checked==true){
		filter_checked=true;
	}

	var selected_id = [];
	var test = value in time;

	EXERCISE_SNACKS_DATABASE.forEach(function(workoutEntry){
		if(time.includes(value)){
			var snack_time= parseInt(workoutEntry.time.replaceAll(" min.", ""));

			if(value=="under10min" && snack_time <=10){
	 			selected_id.push(workoutEntry.id);
			} else if (value=="under20min" && snack_time <= 20){
				selected_id.push(workoutEntry.id);
			} else if(value =="over20min" && snack_time > 20){
				selected_id.push(workoutEntry.id);
			}
		} else if(type.includes(value)){
			var snack_type = workoutEntry.type.toLowerCase().replaceAll(" ","").replaceAll("&","");
			if(value=="mobility" && snack_type.includes("mobility")){
	 			selected_id.push(workoutEntry.id);
	 		} else if(value=="conditioning" && snack_type.includes("conditioning")){
	 			selected_id.push(workoutEntry.id);
	 		} else if(value=="core" && snack_type.includes("core")){
	 			selected_id.push(workoutEntry.id);
	 		} else if(value=="strength" && snack_type.includes("strength")){
	 			selected_id.push(workoutEntry.id);
	 		} else if(value=="workoutvariations" && snack_type.includes("workoutvariations")){
	 			selected_id.push(workoutEntry.id);
	 		} else if(value=="breathingbloodflow" && snack_type.includes("breathingbloodflow")){
	 			selected_id.push(workoutEntry.id);
	 		}
		} else if(bodypart.includes(value)){
			var snack_bodypart = workoutEntry.bodyPart.toLowerCase().replaceAll(" ","").replaceAll(" & ","");
			if(value=="fullbody" && snack_bodypart.includes("fullbody")){
	 			selected_id.push(workoutEntry.id);
	 		} else if(value=="upperbody" && snack_bodypart.includes("upperbody")){
	 			selected_id.push(workoutEntry.id);
	 		} else if(value=="lowerbody" && snack_bodypart.includes("lowerbody")){
	 			selected_id.push(workoutEntry.id);
	 		} 
		}

	});

	//filter_checked == true indicates that the checkbox has been checked
	/*
	This is the breakdown of the following section:
	1. If the checkbox is CHECKED:
		1A: add checked value to CURRENT_FILTER
		1B: iterate through the list of IDs and add the checked box ("under10min") to each of the IDs' entries in the ID_TRACKER dictionary
	2. If the checkbox is UNCHECKED:
		2A: iterate through list of IDs based on checked box's value enty in the CURRENT FILTER dictionary and remove the checkbox value from the id's key-value pair
		2B: remove value from CURRENT_FILTER
	*/

	if(filter_checked){
		CURRENT_FILTER[value] = selected_id;
		console.log(Object.keys(CURRENT_FILTER).length);
		if(UNIVERSAL_ID.length == 0){
			UNIVERSAL_ID = selected_id;
		}
		if(Object.keys(CURRENT_FILTER).length>1){
	
			UNIVERSAL_ID = selected_id.filter(function(n) {
		    	return UNIVERSAL_ID.indexOf(n) !== -1;
			});
			console.log(UNIVERSAL_ID);
			
		}
		for(var i = 0; i < UNIVERSAL_ID.length; i++){
			if(ID_TRACKER[UNIVERSAL_ID[i]] == true){
				ID_TRACKER[UNIVERSAL_ID[i]] = [value];
			}else{
				ID_TRACKER[UNIVERSAL_ID[i]].push(value);
			}
		}
		// console.log(FILTER_TRACKER);
		if(!FILTER_TRACKER.includes(value)){
			FILTER_TRACKER.push(value);
		}
		// console.log(FILTER_TRACKER);
	}else{
		if(value in CURRENT_FILTER){
			// console.log("pre operations" + FILTER_TRACKER);
			
			var filter_index = FILTER_TRACKER.indexOf(value);
			
			// console.log("index check "+ filter_index);
			if(filter_index>-1){
				if(FILTER_TRACKER.length==1){
					console.log("size of FILTER_TRACKER " + FILTER_TRACKER.length);
					console.log(FILTER_TRACKER);
					FILTER_TRACKER=[];
				}
				FILTER_TRACKER=FILTER_TRACKER.splice(filter_index,1);
			}
			// console.log(FILTER_TRACKER);
			for (var id in CURRENT_FILTER[value]){
				var id_index = ID_TRACKER[id].indexOf(value);
				if(id_index>-1){
					// ID_TRACKER[id] = ID_TRACKER[id].splice(id_index,1);
					if(id_index==1){
						ID_TRACKER[id] = [true];
					}else{
						ID_TRACKER[id]=ID_TRACKER[id].splice(id_index,1);

					}
				}
			}
			delete CURRENT_FILTER[value];
		}
	}
	// var intersected_IDs = CURRENT_FILTER[Object.values(CURRENT_FILTER)[0]];
	
	// if(Object.values(CURRENT_FILTER).length >1){
	// 	for(var i = 1; i < Object.values(CURRENT_FILTER).length; i++){
	// 		console.log("to validate " + Object.values(CURRENT_FILTER));
	// 		var check =Object.values(CURRENT_FILTER)[i];
	// 		console.log("check: " + check);
			
	// 		intersected_IDs = check.filter(function(n) {
	// 		    return intersected_IDs.indexOf(n) !== -1;
	// 		});
			
	// 		console.log("hello " + intersected_IDs);
	// 	}
	// }
	
	// console.log(Object.values(CURRENT_FILTER).length);
	displayCards();
	
}


function displayCards(){
	for(var id in ID_TRACKER){
		var card = document.getElementById("workoutCard_"+id);
		if(FILTER_TRACKER.length==0){
			card.style.display="block";
		}else{
			if(ID_TRACKER[id].length!= true){
				card.style.display="block";
			}else{
				card.style.display="none";
			}
		}
	}

}