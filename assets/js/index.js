var workout_database = [
		{
			workoutName: "Sunday School Mobility",
			targetedBodyPart: "Full body, Hips, Spine, Legs, Core",
			time: 8,
			equipment: "Mat",
			insta_link: "https://www.instagram.com/p/CJCNTW5gfuu/?igshid=1ata3bxhjzk22"
		},
		{
			workoutName: "Blood Booster",
			targetedBodyPart: "Fully body, Core",
			time: 5,
			equipment: "N/A",
			insta_link: "https://www.instagram.com/tv/CI30yVfAT-M/?igshid=kg1hk4a8j4me"
		},
		{
			workoutName: "Spine, Neck, & Shoulders",
			targetedBodyPart: "Upper body, Spine, Hips, Neck",
			time: 8,
			equipment: "Chair",
			insta_link: "https://www.instagram.com/tv/CIvv3JJg-uG/?igshid=1072tal6tjb7n"
		},
		{
			workoutName: "13 Minutes of Fresh",
			targetedBodyPart: "Full Body, Spine, Wrist, Ankles",
			time: 13,
			equipment: "Chair",
			insta_link: "https://www.instagram.com/tv/CHYEHE7AFY-/?igshid=6s263pq67pko"
		},
		{
			workoutName: "Neck & Spine Circuit",
			targetedBodyPart: "Spine, Neck, Back",
			time: 8,
			equipment: "Chair",
			insta_link: "https://www.instagram.com/tv/CGfSbnYgQSF/?igshid=1biuxdf488zbj"
		},
		{
			workoutName: "Nervous System Spinal Sequence",
			targetedBodyPart: "Spine, Shoulders",
			time: 5,
			equipment: "Mat",
			insta_link: "ttps://www.instagram.com/p/CEzF56kgsHb/?igshid=12nb5sn4kit4c"
		},
		{
			workoutName: "Morning Mobility: Tissue Floss Flow",
			targetedBodyPart: "Full Body, Hips, Upper Body",
			time: 18,
			equipment: "Mat",
			insta_link: "https://www.instagram.com/tv/CEhosExAvqC/?igshid=14iudsav311mv"
		},
		{
			workoutName: "Standing Runners Warm-up",
			targetedBodyPart: "Full Body, Spine, Legs, Hips",
			time: 10,
			equipment: "N/A",
			insta_link: "https://www.instagram.com/p/CDmJTmaA36B/?igshid=a7y44dewqdsz"
		},
		{
			workoutName: "Digestion & Energy Circuit",
			targetedBodyPart: "Full Body",
			time: 10,
			equipment: "N/A",
			insta_link: "https://www.instagram.com/tv/CDjzyZ5ALYM/?igshid=1l5osea2611fl"
		},
		{
			workoutName: "Morning Mobility",
			targetedBodyPart: "Full Body, Upper Body",
			time: 15,
			equipment: "Mat",
			insta_link: "https://www.instagram.com/tv/CCLvx2GAWAt/?igshid=m6gf662v1ify"
		},
		{
			workoutName: "Mobility Routine",
			targetedBodyPart: "Lower Body, Spine, Hips",
			time: 8,
			equipment: "Mat",
			insta_link: "https://www.instagram.com/p/CADZAiVg3l7/?igshid=754jpfqyy9hr"
		},
		{
			workoutName: "Kirsty Godso x OchoSystem Stability Series",
			targetedBodyPart: "Hips, Core, Upper Body",
			time: 10,
			equipment: "Mat",
			insta_link: "https://www.instagram.com/p/B_fsfYagdDB/?igshid=y2jagsx84dd7"
		},
		{
			workoutName: "Naomi Campbell x OchoSystem Stability Workout",
			targetedBodyPart: "Lower Body, Core",
			time: 5,
			equipment: "N/A",
			insta_link: "https://www.instagram.com/p/B-iNIfEAVyP/?igshid=1q3mxj612d3vs"
		},

		{
			workoutName: "Mobility & Wind-down Drills",
			targetedBodyPart: "Spine, Hips, Legs",
			time: 8,
			equipment: "Chair, Mat",
			insta_link: "https://www.instagram.com/p/B-Iw2TCAouc/?igshid=151p3scnvdaoo"
		},
		{
			workoutName: "Naomi Campbell x OchoSystem Activation/Joints",
			targetedBodyPart: "Legs, Hips, Lower Body",
			time: 5,
			equipment: "Mat",
			insta_link: "https://www.instagram.com/p/B9-QjdQgjZE/?igshid=134n0ua1tian1"	
		}

	];

var LOWER_BODY = ["Lower Body", "Hips", "Ankles", "Legs"];
var UPPER_BODY = ["Upper Body", "Spine", "Arms", "Back", "Neck", "Wrists"];

function generate_HTML_card(workout_entry){
	var wrapper_div=document.createElement('div');
		wrapper_div.className="col-lg-4 col-md-7 col-sm-8 workoutcard";

	// console.log(workout_entry);
	var big_div = document.createElement('div');
		big_div.className= "single-services text-center mt-30 wow fadeIn";
	var smaller_div = document.createElement('div');
		smaller_div.className = "services-content mt-30";
	// big_div.appendChild(smaller_div);
	
	var heading = document.createElement("h4");
		heading.className="services-title";
		heading.innerHTML = workout_entry.workoutName;
		smaller_div.appendChild(heading);

	var body_part = document.createElement("p");
		body_part.className="text";
		body_part.innerHTML="Body part: "+workout_entry.targetedBodyPart;
		smaller_div.appendChild(body_part);

	var duration = document.createElement("p");
		duration.innerHTML = "<strong>Time: </strong>" + workout_entry.time;
		smaller_div.appendChild(duration);

	var equipment = document.createElement("p");
		equipment.innerHTML = "<strong>Equipment: </strong>" + workout_entry.equipment;
		smaller_div.appendChild(equipment);

	var link = document.createElement("a");
		link.className="more";
		link.target="_blank";
		link.href=workout_entry.insta_link;
		link.innerHTML="Instagram link <i class='lni-chevron-right'></i>"
		smaller_div.appendChild(link);

	big_div.appendChild(smaller_div);
	wrapper_div.appendChild(big_div);
	return wrapper_div;

}

var card_container = document.getElementById("cardcontainer");
workout_database.forEach(function(workout_entry){

	card_container.appendChild(generate_HTML_card(workout_entry));

	// console.log(big_div);
});
// <div class="col-lg-4 col-md-7 col-sm-8 under10min" >
//     <div class="single-services text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
//         <div class="services-icon">
//             <img class="shape" src="assets/images/services-shape.svg" alt="shape">
//             <img class="shape-1" src="assets/images/services-shape-1.svg" alt="shape">
//             <i class="lni-baloon"></i>
//         </div>
//         <div class="services-content mt-30">
//             <h4 class="services-title"><a href="#">Sunday School Mobility</a></h4>
//             <p class="text"><strong>Body part: </strong> Full body | hips | spine | legs | core</p>
//             <p><strong>Time: </strong> 8 min.</p>
//             <p><strong>Equipment: </strong> Mat if needed</p>
//             <a class="more" target="_blank"href="https://www.instagram.com/p/CJCNTW5gfuu/?igshid=1ata3bxhjzk22">Instagram link <i class="lni-chevron-right"></i></a>
//         </div>
//     </div> 
// </div>



function toggleVisibility(passed_in_item){
		if (passed_in_item.style.display === "none") {
			passed_in_item.style.display = "block";
		} else {
			passed_in_item.style.display = "none";
		}
}
var value_array = [];
var article_list = document.querySelectorAll('.workoutcard');
console.log(article_list);

function valueUpdate(totalItems){
	var value_entity = totalItems.value.toLowerCase();
	if(value_entity.includes(" ")){
		value_entity=value_entity.replace(" ","");
	}
	console.log('.'+value_entity);
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

// 1. Check items (store in array)
// 2. Click button (access array and iterate through elements)
// 3. Filter selection (apply)