$(function()
{	
	var base64string;
		console.log("image success");
	
	document.getElementById("image_input").onchange = function (e)
	{
		if($(this).val().length > 0)
		{
		  var read = new FileReader();
		  var img_load = document.getElementById("current_image");
		  var file = read.readAsDataURL(e.target.files[0]);
		  var canvas = document.getElementById("canvas");
		  var img_can = new Image();
	
		  read.onload = function(event)
		  {
			if(img_load !== null)
			{
				img_load.src = event.target.result;
				//window.base64string = img_load.src;
				//console.log(base64string);
			}
			img_can.src = event.target.result;
		  //if full image size directly from event target
			var can2 = canvas.getContext("2d");
			canvas.height = img_can.height;
			canvas.width = img_can.width;
			can2.drawImage(img_can, 0, 0, img_can.width, img_can.height);
		  };
		}
	
		else
		{
	
		}
	};
	
	
	console.log(data_samples);
	
	 $(document).on("click", "#submit", function()
        {
			
			base64string =document.getElementById("canvas").toDataURL('image/jpeg');
			
			base64string = base64string.replace("data:image/jpeg;base64,", "");
			base64string = base64string.replace(/\r?\n|\r/g, "");
			console.log(base64string);

			var data_samples = JSON.stringify({
			"requests": 
			[{
				"image": 
				{
					//"source":
					//{
					//  "gcsImageUri":"gs://hackathon-147218.appspot.com/Cbaby.jpeg"
					//}
					"content": base64string

				},
				"features": 
				[{
					"type": "FACE_DETECTION",
					"maxResults": 5
				}]
			}]
		  });
			
			
			$.ajax(
			{
				url: uri,
				type: "POST",
				data: data_samples,
				dataType: 'json',
				//beforeSend: function(xhr) {xhr.setRequestHeader("Authorization", "Bearer " + key);},
				//beforeSend: function(xhr) {xhr.setRequestHeader("Authorization", "Key " + key);},
				contentType: 'application/json',
				success: function(data, text, xhr)
				{
					console.log("data");
					console.log(data);
					console.log("text");
					console.log(text);
					console.log("XHR");
					console.log(xhr);
					var result = "Anger likelihood " + data.responses[0].faceAnnotations[0].angerLikelihood
					+ " Surprise Likelihood " + data.responses[0].faceAnnotations[0].surpriseLikelihood
					+ " Joy Likelihood " + data.responses[0].faceAnnotations[0].joyLikelihood;
					console.log(result);
					$("#text").val(result);

										//console.log(data.responses[0]);

				},
				
				error: function(xhr, status, error)
				 {
				  console.log("Error has occured");
				  console.log(error);
				  console.log("status", status);
				  alert("Error has occured: " + error);
				 },
				
				
			});
		});
	
	//executeMe();


});