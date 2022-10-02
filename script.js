let choose_img_btn = document.querySelector(".choose_img button");
let choose_input = document.querySelector(".choose_img input");
let imgSrc = document.querySelector(".view_img img");
choose_img_btn.addEventListener("click", () => choose_input.click());
let filter_buttons = document.querySelectorAll(".icon_room1 button img");
let filter_name = document.querySelector(".filter_info .name");
let slider = document.querySelector(".slider input");
let slider_value = document.querySelector(".filter_info .value");
let bright = 100, Contrast = 100, saturate = 100, blur = 0, invert = 0;
let rotate_btns = document.querySelectorAll(".icon_room2 button");


let rotate = 0, flipH = 1, flipV = 1;
choose_input.addEventListener("change", () => {
   let file = choose_input.files[0];
   if (!file) return;
   console.log("image loaded successfully");
   reset.click();
   console.log("reseted previous values")
   imgSrc.src = URL.createObjectURL(file);
   imgSrc.addEventListener("load", () => {
      document.querySelector(".container").classList.remove("disabled");
   });
});
filter_buttons.forEach((element) => {
   element.addEventListener('click', () => {
      document.querySelector(".active").classList.remove("active");
      filter_name.innerText = element.id;
      element.classList.add("active");
      if (element.id === "Brightness") {
         slider.max = "200";
         slider.value = bright;
         slider_value.innerText = `${bright}%`;
      } else if (element.id === "Contrast") {
         slider.max = "200";
         slider.value = Contrast;
         slider_value.innerText = `${Contrast}%`;
      } else if (element.id === "Saturation") {
         slider.max = "200";
         slider.value = saturate;
         slider_value.innerText = `${saturate}%`;
      } else if (element.id === "Invert") {
         slider.max = "100";
         slider.value = invert;
         slider_value.innerText = `${invert}%`;
      } else if (element.id === "Blur") {
         slider.max = "100";
         slider.value = blur;
         slider_value.innerText = `${blur}%`;
      }
   })
})

slider.addEventListener('input', () => {
   slider_value.innerText = `${slider.value}%`;
   let sliderState = document.querySelector(".icon_room1 .active");
   if (sliderState.id === "Brightness") {
      bright = slider.value;
   } else if (sliderState.id === "Contrast") {
      Contrast = slider.value;
   } else if (sliderState.id === "Saturation") {
      saturate = slider.value;
   } else if (sliderState.id === "Saturation") {
      saturate = slider.value;
   } else if (sliderState.id === "Invert") {
      invert = slider.value;
   }
   else if (sliderState.id === "Blur") {
      blur = slider.value;
   }
   imgSrc.style.filter = `brightness(${bright}%) contrast(${Contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur / 15}px)`;
})

rotate_btns.forEach((element)=>{
    element.addEventListener("click",()=>{
      if(element.id === "rotate_left"){
         console.log("left r");
         rotate-=90;
      }else if(element.id === "rotate_right"){
         rotate+=90;
      }else if(element.id === "h_flip"){
         flipH = -1*flipH;
      }
      else if(element.id === "v_flip"){
         flipV = -1*flipV;
      }
      imgSrc.style.transform = `rotate(${rotate}deg) scale(${flipH}, ${flipV})`
    })
})

let reset = document.querySelector(".btn_contain .reset");
let save = document.querySelector(".btn_contain .save");

reset.addEventListener("click", () => {
   bright = 100; Contrast = 100; saturate = 100; blur = 0; invert = 0;
   rotate = 0; flipH = 1; flipV = 1;
   imgSrc.style.filter = `brightness(${bright}%) contrast(${Contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur/15}px)`;
   imgSrc.style.transform = `rotate(${rotate}deg) scale(${flipH}, ${flipV})`

   filter_buttons.forEach(() => {
         let active_btn = document.querySelector(".active")
         if (active_btn.id === "Brightness") {
            slider.max = "200";
            slider.value = bright;
            slider_value.innerText = `${bright}%`;
         } else if (active_btn.id === "Contrast") {
            slider.max = "200";
            slider.value = Contrast;
            slider_value.innerText = `${Contrast}%`;
         } else if (active_btn.id === "Saturation") {
            slider.max = "200";
            slider.value = saturate;
            slider_value.innerText = `${saturate}%`;
         } else if (active_btn.id === "Invert") {
            slider.max = "100";
            slider.value = invert;
            slider_value.innerText = `${invert}%`;
         } else if (active_btn.id === "Blur") {
            slider.max = "100";
            slider.value = blur;
            slider_value.innerText = `${blur}%`;
         }
   })
})

save.addEventListener("click",()=>{
   let canvas = document.createElement("canvas");
   let ctx = canvas.getContext("2d");
   canvas.width = imgSrc.naturalWidth;
   canvas.height = imgSrc.naturalHeight;
   ctx.filter = `brightness(${bright}%) contrast(${Contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur / 15}px)`;
   ctx.translate(canvas.width/2,canvas.height/2);
   ctx.scale(flipH,flipV);
   ctx.drawImage(
      imgSrc,
      -canvas.width/2,
      -canvas.height/2,
      canvas.width,
      canvas.height
);
   const link = document.createElement("a");  //creating anchor tag
   link.download = "image.jpg";
   link.href = canvas.toDataURL();
   link.click();
})
