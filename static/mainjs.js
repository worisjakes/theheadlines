$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.slider').slider();
    $(".parallax").parallax();
    $('select').material_select();
	$(".button-collapse").sideNav();
	$(".modal").modal();
	$('.carousel.carousel-slider').carousel({fullWidth: true})
    var $animation_elements = $(".animation_elements");
    var $window = $(window);
    $window.on("scroll resize", check_if_in_view);
    $window.trigger("scroll");
    function check_if_in_view(){
 		var window_top_position = $window.scrollTop();
 		var window_height = $window.height();
 		var window_bottom_position = (window_top_position+ window_height);
 		$.each($animation_elements, function(){
 			var $element =$(this);
 			var element_height = $element.outerHeight();
 			var element_top_position = $element.offset().top;
 			var element_bottom_position = (element_top_position+element_height);
 			if ((element_bottom_position>=window_top_position)&&(element_top_position<=window_bottom_position)){
 				$element.addClass("myAnimate");
         $element.addClass("up");

 			} else{
 				$element.removeClass("myAnimate");
         $element.removeClass("up");
 			}

 		}); 
        }
		$('#mybtn').click(function(e){
			e.preventDefault();
			var ischecked = $("input[name ='sex']").is(":checked");
			var name = document.getElementById("name").value.trim();
			var tel = document.getElementById("tel").value.trim();
			var email = document.getElementById('email').value.trim();
			var gender = $("input[name ='sex']").val();
			var papername = document.getElementById("choice").value;
			var address = document.getElementById("textarea1").value.trim();
			var location = new Array();
			var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
			$.each($("input[name='loc[]']:checked"), function(){
				location.push($(this).val())
			});
			if(name == "" || tel == "" || email == ""|| address == "" || location.length<0 || !ischecked){
				document.getElementById("input").innerHTML = "Fields cannot be empty"
			}
				else{
					if(tel.length != 11 || !re.test(email)){
						document.getElementById("input").innerHTML = "Phone must be 11 characters, email must match example@mail.com"
					}else{
					var submitedval = {name:name, tel:tel, email:email, gender:gender, papername:papername,address:address, location:location}
					$.ajax({
						url:"/orderNow",
						type: "POST",
						data:submitedval,
						success:function(data){
							if (data.status != 200){
								document.getElementById("input").innerHTML = data.success
							}else{
								$(".modal-trigger").css("visibility","visible");
								$("#modal1").modal("open");
								window.location.assign("/home");
							}
						}
					});
					}
				}
		})
	});
  