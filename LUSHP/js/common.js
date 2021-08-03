
        
        //언어
        
        $(document).ready(function(){
            $(".menu>a").click(function(){
                var submenu = $(this).next("ul");
     
                
                if( submenu.is(":visible") ){
                    submenu.slideUp('fast');
                }else{
                    submenu.slideDown('fast');
                }
            })
     
     
            
        });



        //스크롤

        $(document).ready(function(){
            $(window).on('scroll',function(){

                var scroll = $(window).scrollTop();

                if(scroll>0){
                    $('#Headerwrap').addClass('on')
                }
                else{
                    $('#Headerwrap').removeClass('on')
                }

            })
        })

        $(document).ready(function(){
            $(window).on('scroll',function(){

                var scroll = $(window).scrollTop();

                if(scroll>500){
                    $('#TAB').addClass('on')
                }
                else{
                    $('#TAB').removeClass('on')
                }
                if(scroll<4500){
                    $('#TAB').addClass('on')
                }
                else{
                    $('#TAB').removeClass('on')
                }
                if(scroll<500){
                    $('#TAB').removeClass('on')
                }
               


            })
        })


        $(document).ready(function(){
            $("button").click(function(){
                $(this).next().toggleClass("git");
            })
        })

    
       

        $(document).ready(function(){
            $(".mo_seah").click(function(){
                $('.seah_wrap').css({'display':'block'})
            })
            $(".pop_close").click(function(){
                $(".seah_wrap").css({'display':'none'});
            })
        })

      $(document).ready(function(){
          $(".mo_hamb").on('click',function(){
              $(this).next('.side-bar').toggleClass('on');
          })
        });