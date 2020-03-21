import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import img from "./Containers/ChatContainer/images/Neo.png"
import App from './App';
import './main.css';
import $ from 'jquery'
import jQuery from 'jquery'

ReactDOM.render(
  <App user="sejal" />
  , document.getElementById('index'));

function startConversation() {
  localStorage.setItem("conversation", "true")
  var conversationStatus = localStorage.getItem("conversation")
  if (conversationStatus == "true") {
    window.imBack({ "text": "hi", payload: { hide: true } })
  }
  // else {
  //   localStorage.setItem("conversation", "true")
  //   window.imBack({ "text": "Hey there", payload: { hide: true } })
  // }
}

function toggleTooltip(value) {
  var tooltipevent = new CustomEvent("show-tooltip", { detail: value });
  document.dispatchEvent(tooltipevent);
}

(function () {
  var clickedId = []
  window.imBack = function imBack(msg, id = new Date().getTime()) {
    if (clickedId.indexOf(id) == -1) {
      clickedId.push(id)
      var event = new CustomEvent("send-message", { detail: msg });
      document.dispatchEvent(event);
    }
  }


  $(document).ready(function () {
    //localStorage.clear()
    startConversation();
    toggleTooltip(true);
    if (window.matchMedia('(max-width: 767px)').matches) {
      $("#bot_initiator").click(function () {
        // startConversation();
        // toggleTooltip(true);
        $("#bot_initiator").hide("slow");
        $("#chatbot_container").fadeToggle("slow");
      });
      $("#profile_cancel").click(function () {
        // toggleTooltip(false)
        $("#bot_initiator").show("slow");
        $("#chatbot_container").fadeToggle("slow");
      });
    } else {
      $("#bot_initiator").click(function () {
        // startConversation()
        // let toggleStatus =$("#chatbot_container").css("display");
        // if(toggleStatus=="none"){
        //   toggleTooltip(false)
        // }else{
        //   toggleTooltip(true)
        // }
        $("#chatbot_container").fadeToggle("slow");
        $("#bot_initiator img").fadeToggle("slow");
        // toggleTooltip(true)
      });
    }

    $("#get_started").click(function () {
      $("#overlay_section").slideUp("slow");
    });

    $(".chatbot_container .content_box .component_box .bot_chat .carousel ul li .carousel_content .carousel_detail .content").each(function () {
      var text = $(this).text();
      if (text.length > 50) {
        $(this).text(text.substr(0, text.lastIndexOf(' ', 50)) + '...');
      }
    });
    // let url = window.location.href
    // url = new URL(url)
    // if (url.searchParams.get('q')) {
    //   $('#bot_initiator').trigger('click')
    //   $('#get_started').trigger('click')
    // }
  });
})()
// export const tf = () => {
//   ReactDOM.render(
//     <App />
//     , document.getElementById('index'));
// }

window.tf = (user) => {
  ReactDOM.render(
    <App user={user} />
    , document.getElementById('index'));

  (function () {
    $(document).ready(function () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        $("#bot_initiator").click(function () {
          $("#bot_initiator").hide("slow");
          $("#chatbot_container").fadeToggle("slow");
        });
        $("#profile_cancel").click(function () {
          $("#bot_initiator").show("slow");
          $("#chatbot_container").fadeToggle("slow");
        });
      } else {
        $("#bot_initiator").click(function () {
          $("#chatbot_container").fadeToggle("slow");
          $("#bot_initiator img").fadeToggle("slow");
        });
      }

      $("#get_started").click(function () {
        $("#overlay_section").slideUp("slow");
      });

      $(".chatbot_container .content_box .component_box .bot_chat .carousel ul li .carousel_content .carousel_detail .content").each(function () {
        var text = $(this).text();
        if (text.length > 50) {
          $(this).text(text.substr(0, text.lastIndexOf(' ', 50)) + '...');
        }
      });
      // let url = window.location.href
      // url = new URL(url)
      // if (url.searchParams.get('q')) {
      //   $('#bot_initiator').trigger('click')
      //   $('#get_started').trigger('click')
      // }
    });
  })()
}
