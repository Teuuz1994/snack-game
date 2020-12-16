window.onload = () => {
  const speed = 1;
  let speedX = 0;
  let speedY = 0;
  let pointX = 10;
  let pointY = 15;
  let lengthPiece = 20;
  let quantityPiece = 20;
  let appleX = 15;
  let appleY = 15;
  let trail = [];
  let tail = 5;
  let pointsCount = 0
  let stage = document.getElementById('stage');
  let context = stage.getContext('2d');
  let points = document.getElementById('points')

  points.textContent = `Points: ${pointsCount}`

  function keyPush(event) {
    switch (event.key) {
      case 'ArrowLeft':
        speedX = -speed;
        speedY = 0;
        break;

      case 'ArrowUp':
        speedX = 0;
        speedY = -speed;
        break;

      case 'ArrowRight':
        speedX = speed;
        speedY = 0;
        break;

      case 'ArrowDown':
        speedX = 0;
        speedY = speed;
        break;

      default:
        break;
    }
  }

  function restart() {
    speedX = 0;
    speedY = 0;
    tail = 5;
    pointsCount = 0
    points.textContent = `Points: ${pointsCount}`
  }

  function start() {
    pointX += speedX;
    pointY += speedY;

    switch (true) {
      case pointX < 0:
        pointX = quantityPiece - 1;
        break;
      case pointX > quantityPiece - 1:
        pointX = 0;
        break;
      case pointY < 0:
        pointY = quantityPiece - 1;
        break;
      case pointY > quantityPiece - 1:
        pointY = 0;
        break;
      default:
        break;
    }

    context.fillStyle = 'black';
    context.fillRect(0, 0, stage.width, stage.height);

    context.fillStyle = 'red';
    context.fillRect(appleX * lengthPiece, appleY * lengthPiece, lengthPiece, lengthPiece);

    context.fillStyle = 'white';
    trail.forEach(function (trl) {
      context.fillRect(trl.x * lengthPiece, trl.y * lengthPiece, lengthPiece, lengthPiece);
      if (trl.x === pointX && trl.y === pointY) {
        restart()
      }
    });

    trail.push({ x: pointX, y: pointY });

    while (trail.length > tail) {
      trail.shift();
    }

    if (appleX === pointX && appleY === pointY) {
      tail++;
      pointsCount += 1 * 10
      points.textContent = `Points: ${pointsCount}`
      appleX = Math.floor(Math.random() * quantityPiece);
      appleY = Math.floor(Math.random() * quantityPiece);
    }
  }

  document.addEventListener('keydown', keyPush);
  setInterval(start, 80);
};
