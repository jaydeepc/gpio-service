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
          $appliances = $(".appliances")

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

          $(document).on("click", ".card-left-appl", function(e) {
            var ele = $(this).attr("name");
            var on_off = $(this).attr("status");
            if (ele == "light_1"){
                if(on_off == "off"){
                    $bulb_img.attr("src", "images/bulb_on.png");
                    $(this).css("background", "rgba(247, 222, 8, 0.18)")
                    $.ajax({
                        type: "GET",
                        dataType: 'text',
                        url: "http://192.168.0.101:3001/on/18"
                    });
                    $(this).attr("status", "on");
                }
                else{
                    $bulb_img.attr("src", "images/bulb.png")
                    $(this).css("background", "rgba(253, 252, 253, 0.15)")
                    $.ajax({
                        type: "GET",
                        dataType: 'text',
                        url: "http://192.168.0.101:3001/off/18"
                    });
                    $(this).attr("status", "off");
                }
            }
            else if (ele == "fan_1"){
                if(on_off == "off"){
                    $(this).find("img").attr("class", "image-rotate");
                    $(this).attr("status", "on");
                }
                else{
                    $(this).find("img").attr("class", "image");
                    $(this).attr("status", "off");
                }

            }
          });
    });
