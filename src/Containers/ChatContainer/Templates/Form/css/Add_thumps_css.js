/*

      thump up and down

*/
body{
/*   background: #f5f5f5; */
}
.rating-area{
  width:100px;
  padding:10px 10px 10px 10px;
/*   background:#e8e8e8; */
  border-radius:5px;
  display:flex;
  flex-direction:row;
  margin-left: auto;

}
.align-center{
   display:flex;
  justify-content:center;
  align-items:center;
}
.transition-fast{
  transition:0.2s ease-out;
}
.thumbs-up-circle{
  width:50px;
  height:50px;
  background:#f0f0f0;
  border-radius:50%;
  box-shadow:1px 1px 0px rgba(0,0,0,0.2);
  cursor:pointer;
  margin-bottom:5px;
  margin-top:5px;
}
.thumbs-up{
  color:#2196f3;
  font-size:24px;
  transform:rotate(0) translate(0);
}
.thumbs-up-circle:hover{
   box-shadow:1px 1px 2px rgba(0,0,0,0.5);
}
.thumbs-up-circle:hover .thumbs-up{
  color:#1976D2;
  transform:rotate(-5deg) translate(0px, -1px);
}
.thumbs-up-circle:active{
  background:#e0e0e0;
  box-shadow:1px 1px 0px rgba(0,0,0,0.2);
}
.thumbs-up-circle:active .thumbs-up{
  color:#065bae;
  transition:0.1s;
  transform:rotate(-10deg) translate(0px, -2px);
}
.thumbs-down{
  color:#9E9E9E;
  font-size:24px;
  transform:rotate(0) translate(0);
}
.thumbs-up-circle:hover .thumbs-down{
  color:#565656;
  transform:rotate(5deg) translate(0px, 1px);
}
.thumbs-up-circle:active .thumbs-down{
  color:#424242;
  transition:0.1s;
  transform:rotate(10deg) translate(0px, 2px);
}
