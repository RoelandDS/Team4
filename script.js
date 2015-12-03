$(document).ready(function () {
		$.ajax({
			type: "GET",
			url: "http://10.0.1.3/api/389095253ee19e27389f94f12ce78153/lights",
			success: function(result) {
				for (var light in result) {
					console.log(result[light]);
					$('#light').append('<option value="' + light + '">' + result[light]["name"] + '</option>');
				}
				
			}
		});
	});



	function lightOn() {

		var obj = {"on":true, "sat":255, "bri":255,"hue": parseInt($('#color').val())};
		console.log(JSON.stringify(obj));
		$.ajax({
			type: "PUT",
			url: "http://10.0.1.3/api/389095253ee19e27389f94f12ce78153/lights/" + $('#light').val() + "/state",
			contentType: "application/json",
			data: JSON.stringify(obj)
		});
	}

	$('#uit').click(function () {
		var obj = {"on":false};
		$.ajax({
			type: "PUT",
			url: "http://10.0.1.3/api/389095253ee19e27389f94f12ce78153/lights/" + $('#light').val() + "/state",
			contentType: "application/json",
			data: JSON.stringify(obj)
		});
	});