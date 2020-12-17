
/* 카드 넘기기 처리를 선입선출을 이용하기 위해 큐로 구현 */
class Queue {
  constructor() {
    this._arr = [];
  }
  enqueue(item) {
    this._arr.push(item);
  }
  enqueueOpposite(item){
    this._arr.unshift(item);
  }
  dequeue() {
    return this._arr.shift();
  }
  dequeueOpposite(){
    return this._arr.pop();
  }
  get(i){
    return this._arr[i];
  }
  size(){
    return this._arr.length;
  }
}

window.onload=function(){

  /* 8번째 섹션 카드 넘어가는 부분을 위한 전처리 */
  let cardArr = document.getElementsByClassName('card');
  let queue = new Queue();
  for(let i=0; i<cardArr.length; i++){
    queue.enqueue(cardArr[i]);
  }
  let parent = document.getElementById('slide');
  let centerIdx = Math.floor(queue.size()/2);

  /* 카드 넘기기 전, 후 버튼 이벤트 등록 */
  document.getElementById('slide-prev').addEventListener('click', ()=>{
    let newNode = queue.dequeue();

    parent.removeChild(parent.children[0]);
    parent.appendChild(newNode);

    queue.enqueue(newNode);

    parent.children[centerIdx-1].className = "card";
    parent.children[centerIdx].className = "card slide-active slide-center";
    parent.children[centerIdx+1].className = "card";
  });
  document.getElementById('slide-next').addEventListener('click', ()=>{
    let newNode = queue.dequeueOpposite();

    parent.removeChild(parent.children[queue.size()]);
    parent.prepend(newNode);

    queue.enqueueOpposite(newNode);

    parent.children[centerIdx-1].className = "card";
    parent.children[centerIdx].className = "card slide-active slide-center";
    parent.children[centerIdx+1].className = "card";
  });

  /* 스크롤에 따른 인터랙션 처리를 위한 이벤트 등록 */
  document.addEventListener('scroll', () =>{
    let str = ".third-content-img";
    scrollDownEventFunc(str);
  });
  document.addEventListener('scroll', () =>{
    let str = ".sixth-content-img";
    scrollDownEventFunc(str);
  });
  document.addEventListener('scroll', () =>{
    let str = ".seventh-content";
    scrollDownEventFunc(str);
  });
  document.addEventListener('scroll', () =>{
    let str = ".seventh-content.after";
    scrollUpEventFunc(str);
  });
};

/* 스크롤 내릴 때 이벤트 - 3, 6, 7 번째 섹션 */
function scrollDownEventFunc(str){
  const target = document.querySelector(str);

  if(target){
    /* https://mommoo.tistory.com/85 참고 */
    /*
    브라우저간 호환성을 위해서는
    window.scrollY 대신 window.pageYOffset을 사용
    */
    const scrollPos = window.pageYOffset;
    const absolutePos = getTriggerPos(target, scrollPos);

    if(absolutePos < scrollPos){
      updateTransitionDown(target, str);
    }
  }
}
/* 스크롤 올릴 때 이벤트 - 7 번째 섹션 */
function scrollUpEventFunc(str){
  const target = document.querySelector(str);
  if(target){
    const scrollPos = window.pageYOffset;
    const absolutePos = getTriggerPos(target, scrollPos);

    if(absolutePos >= scrollPos){
      updateTransitionUp(target, str);
    }
  }
}

/* 이벤트가 트리거되는 스크롤 포지션을 찾기 위한 함수 */
function getTriggerPos(target, scrollPos){
  const clientRect = target.getBoundingClientRect();
  const relativePos = (clientRect.top + clientRect.bottom) / 2.5;
  const absolutePos = scrollPos + relativePos - window.innerHeight;

  return absolutePos;
}

/* 스크롤 이동 시 이벤트 트리거되면 css 처리해주는 함수 */
function updateTransitionDown(target, str){
  if(".".concat(target.className) === str){
    target.className = target.className.concat(" after");
  }
}
function updateTransitionUp(target, str){
  let com = str.replace(".after", " after"); // com: .xxxx.after -> .xxxx after
  if(".".concat(target.className) === com){
    target.className = target.className.replace(" after", ""); // className: xxxx after -> xxxx
  }
}
