const gb={wW:window.innerWidth,wH:window.innerHeight,html:$("html"),body:$("body"),main:$("main"),sideMenu:document.querySelectorAll(".side-mid li"),btnActiveModal:$(".btn-active-modal"),isMob:window.innerWidth<=768,isMobTab:!1};window.addEventListener("load",()=>{gb.CommonFunction.init()}),gb.CommonFunction=function(){const t=()=>{gb.btnActiveModal.removeClass("selected"),$(".list-item").removeClass("on"),$(".modal").removeClass("zoomIn"),$(".dimmed").remove(),gb.body.css({height:"auto","overflow-y":"visible"})};return{init:()=>{{const o=location.pathname;gb.sideMenu.forEach(function(e){var t=$(e).find("> a").attr("href").split("/");-1!==o.indexOf(t[t.length-2])&&$(e).addClass("on")})}gb.btnActiveModal.on("click",function(e){e.preventDefault(),e.stopPropagation();const t=$(this);e=t.data("modal-name");$(".modal").removeClass("zoomIn"),$(".dimmed").remove(),t.addClass("selected"),t.closest(".list-item").addClass("on"),$(".modal#modal-"+e).addClass("zoomIn"),gb.body.append('<div class="dimmed btn-close-modal"></div>'),gb.body.css({height:"100vh","overflow-y":"hidden"})}),$(document).on("click",".btn-close-modal",()=>{t()}),gb.tipOver=$(".toolTipBox").filter("._hover"),gb.tipOver.each(function(){const s=$(this);s.on({"mouseenter focusin":function(){var e=s.offset().top,t=document.documentElement.scrollTop,o=e-t,t=t+document.documentElement.clientHeight-e;t<=o?s.find(".toolTip").removeClass("up").addClass("down"):s.find(".toolTip").removeClass("down").addClass("up"),console.log(o,t),s.closest(".list-item").addClass("active"),s.find(".toolTip").stop().fadeIn(300)},"mouseleave focusout":function(){var e=s.offset().top,t=document.documentElement.scrollTop;t+document.documentElement.clientHeight-e<=e-t?s.find(".toolTip").removeClass("up").addClass("down"):s.find(".toolTip").removeClass("down").addClass("up"),s.closest(".list-item").removeClass("active"),s.find(".toolTip").stop().fadeOut(100)}})}),gb.edit=document.querySelectorAll(".edit"),gb.edit.forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation();const t=$(this);var e=t.offset().top,o=document.documentElement.scrollTop;o+document.documentElement.clientHeight-e<=e-o?t.next(".toolTip").removeClass("up").addClass("down"):t.next(".toolTip").removeClass("down").addClass("up"),t.closest(".toolTipBox").hasClass("active")?(t.closest(".toolTipBox").removeClass("active"),t.closest(".list-item").removeClass("selected"),t.next(".toolTip").stop().fadeOut(300)):($(".toolTipBox").removeClass("active"),$(".list-item").removeClass("selected"),t.closest(".toolTipBox").addClass("active"),t.closest(".list-item").addClass("selected"),$(".toolTipBox").find(".toolTip").stop().fadeOut(300),t.next(".toolTip").stop().fadeIn(300))})}),$(".select-wrap:not(.default) select").niceSelect();{const e=document.querySelectorAll(".input");e.forEach(e=>{e.addEventListener("click",function(){this.firstElementChild.style.opacity=1})})}$.datepicker.setDefaults({closeText:"닫기",currentText:"오늘",prevText:"이전 달",nextText:"다음 달",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],monthNamesShort:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],dayNamesShort:["일","월","화","수","목","금","토"],dayNamesMin:["일","월","화","수","목","금","토"],weekHeader:"주",yearSuffix:"년"}),$(".calendar > input[type=text]").datepicker({showOn:"both",dateFormat:"yy-mm-dd",minDate:"d"}),$(".time > input[type=text]").timepicker({timeFormat:"hh:mm p",interval:10,minTime:"00:00",maxTime:"23:50",defaultTime:"00:00",startTime:"00:00",dynamic:!1,dropdown:!0,scrollbar:!0}),gb.btnDropDown=$(".btn-dropDown"),gb.btnDropDown.on("click",function(e){e.preventDefault(),e.stopPropagation();const t=$(this);t.hasClass("on")?(t.removeClass("on"),$(".dropDown").stop().slideUp(300)):(gb.btnDropDown.not(t).removeClass("on"),$(".dropDown").stop().slideUp(300),t.addClass("on"),t.closest("li").find(".dropDown").stop().slideDown(300))})},modalOff:t,fileUpload:(e,t)=>{var o=e.value.lastIndexOf(".");const s=e.value.substring(o+1,e.length);o=s.toLowerCase();const n=new FileReader;var i=$(e)[0].files[0].name;$(e)[0].files[0].size;if(n.readAsDataURL($(e)[0].files[0]),"image"==t&&"jpg"!=o&&"gif"!=o&&"png"!=o&&"jpeg"!=o&&"bmp"!=o)return alert("이미지 파일만 선택 할 수 있습니다."),parentObj=e.parentNode,node=parentObj.replaceChild(e.cloneNode(!0),e),!1;$(e).closest(".file-attach").find(".text-wrap input[type=text]").val(i)},activate:e=>{$(e).closest(".list-item").removeClass("disabled")}}}();