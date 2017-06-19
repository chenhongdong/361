## 记录我在这里的点点滴滴

### 6.19  利用canvas加上requestAnimationFrame绘制爱心动画
```
	var num = 100;	//100个红心对象
	var hearts = []; 	//心的集合
	var heartImg = new Image();	//创建Image对象
	heartImg.src = 'images/heart.svg';	//设置图片
	heartImg.onload = init;		//图片加载完成后执行初始化函数

	init函数  循环num让hearts的每一个都new Heart()实例
	用requestAnimationFrame执行render渲染

	构建Heart函数
	在原型上创建两个方法，update和draw
	draw方法画出图片
	ctx.drawImage(heartImg, this.x, this.y, this.width, this.height)

	render渲染函数
	ctx.clearRect(0, 0, wW, wH);	// 清空画布
	for (var i = 0; i < num; i++) {
		hearts[i].draw();
		hearts[i].update();
	}

	requestAnimationFrame(render);	
```
