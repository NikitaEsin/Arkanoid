const canvas = document.getElementById("canvas");
      const c = canvas.getContext("2d");

      const paddleHeight = 10;
      const paddleWidth = 75;
      let paddleX = (canvas.width - paddleWidth) / 2;

      let ballRadius = 10;
      let x = canvas.width / 2;
      let y = canvas.height - 30;
      let dx = 1;
      let dy = -1;
      let score = 0;
      let playerName = "";
      let gameInterval;

      const brickRowCount = 5;
      const brickColumnCount = 8;
      const brickWidth = 75;
      const brickHeight = 20;
      const brickPadding = 10;
      const brickOffsetTop = 30;
      const brickOffsetLeft = 30;

      const bricks = [];
      for (let col = 0; col < brickColumnCount; col++) {
        bricks[col] = [];
        for (let row = 0; row < brickRowCount; row++) {
          bricks[col][row] = { x: 0, y: 0, status: 1, color: getRandomColor() };
        }
      }

      function getRandomColor() {
        const colors = ["blue", "red", "green"];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      let rightPressed = false;
      let leftPressed = false;

      document.addEventListener("keydown", keyDownHandler, false);
      document.addEventListener("keyup", keyUpHandler, false);

      function keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
          rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
          leftPressed = true;
        }
      }

      function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
          rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
          leftPressed = false;
        }
      }

      function drawBall() {
        c.beginPath();
        c.arc(x, y, ballRadius, 0, Math.PI * 2);
        c.fillStyle = "gray";
        c.fill();
        c.closePath();
      }

      function drawPaddle() {
        c.beginPath();
        c.rect(
          paddleX,
          canvas.height - paddleHeight,
          paddleWidth,
          paddleHeight
        );
        c.fillStyle = "black";
        c.fill();
        c.closePath();
      }

      function drawBricks() {
        for (let col = 0; col < brickColumnCount; col++) {
          for (let row = 0; row < brickRowCount; row++) {
            if (bricks[col][row].status === 1) {
              const brickX =
                col * (brickWidth + brickPadding) + brickOffsetLeft;
              const brickY =
                row * (brickHeight + brickPadding) + brickOffsetTop;
              bricks[col][row].x = brickX;
              bricks[col][row].y = brickY;
              c.beginPath();
              c.rect(brickX, brickY, brickWidth, brickHeight);
              c.fillStyle = bricks[col][row].color;
              c.fill();
              c.closePath();
            }
          }
        }
      }

      function collisionDetection() {
        for (let col = 0; col < brickColumnCount; col++) {
          for (let row = 0; row < brickRowCount; row++) {
            const b = bricks[col][row];
            if (
              b.status === 1 &&
              x + ballRadius > b.x &&
              x - ballRadius < b.x + brickWidth &&
              y + ballRadius > b.y &&
              y - ballRadius < b.y + brickHeight
            ) {
              const fromLeft = x < b.x + brickWidth / 2;
              const fromTop = y < b.y + brickHeight / 2;
              const overlapX = fromLeft
                ? x + ballRadius - b.x
                : b.x + brickWidth - (x - ballRadius);
              const overlapY = fromTop
                ? y + ballRadius - b.y
                : b.y + brickHeight - (y - ballRadius);
              if (overlapX < overlapY) {
                dx = fromLeft ? -1 : 1;
              } else {
                dy = fromTop ? -1 : 1;
              }
              b.status = 0;
              score += getScoreByColor(b.color);
              document.getElementById("score").innerText = score;
            }
          }
        }
      }

      function getScoreByColor(color) {
        switch (color) {
          case "blue":
            return 1;
          case "red":
            return 2;
          case "green":
            return 3;
        }
      }

      function updateScoreboard() {
        const scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];
        scoreboard.push({ name: playerName, score });
        scoreboard.sort((a, b) => b.score - a.score);
        const topScores = scoreboard.slice(0, 5);
        const scoreList = document.getElementById("scoreList");
        scoreList.innerHTML = "";
        topScores.forEach((entry, index) => {
          const listItem = document.createElement("li");
          listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score}`;
          scoreList.appendChild(listItem);
        });
        const scoreListWin = document.getElementById("scoreListWin");
        scoreListWin.innerHTML = "";
        topScores.forEach((entry, index) => {
          const listItem = document.createElement("li");
          listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score}`;
          scoreListWin.appendChild(listItem);
        });

        localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
      }

      function showLosePopup() {
        const losePopup = document.getElementById("losePopup");
        losePopup.style.display = "flex";
        document.getElementById("finalScore").innerText = score;
        updateScoreboard();
        dx = 0;
        dy = 0;
      }

      function showWinPopup() {
        const winPopup = document.getElementById("winPopup");
        winPopup.style.display = "flex";
        document.getElementById("finalScoreWin").innerText = score;
        updateScoreboard();
        dx = 0;
        dy = 0;
      }

      function showNamePopup() {
        const namePopup = document.getElementById("namePopup");
        namePopup.style.display = "flex";
      }

      function draw() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
          dx = -dx;
        }

        if (y + dy < ballRadius) {
          dy = -dy;
        }

        if (
          y + dy > canvas.height - ballRadius - paddleHeight &&
          x > paddleX &&
          x < paddleX + paddleWidth
        ) {
          dy = -dy;
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
          paddleX += 2;
        } else if (leftPressed && paddleX > 0) {
          paddleX -= 2;
        }

        let bricksLeft = 0;
        for (let col = 0; col < brickColumnCount; col++) {
          for (let row = 0; row < brickRowCount; row++) {
            if (bricks[col][row].status === 1) {
              bricksLeft++;
            }
          }
        }

        if (bricksLeft === 0) {
          showWinPopup();
          clearInterval(gameInterval);
        }

        if (y + dy > canvas.height - ballRadius) {
          showLosePopup();
          clearInterval(gameInterval);
        }

        x += dx;
        y += dy;

        requestAnimationFrame(draw);
      }

      function startGame() {
        playerName = document.getElementById("playerName").value;
        if (playerName.trim() !== "") {
          score = 0;
          document.getElementById("finalScore").innerText = score;
          gameInterval = setInterval(draw, 1000);
          document.getElementById("namePopup").style.display = "none";
          dx = 1;
          dy = -1;
        } else {
          alert("Please enter your name to start the game.");
        }
      }

      function startAgain() {
        if (playerName.trim() === "") {
          alert("Please enter your name before starting the game.");
          return;
        }

        x = canvas.width / 2;
        y = canvas.height - 30;
        paddleX = (canvas.width - paddleWidth) / 2;

        for (let col = 0; col < brickColumnCount; col++) {
          for (let row = 0; row < brickRowCount; row++) {
            bricks[col][row].status = 1;
          }
        }

        document.getElementById("losePopup").style.display = "none";
        document.getElementById("winPopup").style.display = "none";

        showNamePopup();
      }

      showNamePopup();