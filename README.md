## 记录我在这里的点点滴滴

### 6.19  利用canvas加上requestAnimationFrame绘制爱心动画
```
	var hearts = []; 	//心的集合
	var heartImg = new Image();	//创建Image对象
	heartImg.src = 'images/heart.svg';	//设置图片
	heartImg.onload = init;		//图片加载完成后执行初始化函数
```