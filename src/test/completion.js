int[][] orig = {
  {
    00, 10 //1
  }
  , 
  {
    10, 25 //2
  }
  , 
  {
    20, 40 //3
  }
  , 
  {
    40, 130 //4
  }
  , 
  {
    70, 10 //5
  }
  , 
  {
    75, 50 //6
  }
  , 
  {
    90, 160 //7
  }
  , 
  {
    120, 100 //8
  }
};


float[][] normOrig;
float[] lineLength;
float totalLength=0;
int[] addPoint;
int totalAddPoint;
float[][] data;
float scale;

int xmax=0;
int ymax=0;
int dotNum = 200;
int address = 0;

void setup() {
  size(500, 500);

  // determine maximum value of x and y.
  // for (int i=0; i<orig.length; i++)
  // {
  //   if (xmax < orig[i][0]) {
  //     xmax = orig[i][0];
  //   }
  //   if (ymax < orig[i][1]) {
  //     ymax = orig[i][1];//xとyの最大値を測る
  //   }
  // }

  // // create data points. 
  // normOrig=new float[orig.length][2];
  // for (int i=0; i<orig.length; i++) {
  //   if(width/xmax < height/ymax){
  //     scale = width/xmax;
  //   }else{
  //     scale = height/ymax;
  //   }
  //   //scale = 1.0;
  //   normOrig[i][0]=orig[i][0]*scale;
    
  //   normOrig[i][1]=orig[i][1]*scale;//正規化
  // }

  // create line length of data points (sum up distances of two nabor points).
    lineLength= new float[orig.length];
    // 入力の座標の数だけループをまわす
    //    配列の宣言
    //　配列に各座標の距離を入れてる
    //　配列に入れた距離を全て足し合わせている
  for (int i=0; i<normOrig.length-1; i++) {
    lineLength[i] = distance(normOrig[i][0], normOrig[i][1], normOrig[i+1][0], normOrig[i+1][1]);
    totalLength+=lineLength[i];//leapで入力した点間の距離を全部足し合わせている
  }

var points = [
    {x: 1, y: 2, z: 0},
    {x: 5, y: 5, z: 0},
    {x: 10, y: 20, z: 0},
    {x: 14, y: 29, z: 0}   
];
    
    var lineLength = changeOfDistance(points);
    var sum  = function(lineLength) {
    var sum = 0;
    arr.forEach(function(elm) {
        totalLength += elm;
    });
    return totalLength;
};

var arr = [1, 2, 3, 4, 5];
console.log( totalLength(lineLength) );
	
	
    
  // create number of additional points
    addPoint = new int[normOrig.length -1];
    //配列の宣言
    //入力された座標の数-1だけループをまわす
    //挿入する座標　(総数-1)*各座標の距離/全て足し合わせた距離
    //
  for (int i=0; i<normOrig.length-1; i++) {
    int insertPoint = int((dotNum - 1) * lineLength[i]/totalLength);
    if (insertPoint > 0) {
      addPoint[i] =  insertPoint -1;
      println("no_"+i+":"+addPoint[i]);
    }//追加する点の数を区間ごとに決めている
  }


  // how many points does the system insert?;
  for (int i=0; i<addPoint.length; i++) {
    totalAddPoint += addPoint[i];
  }//実際に何点分の配列を用意しないといけないかを決めている

  // finally generated a inserted data stream;//補完された分の全ての座標を生成
  data = new float[totalAddPoint + normOrig.length][2];
  for (int i=0; i<normOrig.length-1; i++) {
    int pointNum = addPoint[i];
    data[address][0] = normOrig[i][0];
    data[address][1] = normOrig[i][1];
    address++;

    for (int j=0; j<pointNum; j++) {
      data[address][0] = normOrig[i][0] + j*(normOrig[i+1][0]-normOrig[i][0])/(pointNum+1);     
      data[address][1] = normOrig[i][1] + j*(normOrig[i+1][1]-normOrig[i][1])/(pointNum+1);  
      address++;
    }
  }
  data[address][0]= normOrig[normOrig.length -1][0];
  data[address][1]= normOrig[normOrig.length -1][1];
}

// void draw() {
//   //println(data.length);
//   for (int i=0; i<data.length; i++) {
//     fill(i+10);
//       ellipse(data[i][0], data[i][1], 5, 5);//補完された点を描画
//       //描画はいらないんだ
//     //println(data[i][0]);
//   }
//   for (int i=0; i<normOrig.length; i++) {
//     fill(30, 30, 30);
//     ellipse(normOrig[i][0], normOrig[i][1], 25, 25);//もともとの点
//   }
// }

// float distance(float x1, float y1, float x2, float y2) {
//   return sqrt(
//   pow(x2 - x1, 2) + pow(y2 - y1, 2));
// }





//製作途中

var points = [
    {x: 1, y: 2, z: 0},
    {x: 5, y: 5, z: 0},
    {x: 10, y: 20, z: 0},
    {x: 14, y: 29, z: 0}   
];
    
var lineLength = changeOfDistance(points);
    var totalLength  = function(lineLength) {
    var totalLength = 0;
    lineLength.forEach(function(elm) {
        totalLength += elm;
    });
    return totalLength;
};




function changeOfDistance(data) {
    var n = data.length - 1;
    var d = [];
    for (var i = 0; i < n; i++) {
	var x = Math.pow(data[i+1].x - data[i].x, 2);
	var y = Math.pow(data[i+1].y - data[i].y, 2);
	var z = Math.pow(data[i+1].z - data[i].z, 2);
	d.push(Math.sqrt(x + y + z));
    }
    return d;
}
