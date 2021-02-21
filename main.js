//抓dom
let weiDom = document.getElementById('weight');
let heiDom = document.getElementById('height');
let resBtn = document.querySelector('.txtbox__btn');
let listDom = document.querySelector('.record__list');
let resBox = document.querySelector('.txtbox__res');
let alertDom = document.querySelector('.txtbox__alert');
let deleteDom = document.querySelector('.record__delete');

//抓data
let data = JSON.parse(localStorage.getItem('bmiList')) || [];

//間聽事件
resBtn.addEventListener('click',getData);
resBox.addEventListener('click',backBtn);
listDom.addEventListener('click',deleteData)
deleteDom.addEventListener('click',deleteAll)

updateList(data)

//計算並寫入storage
function getData(e){
  e.preventDefault();
  let weight = weiDom.value;
  let height = heiDom.value;
  let res = weight/ Math.pow(height/100,2);
  let currentDate = new Date();
  let Month = currentDate.getMonth() + 1;
  let Year = currentDate.getFullYear();
  let Day = currentDate.getDate();
  Month > 10 ? Month = Month : Month = '0'+ Month;
  Day > 10 ? Day = Day : Day = '0'+ Day;
  res = res.toFixed(2);
  if(res < 15 || res > 40 || isNaN(res)){
    alertDom.style.display='block';
    return
  }else{
    alertDom.style.display='none';
  }
  let color = getColor(res)[0]
  let resTxt = getColor(res)[1]
  let list = {
    weight:weight,
    height:height,
    bmi:res,
    date:`${Month}-${Day}-${Year}`,
    color:color,
    resTxt:resTxt
  }
  weiDom.value='';
  heiDom.value='';
  addData(data,list);
  goResult(color,resTxt,res);
  updateList(data);
}
//寫入storage
function addData(data,list){
  data.splice(0,0,list);
  if (data.length > 5){
    data.splice(5,1);
  }
  localStorage.setItem('bmiList',JSON.stringify(data));
}

//刪除data
function deleteData(e){
  e.preventDefault();
  if(e.target.nodeName === 'A');
  let index = e.target.dataset.index;
  data.splice(index,1);
  localStorage.setItem('bmiList',JSON.stringify(data));
  updateList(data);
}

//全部刪除
function deleteAll(e){
  e.preventDefault();
  data = [];
  localStorage.setItem('bmiList',JSON.stringify(data));
  updateList(data);
}

//網頁更新
function updateList(items){
  let len = data.length;
  str = '';
  for (let i = 0 ; i < len ; i++){
    str +=`
    <li class='record__item'>
      <div class='bar ${items[i].color}'></div>
      <p>${items[i].resTxt}</p>
      <p>BMI <span>${items[i].bmi}</span></p>
      <p>weight <span>${items[i].weight}kg</span></p>
      <p>height <span>${items[i].height}cm</span></p>
      <p>${items[i].date}</p>
      <p><a href="#" data-index=${i}>刪除</a></p>
    </li>
    `
  }
  listDom.innerHTML = str;
}

//改BTN
function goResult(col,resTxt,res){
  let str = `
      <h4 class='txtbox__res-num'>${res}</h4>
      <h3 class='txtbox__res-txt'>${resTxt}</h3>
      <a href="#" class='txtbox__res-return'>
        <img src="img/icons_loop.png" alt="return">
      </a>
  `
  resBox.innerHTML = str;
  resBox.style.display='flex';
  resBox.className += ' '+col;
  resBtn.style.display='none';
}

//回去BTN
function backBtn(e){
  if(e.target.nodeName === 'IMG' || e.target.nodeName === 'A'){
    resBtn.style.display='block';
    resBox.style.display='none';
  }
}

//判斷顏色及文字
function getColor(bmi){
  if(bmi < 18.5){
    return ['blue','過輕']
  }else if(bmi >= 18.5 && bmi < 25){
    return ['green','理想']
  }else if(bmi >=25 && bmi < 30){
    return ['ltorange','過重']
  }else if(bmi >=30 && bmi < 35){
    return ['ltorange','輕度肥胖']
  }else if (bmi >=35 && bmi < 40){
    return ['dkorange','中度肥胖']
  }else if(bmi >= 40){
    return ['red','重度肥胖']
  }
}