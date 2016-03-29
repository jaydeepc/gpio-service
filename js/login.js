    $(document).ready(function() {

          var animating = false,
          submitPhase1 = 1100,
          submitPhase2 = 400,
          logoutPhase1 = 800,
          $login = $(".login"),
          $app = $(".app");
          $cards = $(".cards")
          $master_bed = $(".master_bed")
          $kitchen = $(".kitchen")
          $bulb_img = $("#bulb-img")
          $fan_img = $("#fan-img")

          function ripple(elem, e) {
            $(".ripple").remove();
            var elTop = elem.offset().top,
                elLeft = elem.offset().left,
                x = e.pageX - elLeft,
                y = e.pageY - elTop;
            var $ripple = $("<div class='ripple'></div>");
            $ripple.css({top: y, left: x});
            elem.append($ripple);
          };

          $(document).on("click", ".login__submit", function(e) {
            secret_key = $(".login__input").val();
            if (animating) return;
            animating = true;
            var that = this;
            ripple($(that), e);
            $(that).addClass("processing");
            setTimeout(function() {
              $(that).addClass("success");
              setTimeout(function() {
                $app.show();
                $app.css("top");
                $app.addClass("active");
              }, submitPhase2 - 70);
              setTimeout(function() {
                $login.hide();
                $login.addClass("inactive");
                animating = false;
                $(that).removeClass("success processing");
              }, submitPhase2);
            }, submitPhase1);
          });

          $(document).on("click", ".card-left", function(e) {
            var ele = $(this).attr('name')
            var $element = $('.' + ele);
            if (animating) return;
            animating = true;
            var that = this;
            ripple($(that), e);
            $(that).addClass("processing");
            setTimeout(function() {
              $(that).addClass("success");
              setTimeout(function() {
                $app.show();
                $app.css("top");
                $app.addClass("active");
                $element.show();
              }, submitPhase2 - 70);
              setTimeout(function() {
                $cards.hide();
//                $app.hide();
//                $app.addClass("inactive");
//                animating = false;
                $(that).removeClass("success processing");
              }, submitPhase2);
            }, submitPhase1);
          });

          $(document).on("click", ".app__logout", function(e) {
            if (animating) return;
            $(".ripple").remove();
            animating = true;
            var that = this;
            $(that).addClass("clicked");
            setTimeout(function() {
              $app.removeClass("active");
              $login.show();
              $login.css("top");
              $login.removeClass("inactive");
            }, logoutPhase1 - 120);
            setTimeout(function() {
              $app.hide();
              animating = false;
              $(that).removeClass("clicked");
            }, logoutPhase1);
          });

          $(document).on("change", ".switch-input", function(e) {
            var ele = $(this).closest("div").attr("class");
            if (ele == "lights"){
                if($(this).is(":checked")){
                    $bulb_img.attr("src", "images/bulb_on.png");
                    $(".app__top").css("background", "rgba(247, 222, 8, 0.18)")
                    $.ajax({
                        type: "GET",
                        dataType: 'text',
                        url: "http://localhost:3001/on/18"
                    });

                }
                else{
                    $bulb_img.attr("src", "images/bulb.png")
                    $(".app__top").css("background", "rgba(0, 0, 0, 0.5)")
                    $.ajax({
                        type: "GET",
                        dataType: 'text',
                        url: "http://localhost:3001/off/18"
                    });

                }
            }
            else if (ele == "fans"){
                if($(this).is(":checked")){
                    $(this).closest("label").prev().attr("class", "image-rotate");
                }
                else{
                    $(this).closest("label").prev().attr("class", "image");
                }

            }
          });
    });
