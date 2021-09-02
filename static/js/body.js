import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
    window.onload = async () => {
      // get map
      const stagename = 7;

      // マップタイルの表示
      const mapstr = await fetchJSON("api/stage", { "name": stagename });
      const map = JSON.parse(mapstr)["stage"];
      const start = JSON.parse(mapstr)["start"];
      const goal = JSON.parse(mapstr)["goal"];

      // tile size
      const tilesize = 32;

      // canvas設定
      const canvas = document.getElementById("canvas");
      canvas.width = tilesize * map[0].length; // canvasの横幅
      canvas.height = tilesize * map.length; // canvasの縦幅

      // コンテキスト取得
      const ctx = canvas.getContext('2d');

      // 描画用関数の定義
      const drawChip = (img, y, x) => {
        ctx.drawImage(
          img,
          0, 0,
          img.naturalWidth, img.naturalHeight,
          tilesize * x, tilesize * y,
          tilesize, tilesize,
        );
      }

      // マップタイル用Imageオブジェクトの生成
      const maptileWall = new Image();
      maptileWall.setAttribute('src', './img/map01.png');
      const maptileWall2 = new Image();
      maptileWall2.setAttribute('src', './img/map03.png');

      const maptileFloor = new Image();
      maptileFloor.setAttribute('src', './img/map02.png');

      const maptileStart = new Image();
      maptileStart.setAttribute('src', './img/start.png');

      const maptileGoal = new Image();
      maptileGoal.setAttribute('src', './img/goal.png');


      function render() {
        for (let y = 0; y < map.length; y++) {
          for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 0) {
              drawChip(maptileWall, y, x);
            }
            if (map[y][x] === 2) {
              drawChip(maptileWall2, y, x);
            }
            
            if (map[y][x] === 1) {
              drawChip(maptileFloor, y, x);
              if (y === start[0] && x === start[1]) {
                drawChip(maptileStart, y, x)
              }
              if (y === goal[0] && x === goal[1]) {
                drawChip(maptileGoal, y, x)
              }
            }
          }
        }
        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);
    }