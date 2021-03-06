class Game1_2 extends Phaser.Scene {
  constructor() {
    super("Game1_2");
  }
  preload() {
    this.load.image("initscene2", "assets/initscene2.png");
    this.load.image("done", "assets/donebutton.png");
    this.load.image("erase", "assets/erase.png");
    this.load.image("notification", "assets/notification.png");
    this.load.image("stateBar", "assets/state_bar.png");
    this.load.image("green", "assets/green.png");
    this.load.image("brown", "assets/brown.png");
    this.load.image("blue", "assets/blue.png");
    this.load.image("next", "assets/next.png");
    this.load.image("carrot", "assets/carrot.png");
    this.load.image("snowman", "assets/snowman.png");
    this.load.image("bow", "assets/bow.png");
    this.load.image("snow_background", "assets/snow background.jpg");
  }

  create() {
    this.countFill = 0; //Đếm số lượng hình chưa được tô màu
    this.countFailCorlor = 0; //Đếm số lượng hình tô sai màu

    var color = 0xffffff;
    this.greenColor = 0x27AE60;
    this.blueColor = 0x85C1E9;
    this.brownColor = 0xE67E22;

    const gameScene = this.scene.get('Game1_2'); //Đặt biến gameScene, đoạn dưới dùng biến này để restart lại game, chuyển sang game mới

    this.add.image(config.width / 2, config.height / 2, "initscene2");

    var backButton = this.add.text(170, 70, 'BACK', { //Nút BACK
      fontFamily: "Roboto Condensed",
      fontSize: 20,
      color: "#1a65ac",
    });

    var snow_background = this.add.image(config.width / 2, config.height / 2 - 20, "snow_background"); //Nền tuyết, sau khi hoàn thành và nhấ nút DONE thì mới xuất hiện
    snow_background.visible = false;

    var shape = new Phaser.Geom.Circle(10, 0, 40);
    backButton.setInteractive(shape, Phaser.Geom.Circle.Contains);
    backButton.on('pointerover', function() { //Hiệu ứng khi di chuột vào nút BACK nút sẽ có màu xanh đậm
      backButton.setTint(0x0000ff);
    });
    backButton.on('pointerout', function() { //Khi chuột không còn ở nút BACK thì trở lại màu như ban đầu
      backButton.clearTint();
    });
    backButton.on('pointerup', () => gameScene.scene.start('startGame')); //Khi nhấn chuột vào nút BACK thì quay trở lại màn hình bắt đầu (StartScene)

    this.add.text(555, 100, 'Color the shapes', { //Thêm tiêu đề
      fontFamily: "Roboto Condensed",
      fontSize: 50,
      color: "#000",
    });

    //Thêm cọ và chữ bên phải cọ
    var greenRectangle = new Rect(this, 630, 580, 220, 60);
    greenRectangle.setStrokeStyle(0, 0xffffff);
    greenRectangle.fillColor = this.greenColor;
    greenRectangle.visible = false;
    var green = this.add.image(545, 580, "green");
    var triangleText = this.add.text(580, 560, 'Triangles', {
      fontFamily: "Roboto Condensed",
      fontSize: 35,
      color: "#000",
    });

    var blueRectangle = new Rect(this, 918, 580, 220, 60);
    blueRectangle.setStrokeStyle(0, 0xffffff);
    blueRectangle.fillColor = this.blueColor;
    blueRectangle.visible = false;
    var blue = this.add.image(840, 580, "blue");
    var circleText = this.add.text(875, 560, 'Circles', {
      fontFamily: "Roboto Condensed",
      fontSize: 35,
      color: "#000",
    });

    var brownRectangle = new Rect(this, 1185, 580, 205, 60);
    brownRectangle.setStrokeStyle(0, 0xffffff);
    brownRectangle.fillColor = this.brownColor;
    brownRectangle.visible = false;
    var brown = this.add.image(1112, 580, "brown");
    var squareText = this.add.text(1147, 560, 'Squares', {
      fontFamily: "Roboto Condensed",
      fontSize: 35,
      color: "#000",
    });

    var done = this.add.image(701, 660, "done"); //Nút done

    var eraseRectangle = new Rect(this, 280, 580, 205, 60);
    eraseRectangle.setStrokeStyle(0, 0xffffff);
    eraseRectangle.fillColor = 0xFFEBEE;
    eraseRectangle.visible = false;
    var erase = this.add.image(230, 580, "erase"); //Tẩy và chữ Erase bên phải tẩy
    var eraseText = this.add.text(270, 560, 'Erase', {
      fontFamily: "Roboto Condensed",
      fontSize: 35,
      color: "#000",
    });

    var next = this.add.image(701, 580, "next"); //Nút NEXT (ban đầu không nhìn thấy)
    next.visible = false;

    var notification = this.add.image(1030, 655, "notification"); //Thông báo khi nhấn nút Done mà chưa tô hết các hình
    notification.visible = false; //Ban đầu không nhìn thấy thông báo

    var shapes = [];

    //Khai báo và vẽ 9 hình tam giác
    shapes.push(new Tri(this, 1140, 190, 0, 50, 50, 50, 0, 0));
    shapes[0].setAngle(135);
    shapes.push(new Tri(this, 1140, 264, 0, 100, 100, 100, 0, 0));
    shapes[1].setAngle(135);
    shapes.push(new Tri(this, 1140, 375, 0, 150, 150, 150, 0, 0));
    shapes[2].setAngle(135);
    shapes.push(new Tri(this, 900, 200, 0, 70, 70, 70, 0, 0));
    shapes[3].setAngle(135);
    shapes.push(new Tri(this, 900, 303, 0, 140, 140, 140, 0, 0));
    shapes[4].setAngle(135);
    shapes.push(new Tri(this, 900, 435, 0, 180, 180, 180, 0, 0));
    shapes[5].setAngle(135);
    shapes.push(new Tri(this, 300, 243, 0, 70, 70, 70, 0, 0));
    shapes[6].setAngle(135);
    shapes.push(new Tri(this, 300, 348, 0, 140, 140, 140, 0, 0));
    shapes[7].setAngle(135);
    shapes.push(new Tri(this, 300, 461, 0, 150, 150, 150, 0, 0));
    shapes[8].setAngle(135);

    //Khai báo và vẽ 3 hình tròn
    shapes.push(new Cir(this, 500, 276, 30));
    shapes.push(new Cir(this, 500, 348, 40));
    shapes.push(new Cir(this, 500, 450, 60));


    //Khai báo và vẽ 4 hình vuông
    shapes.push(new Rect(this, 668, 492, 100, 100)); //Hộp quà
    //Gốc cây
    shapes.push(new Rect(this, 300, 500, 70, 70));
    shapes.push(new Rect(this, 900, 472, 65, 65));
    shapes.push(new Rect(this, 1140, 406, 55, 55));

    //Khi nhấn chuột vào thì tô màu vừa chọn vào hình
    shapes.forEach(item => {
      item.setInteractive().on('pointerup', () => item.color(color));
    });


    //Hình phụ, xuất hiện khi làm đúng yêu cầu và nhấn nút DONE
    var snowman = this.add.image(505, 300, "snowman"); //Mũ, khăn len, mắt, tay của người tuyết
    snowman.visible = false;
    var carrot = this.add.image(530, 290, "carrot"); //Mũi người tuyết
    carrot.visible = false;
    var bow = this.add.image(shapes[12].x, shapes[12].y - 40, "bow"); //Nơ của hộp quà
    bow.visible = false;


    //Hiệu ứng khi di chuột qua cọ vẽ thì cọ có màu đậm hơn, khi chuột ra khỏi vùng cọ vẽ thì cọ trở lại trạng thái ban đầu
    //Khi nhấn chuột vào thì màu (biến color) được set lại
    var button = new Phaser.Geom.Circle(46, 45, 50);
    //Cọ xanh lá
    green.setInteractive(button, Phaser.Geom.Circle.Contains);
    green.on('pointerover', function() {
      green.setTint(0x1b5e20);
    });
    green.on('pointerout', function() {
      green.clearTint();
    });
    green.on('pointerup', function() {
      color = gameScene.greenColor;
      greenRectangle.visible = true;
      brownRectangle.visible = false;
      blueRectangle.visible = false;
      eraseRectangle.visible = false;
    });

    //Cọ nâu
    brown.setInteractive(button, Phaser.Geom.Circle.Contains);
    brown.on('pointerover', function() {
      brown.setTint(0xBA4A00);
    });
    brown.on('pointerout', function() {
      brown.clearTint();
    });
    brown.on('pointerup', function() {
      color = gameScene.brownColor;
      brownRectangle.visible = true;
      blueRectangle.visible = false;
      greenRectangle.visible = false;
      eraseRectangle.visible = false;
    });

    //Cọ xanh dương
    blue.setInteractive(button, Phaser.Geom.Circle.Contains);
    blue.on('pointerover', function() {
      blue.setTint(0x21618C);
    });
    blue.on('pointerout', function() {
      blue.clearTint();
    });
    blue.on('pointerup', function() {
      color = gameScene.blueColor;
      blueRectangle.visible = true;
      brownRectangle.visible = false;
      greenRectangle.visible = false;
      eraseRectangle.visible = false;
    });

    //Tẩy cũng có hiệu ứng khi di chuột qua, khi nhấn chuột vào tẩy thì màu (biến color) được set là màu trắng
    erase.setInteractive(button, Phaser.Geom.Circle.Contains);
    erase.on('pointerover', function() {
      erase.setTint(0x7878ff);
    });
    erase.on('pointerout', function() {
      erase.clearTint();
    });
    erase.on('pointerup', function() {
      color = 0xffffff;
      eraseRectangle.visible = true;
      blueRectangle.visible = false;
      brownRectangle.visible = false;
      greenRectangle.visible = false;
    });

    //Nút Done cũng có hiệu ứng khi di chuột qua
    done.setInteractive(button, Phaser.Geom.Circle.Contains);
    done.on('pointerover', function() {
      done.setTint(0x303f9f);
    });
    done.on('pointerout', function() {
      done.clearTint();
    });
    done.on('pointerup', function() { //Khi nhấn chuột thì kiểm tra các hình đã được tô chưa, nếu tô thì tô đúng chưa
      for (var i = 0; i < shapes.length; i++) {
        gameScene.check(shapes[i]);
      }

      if (gameScene.countFailCorlor > 0) //Nếu có hình tô sai thì viền đỏ (đã làm trong hàm check()), dừng màn hình 1s sau đó xóa màu của những hình tô sai
      {
        for (var i = 0; i < shapes.length; i++) {
          gameScene.deleteColor(shapes[i]);
        }
      } else if (gameScene.countFill > 0) { //Nếu có hình chưa tô thì đưa ra thông báo "Color all the shapes", sau 3s thì ẩn thông báo
        notification.visible = true;
        setTimeout(() => notification.visible = false, 3000);
      } else {
        this.visible = false;
        green.visible = false;
        brown.visible = false;
        blue.visible = false;
        greenRectangle.visible = false;
        brownRectangle.visible = false;
        blueRectangle.visible = false;
        eraseRectangle.visible = false;
        erase.visible = false;
        eraseText.visible = false;
        triangleText.visible = false;
        circleText.visible = false;
        squareText.visible = false;
        snowman.visible = true;
        snow_background.visible = true;
        bow.visible = true;
        next.visible = true;
        next.setInteractive().on('pointerup', () => gameScene.scene.start("ConversionScene2"));
      }

      //Set lại giá trị biến đếm số hình chưa tô và biến đếm số lượng hình tô sai màu
      gameScene.countFill = 0;
      gameScene.countFailCorlor = 0;
    });
  }

  //Đếm số hình chưa tô, số hình tô sai, tô sai thì vẽ viền đỏ
  check(shape) {
    if (shape.isFill() === false) this.countFill++;
    else {
      if (this.isTrueColor(shape) === false) {
        shape.drawStroke();
        this.countFailCorlor++;
      }
    }
  }

  //Xóa màu và viền đỏ của hình tô màu sai
  deleteColor(shape) {
    if (shape.isFill() === true && this.isTrueColor(shape) === false) {
      setTimeout(function() {
        shape.setStrokeStyle(2, 0x000000);
        shape.fillColor = 0xffffff;
      }, 1500);
    }
  }

  isTrueColor(shape) {
    if (shape instanceof Rect) {
      if (shape.fillColor === this.brownColor) return true;
      else return false;
    }
    if (shape instanceof Cir) {
      if (shape.fillColor === this.blueColor) return true;
      else return false;
    }
    if (shape instanceof Tri) {
      if (shape.fillColor === this.greenColor) return true;
      else return false;
    }
  }
}
