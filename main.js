window.onload = function () {
   // 'use strict'
    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    var mouse = utils.captureMouse(canvas),
    //touch = utils.captureTouch(canvas),
    log = document.getElementById('text'),
    gScore = document.getElementById('score'),
    pause = document.querySelector('#pause'),
    segments = [],
    numSegments = 4;
 var ball = new Ball(5, Math.random()*255 * 0xffffff),
    mslider = new mSlider(100,80, Math.random()*255 * 0xffffff),
    bricks = [],
    bricksLen = 20 * (Math.floor(Math.random()*5) + 5),
    gravity = 0.1,
    bounce = -0.8,
    spring = 0.03,
    score = 0,
    twoColor = ['rgb(76, 51, 35)', 'rgb(192, 116, 75'];
    ball.y = canvas.height /2;
    ball.vx = Math.random() *20;
         
    mslider.y = canvas.height - 100;


         /* ------------ draw bricks -----------*/ 
         for(var i = 15; i <= bricksLen; i+=15) {
          for (var j = 25; j <= canvas.width-50; j+=20) {
          //j += Math.floor(Math.random()*50);   
          brick = new Bricks(20, 15, j, i, twoColor[Math.floor(Math.random()*2)]);
          bricks.push(brick);
         }
        } 

        /* ------------ draw segments -----------*/ 
      while (numSegments--) {
        segments.push(new Segment(20, Math.random()*3+3, Math.random()*255 * 0xffffff));
      }


      // bounce ball boundries

      function moveBall() {
        ball.vy += gravity;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x + ball.radius > canvas.width) {
          ball.x = canvas.width - ball.radius;
          ball.vx *= bounce;
        } else if (ball.x - ball.radius < 0) {
           ball.x = ball.radius;
           ball.vx *= bounce;
        }else if (ball.y > canvas.height+1000) {
          ball.x = ball.radius;  
          ball.y = canvas.height /5;
          ball.vy = 1;
          
        } else if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= bounce;
          
        }
      
      }

      
      segments[segments.length -1].x = canvas.width /2;
      segments[segments.length -1].y = canvas.height/2;


      function reach (segment, xpos, ypos) {

      var dx = xpos - segment.x,
          dy = ypos - segment.y;

       segment.rotation = Math.atan2(dy, dx);

       var w = segment.getPin().x - segment.x,
           h = segment.getPin().y - segment.y; 

       return {
        x: xpos - w,
        y: ypos - h
       } ;   

      }

      function position (segmentA, segmentB)  {
        segmentA.x = segmentB.getPin().x;
        segmentA.y = segmentB.getPin().y;
      }  

      // ball hit by segments
      function checkHit() {
        var segment = segments[0],
            dx = segment.getPin().x - ball.x,
            dy = segment.getPin().y - ball.y,
            dist = Math.sqrt(dx * dx + dy * dy);

         if(dist < ball.radius)  {
          ball.vx += Math.random() * 2 - 1;
          ball.vy -= 1;

         }
         
       }

       function check(slider) {
        if (utils.intersects(ball.getBounds(), mslider)) {
          ball.y = mslider.y - ball.radius;
          ball.vy *= bounce-0.2;
          //ball.vx *= Math.sin(mslider.x-mouse.x) *1;
          
        } 

        //  if (mslider.x + mslider.width > canvas.width) {
        //   mslider.x = canvas.width - mslider.width;
          
        // } else if (mslider.x - mslider.width < 0) {
        //    mslider.x = mslider.height;
           
        // }
       } 


      function move (segment, i) {
        if (i !==0) {
          target = reach(segment, target.x, target.y);
          position(segments[i-1], segment);
        }
      }

      function brickhit (brick, i, bricks) {
        var dx = brick.x - ball.x,
            dy = brick.y - ball.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            min_distW = ball.radius + brick.width,
            min_dist = ball.radius + brick.height;
            
        if (utils.intersects(ball.getBounds(), brick)) {
            bricks.splice(i, 1);    
            ball.vy *= bounce;
            score +=1;
            gScore.value = "score :" +score;  
           }
     
      brick.draw(c);
      }
      
      
      function draw (segment) {
        segment.draw(c);
      }

      function drawBrick (bricks) {
        bricks.draw(c);
      }
      
      var count = 0,
          count1 = true;
          log.value = "2";

      var kx = 0.8 * 0.2;   

      
      // slider move events 
      // if(addEventListener('mousemove')) {

      
      
      // }
       //  if(touch) {
       //   canvas.addEventListener('touchmove' , function(e) {

       //     mslider.x = touch.x - (mslider.width/2);
       //   }, false);
       // } else {
          canvas.addEventListener('mousemove' , function(e) {

           mslider.x = mouse.x - (mslider.width/2);
         }, false);
  
       //}
      (function drawFrame () {
        
        window.requestAnimationFrame(drawFrame, canvas);
        if(pause.value === 'play') {
        c.clearRect(0, 0, canvas.width, canvas.height);
        mslider.draw(c);
        ball.draw(c);

        moveBall();
        target = reach(segments[0], ball.x, ball.y);
        segments.forEach(move);
        segments.forEach(draw);
        bricks.forEach(brickhit);
        
        checkHit();
        check(mSlider);
       
        }
       }());
        
                  
        
};
