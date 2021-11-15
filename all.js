// 日夜轉換
const circle = document.querySelector('.circle');
// console.log(circle);
const body = document.querySelector('body');
// console.log(body);
const footer = document.querySelector('.footer');
// console.log(footer);
const copyright = document.querySelector('.copyright');
const toggleColor = document.querySelectorAll('.toggleColor')
const toggleTextNameColor = document.querySelectorAll('.toggleTextNameC');
// console.log(toggleTextNameColor);
const flexslider = document.querySelector('.flexslider');

circle.addEventListener('click',function(e){
    body.classList.toggle('toggleDark');
    flexslider.classList.toggle('toggleDark');
    circle.classList.toggle('togglemove');
    footer.classList.toggle('toggleCangeColor');
    copyright.classList.toggle('toggleCangeColor');
    for(let i=0; i<toggleColor.length; i++){
        toggleColor[i].classList.toggle('toggleOtherColor');
    }
    for(let i=0; i<toggleTextNameColor.length; i++){
        toggleTextNameColor[i].classList.toggle('toggleTextNameColor');
    }
})


//語系轉換
const langChange = document.querySelector('.langChange');
const langChangeInput = document.querySelector('#langChange');
// console.log(langChangeInput.textContent);
langChange.addEventListener('click',function(){
    if(langChangeInput.textContent == '中文'){
        langChangeInput.textContent = '英文'
    }else{
        langChangeInput.textContent = '中文'
    }
})

// 主要區域圖片DOM
const mainShow = document.querySelector('.mainShow');
// 熱門景點DOM
const topViewSelect = document.querySelector('.topViewSelect');
// 城市名稱Arr
const livelyCity = ['Taipei', 'NewTaipei', 'Taoyuan', 'Taichung', 'Tainan', 'Kaohsiung'];

function cityArr(e){
    for(let i=0; i<=5;i++){
        axios({
            method: 'get',
            url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${livelyCity[i]}?$select=Picture&$top=300&$format=JSON`,
            headers: GetAuthorizationHeader()
        })
        // console.log(response);
        .then(function(response){
             //取出response裡data資料作成新陣列
             let newCity1 = [];
            let thisData1 = response.data
            thisData1.forEach(item => {
                // console.log(item);
                if(item.Picture.PictureUrl1 !== undefined){
                    newCity1.push(item)
                }
            });
            newCity(newCity1);
        })
        .catch((error) => console.log(error))
    }
}


//熱門景點
function cityView(e){
    for(let i=0; i<=3;i++){
        axios({
            method: 'get',
            url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${livelyCity[i]}?$select=Picture&$top=300&$format=JSON`,
            headers: GetAuthorizationHeader()
        })
        // console.log(response);
        .then(function(response){
             let newCity2 = [];
            let thisData2 = response.data
            thisData2.forEach(item => {
                // console.log(item);
                if(item.Picture.PictureUrl1 !== undefined && item.Picture.PictureDescription1 !== undefined){
                    newCity2.push(item)
                }
            });
            // console.log(newCity2);
            cityViewCom(newCity2);
        })
        .catch((error) => console.log(error))
    }
}


//隨機組出地點(城市)
function newCity(newCity1){
    // console.log(newCity1);
    let x = newCity1.length
let newX = Math.floor(Math.random()*x);
let newCityRound1 = newCity1[newX]
// console.log(newCityRound1);
livelyCityPrint(newCityRound1);
}
//隨機組出地點(景點)
function cityViewCom(newCity2){
    let x = newCity2.length
        // console.log(newCity2.length);
let newX = Math.floor(Math.random()*x);
let newCityRound2 = newCity2[newX]
// console.log(newCity2[newX]);
cityViewPrint(newCityRound2);
}


//熱鬧城市渲染
let newCityString = "" ;
let newCityI = 0
function livelyCityPrint(newCityRound1){
        newCityString += `<div class="citySelect"><img src="${newCityRound1['Picture']['PictureUrl1']}" alt="${livelyCity[newCityI]}"><h2>${livelyCity[newCityI]}</h2>
        <a class="darkHidden" href="##"></a>
        </div>`;
        newCityI ++;
        // console.log(newCityString);
        mainShow.innerHTML = newCityString;
}


//熱門景點渲染
let cityViewString = "" ;
let j = 0
function cityViewPrint(newCityRound2){
    cityViewString += `<div class="topViewIn">
    <a href="##"><img src="${newCityRound2['Picture']['PictureUrl1']}" alt="${newCityRound2['Picture']['PictureDescription1']}"></a>
    <h3 class="toggleColor">${newCityRound2['Picture']['PictureDescription1']}</h3>
    <h4>${livelyCity[j]}</h4></div>`;
        j++;
        // console.log(cityViewString);
        topViewSelect.innerHTML = cityViewString;
        // console.log(topViewSelect);
}


//輪播Carousel
const slides = document.querySelector('.slides')
// console.log(slides);
function Carousel(e){
    for(let i=0; i<=3;i++){
        axios({
            method: 'get',
            url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$select=Picture%20%2CCity%2CName&$top=300&$format=JSON`,
            headers: GetAuthorizationHeader()
        })
        // console.log(response);
        .then(function(response){
             //取出response裡data資料作成新陣列
             let newCity3 = [];
            let thisData3 = response.data
            thisData3.forEach(item => {
                // console.log(item);
                if(item.Picture.PictureUrl1 !== undefined){
                    newCity3.push(item)
                }
            });
            CarouselCom(newCity3);
        })
        .catch((error) => console.log(error))
    }
}
//隨機組出輪播圖
function CarouselCom(newCity3){
    // console.log(newCity1);
    let x = newCity3.length
let newX = Math.floor(Math.random()*x);
let CarouselComRound = newCity3[newX]
// console.log(CarouselComRound);
CarouselComPrint(CarouselComRound);
}
let CarouselComString = "" ;
let CarouselComI = 0
function CarouselComPrint(CarouselComRound){
    // console.log(CarouselComRound);
    CarouselComString += `<li>
    <img src="${CarouselComRound.Picture.PictureUrl1}" />
    <div class="flexSliderPic">
        <h1 class="picName">${CarouselComRound.Name}</h1>
        <button class="picLink" type="button" value="" onclick="location.href='##'">${CarouselComRound.City}</button>
    </div>
  </li>`;
        CarouselComI ++;
        // console.log(newCityString);
        slides.innerHTML = CarouselComString;
}


// 熱門美食
let newFoodData =[];
const hitFood = document.querySelector('.hitFood');
function hitFoodAPI(e){
        axios({
            method: 'get',
            url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?&$format=JSON`,
            headers: GetAuthorizationHeader()
        })
        // console.log(response);
        .then(function(response){
            // console.log(response.data);
            newFoodData = response.data;
            newFoodShow();
        })
        .catch((error) => console.log(error))
    }

    let ChineseFood = [];
    let nightFood = []; 
    let exoticFood = [];
    let iceFood = [];
    let souvenir = [];
    function newFoodShow(){
        newFoodData.forEach(function(item){
            if(item.Class == "中式美食"){
                ChineseFood.push(item);
            }else if(item.Class == "夜市小吃"){
                nightFood.push(item);
            }else if(item.Class == "異國料理"){
                exoticFood.push(item);
            }else if(item.Class == "甜點冰品"){
                iceFood.push(item);
            }else if(item.Class == "伴手禮"){
                souvenir.push(item);
            }
        })
        newFoodShow2();
        }

        function newFoodShow2(){
            let str = "";
            let newA;
            newA = Math.floor(Math.random()*(ChineseFood.length));
            str += `<div class="foodSelect"><img src="${ChineseFood[553].Picture.PictureUrl1}" alt="${ChineseFood[553].Class}"><h2>${ChineseFood[553].Class}</h2>
                <a class="darkHidden" href="##"></a></div>`
            
            newA = Math.floor(Math.random()*(nightFood.length));
                str += `<div class="foodSelect"><img src="./pic/pexels-cottonbro-5124902.jpg" alt="${nightFood[newA].Class}"><h2>${nightFood[newA].Class}</h2>
                    <a class="darkHidden" href="##"></a></div>`

                newA = Math.floor(Math.random()*(exoticFood.length));
                str += `<div class="foodSelect"><img src="${exoticFood[126].Picture.PictureUrl1}" alt="${exoticFood[126].Class}"><h2>${exoticFood[126].Class}</h2>
                    <a class="darkHidden" href="##"></a></div>`
                
                newA = Math.floor(Math.random()*(iceFood.length));
                str += `<div class="foodSelect"><img src="./pic/pexels-cottonbro-5124902.jpg" alt="${iceFood[newA].Class}"><h2>${iceFood[newA].Class}</h2>
                    <a class="darkHidden" href="##"></a></div>`

                newA = Math.floor(Math.random()*(souvenir.length));
                str += `<div class="foodSelect"><img src="${souvenir[158].Picture.PictureUrl1}" alt="${souvenir[158].Class}"><h2>${souvenir[158].Class}</h2>
                    <a class="darkHidden" href="##"></a></div>`

                newA = Math.floor(Math.random()*(newFoodData.length));
                str += `<div class="foodSelect"><img src="${newFoodData[88].Picture.PictureUrl1}" alt="全部類別"><h2>全部類別</h2>
                    <a class="darkHidden" href="##"></a></div>`
                hitFood.innerHTML = str;
            }


// 初始值
cityArr();//城市選取執行
cityView();//熱門景點
Carousel();//大圖輸出
hitFoodAPI();//景點輸出


//分頁
const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const TaiwanLogo = document.querySelector('.TaiwanLogo');
const travalGo = document.querySelector('.travalGo');

travalGo.addEventListener('click',function(e){
    page1.classList.add('d-none');
    page2.classList.remove('d-none');
})

TaiwanLogo.addEventListener('click',function(){
    page2.classList.add('d-none');
    page1.classList.remove('d-none');
})

//page2景點顯示
const areaSelect = document.querySelector('#areaSelect');
const travalSelectMainRight = document.querySelector('.travalSelectMainRight');
const travalBtn = document.querySelector('.travalBtn')
let travalData = [];
areaSelect.addEventListener('change',function(e){
    // console.log(areaSelect.value);
    axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${areaSelect.value}?&$format=JSON`,
        headers: GetAuthorizationHeader()
    })
    .then(function(response){
        travalData = response.data;
        travalShow();
            })
            .catch(function (error) {
                console.log(error);
            })
        })
        
        function travalShow(){
            // console.log(travalData[0]);
            let str = "";
            for(let i=0;i<=5; i++){
                // console.log(travalData[0]);
                // console.log(travalData[i]);
                str += `<div class="topViewIn2">
                <a href="##"><img src="${travalData[i].Picture.PictureUrl1}" alt="${travalData[i].Name}" onerror='this.style.display = "none"'></a>
                <h3 class="toggleColor">${travalData[i].Name}</h3>
                <h4>${travalData[i].City}</h4></div>`
            }
            travalSelectMainRight.innerHTML = str;
            travalBtn.classList.remove('d-none')
            travalBtn.addEventListener('click',function(){
                let count = 6
            for(let i=count;i<count+6; i++){
                // console.log(travalData[0]);
                // console.log(travalData[i]);
                str += `<div class="topViewIn2">
                <a href="##"><img src="${travalData[i].Picture.PictureUrl1}" alt="${travalData[i].Name}" onerror='this.style.display = "none"'></a>
                <h3 class="toggleColor">${travalData[i].Name}</h3>
                <h4>${travalData[i].City}</h4></div>`
            }
            travalSelectMainRight.innerHTML = str;
            count += 6;
            })
        }



//載入交通部API金鑰
function GetAuthorizationHeader() {
    var AppID = '5f26e8783f97436e95dd2706ae3e476c';//Peter Chen擁有
    var AppKey = 'KckLmAGtZVRJyvvMA7aQoFg4XP0';//Peter Chen擁有

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}
