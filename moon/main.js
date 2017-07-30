let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
// 文件作为类分离了，按照引入顺序
// 业务流程与类的封装的分离

let moon = new Moon(context, width, height);
let star = new Stars(context, width, height, 500);
let meteors = [];
let count = 0;
//流星生成函数
const meteorGenerator = ()=> {
    //x位置偏移，以免经过月亮
    let x = Math.random() * width + 800
    meteors.push(new Meteor(context, x, height))

    //每隔随机时间，生成新流星
    setTimeout(()=> {
        meteorGenerator()
    }, Math.random() * 2000)
}

const frame = () => {
  count++;
  if(count % 10 == 0) {
    star.blink();
  }
  moon.draw();
  star.draw();
  meteors.forEach((meteor, index, arr)=> {
        //如果流星离开视野之内，销毁流星实例，回收内存
        if (meteor.flow()) {
            meteor.draw()
        } else {
            arr.splice(index, 1)
        }
    })
  requestAnimationFrame(frame);
}
meteorGenerator();
frame();
