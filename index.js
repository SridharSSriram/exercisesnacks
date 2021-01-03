function toggleVisibility(passed_in_item){
		if (passed_in_item.style.display === "none") {
			passed_in_item.style.display = "block";
		} else {
			passed_in_item.style.display = "none";
		}
}
var value_array = [];
var article_list = document.querySelectorAll('article');
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