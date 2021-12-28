/*
TO-DO LISTS:
[X] Format of 3 dropdowns
[] Functionality
[X] Button
[X] README
[X] Tinyurl https://tinyurl.com/ExerciseSnacksWebApp
[X] Message
[X] Footer
[N/A] Disclaimer privacy
[X] Disclaimer inspo
[] CSS scrub
[] Selection logic
[X] total # of workouts

*/


var EXERCISE_SNACKS_DATABASE=[];
var CURRENT_FILTER = {};
var ID_TRACKER ={};
var FILTER_TRACKER=[];
var UNIVERSAL_ID = [];
var DISPLAYED_WORKOUTS = undefined;
var TIME = ["under10min","under20min","over20min"];
var TYPE = ["mobility","conditioning","core","strength","workoutvariations","breathingbloodflow"];
var BODYPART = ["fullbody","upperbody","lowerbody"];

function loadApp(database){
	EXERCISE_SNACKS_DATABASE = database;
	
	DISPLAYED_WORKOUTS = EXERCISE_SNACKS_DATABASE.length;
	
	updateTotalWorkouts(DISPLAYED_WORKOUTS);

	
	var card_container = document.getElementById("cardcontainer");
	for (var i = 0; i < database.length; i++) {
		card_container.appendChild(generateHTMLCard(database[i]));
	}
	// setIDTracker();
	for(var i =0; i<Object.values(EXERCISE_SNACKS_DATABASE).length; i++){
		var key = String(i);
		ID_TRACKER[key] = false;
		// ID_TRACKER[key] = false;
	}
	
}

function updateTotalWorkouts(total_num){
	var total_workouts = document.getElementById('total-snacks-text');
	total_workouts.innerHTML= "<span style='color:red'>" + total_num + "</span> exercise snacks";

}



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

	var value = filter_value.value.toLowerCase().replaceAll(" ","").replaceAll("&","");

	// check to see if the passed in value is triggered because the checkbox is CHECKED or NOT CHECKED
	var filter_checked = false;
	if(document.getElementById(filter_value.id).checked==true){
		filter_checked=true;
	}

	var selected_id = [];

	EXERCISE_SNACKS_DATABASE.forEach(function(workoutEntry){
		if(TIME.includes(value)){
			var snack_time= parseInt(workoutEntry.time.replaceAll(" min.", ""));

			if(value=="under10min" && snack_time <=10){
	 			selected_id.push(workoutEntry.id);
			} else if (value=="under20min" && snack_time <= 20){
				selected_id.push(workoutEntry.id);
			} else if(value =="over20min" && snack_time > 20){
				selected_id.push(workoutEntry.id);
			}
		} else if(TYPE.includes(value)){
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
		} else if(BODYPART.includes(value)){
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


	if(filter_checked){
		CURRENT_FILTER[value] = selected_id;
		if(!FILTER_TRACKER.includes(value)){
			FILTER_TRACKER.push(value);
		}

		var intersect_or_union = unionOrIntersection();

		updateTotalWorkouts(intersect_or_union.length);

		var big_arr = Array.from(Array(EXERCISE_SNACKS_DATABASE.length).keys());
		var remain_arr = big_arr.filter(x => !intersect_or_union.includes(x));
		setIDTracker(intersect_or_union,remain_arr);

	}else{

		if(value in CURRENT_FILTER){

			var filter_index = FILTER_TRACKER.indexOf(value);
			
			if(filter_index>-1){
				if(FILTER_TRACKER.length==1){
					FILTER_TRACKER=[];
					updateTotalWorkouts(EXERCISE_SNACKS_DATABASE.length);
				}else{
					var new_filter_tracker = [];
					for(var item in FILTER_TRACKER){
						if(FILTER_TRACKER[item]!=value){
							new_filter_tracker.push(FILTER_TRACKER[item]);
						}
					}
					FILTER_TRACKER=new_filter_tracker;
				}
			}

			delete CURRENT_FILTER[value];

			var intersect_or_union = unionOrIntersection();
			if(intersect_or_union.length==0){
				updateTotalWorkouts(EXERCISE_SNACKS_DATABASE.length);
				setIDTracker(0,0);
			}else{
				updateTotalWorkouts(intersect_or_union.length);
				var big_arr = Array.from(Array(EXERCISE_SNACKS_DATABASE.length).keys());
				var remain_arr = big_arr.filter(x => !intersect_or_union.includes(x));
				setIDTracker(intersect_or_union,remain_arr);
			}
			
		}
	}
	displayCards();

	
}

function unionOrIntersection(){
	var tracker = {};
	var body = [];
	var time = [];
	var type=[];
	for(var index in FILTER_TRACKER){
		if(BODYPART.includes(FILTER_TRACKER[index])){
			body.push(FILTER_TRACKER[index]);
		}else if(TIME.includes(FILTER_TRACKER[index])){
			time.push(FILTER_TRACKER[index]);
		}else if(TYPE.includes(FILTER_TRACKER[index])){
			type.push(FILTER_TRACKER[index]);
		}
	}
	if(body.length>1){
		tracker["body"] = unionArray(body);
	}else if(body.length==1){
		tracker["body"] = CURRENT_FILTER[body];
	}

	if(time.length>1){
		tracker["time"] = unionArray(time);
	}else if(time.length==1){
		tracker["time"] = CURRENT_FILTER[time];
	}


	if(type.length>1){
		tracker["type"] = unionArray(type);
	}else if(type.length==1){
		tracker["type"] = CURRENT_FILTER[type];
	}

	var final_array =[];
	if(tracker["body"] ==undefined || tracker["time"] ==undefined || tracker["type"] == undefined){
		
		if(tracker["body"] != undefined && ((tracker["time"]==undefined) && tracker["type"]==undefined)){
			final_array=tracker["body"]
		} else if((tracker["body"] != undefined && tracker["time"]!=undefined) && tracker["type"]==undefined){
			final_array=tracker["body"].filter(function(n){
				return tracker["time"].indexOf(n)!==-1;
			});
		} else if((tracker["body"] != undefined && tracker["type"]!=undefined) && tracker["time"]==undefined){
			final_array=tracker["body"].filter(function(n){
				return tracker["type"].indexOf(n)!==-1;
			});
		} 
		else if(tracker["time"] != undefined && ((tracker["body"]==undefined) && tracker["type"]==undefined)){
			final_array=tracker["time"];

		}else if((tracker["time"] != undefined &&tracker["type"]!=undefined) && tracker["body"]==undefined){
			final_array=tracker["time"].filter(function(n){
				return tracker["type"].indexOf(n)!==-1;
			});
		} else if(tracker["type"] != undefined && ((tracker["time"]==undefined) && tracker["body"]==undefined)){
			final_array=tracker["type"];
		}

	}else{
		final_array = tracker["body"].filter(function(n){
			return tracker["time"].indexOf(n)!==-1;
		});

		final_array = tracker["type"].filter(function(n){
			return final_array.indexOf(n)!==-1;
		});
	}

	return final_array;



}

function unionArray(array){
	var returned_array = CURRENT_FILTER[array[0]];
	for(var index=1; index<array.length; index++){
		returned_array = arrayUnique(returned_array.concat(CURRENT_FILTER[array[index]]));
	}
	// console.log(returned_array);
	return returned_array;
}

function arrayUnique(array){
	var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

function setIDTracker(true_arr, false_arr){
	if(true_arr==false_arr && true_arr==0){
		for(var z = 0; z<EXERCISE_SNACKS_DATABASE.length;z++){
			ID_TRACKER[z] = true;
		}
	}
	for(var i =0; i<true_arr.length;i++){
		ID_TRACKER[true_arr[i]]=true;
	}
	for(var j =0; j<false_arr.length;j++){
		ID_TRACKER[false_arr[j]]=false;
	}
}

function displayCards(){
	for(var id in ID_TRACKER){
		// console.log(ID_TRACKER[id]);
		var card = document.getElementById("workoutCard_"+id);
		if(FILTER_TRACKER.length==0){
			card.style.display="block";
		}else{
			if(ID_TRACKER[id]== true){
				// console.log("i'm here!");
				card.style.display="block";
			}else{
				card.style.display="none";
			}
		}
	}

}