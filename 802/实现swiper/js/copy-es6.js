class Swiper {
    constructor(imgs, minRange) {
        this.imgBox = imgs;
        this.imgs = imgs.children;
        this.cur_img = 0;           // 起始图片的位置
        this.count = this.imgs.length;
        this.ready_moved = true;    // 判断每次滑动开始的标记
        this.minRange = Number(minRange);
        this.touchX;                // 触控开始的手指最初落点
        this.fadeIn;
        this.fadeOut;
        this.bindTouchEv();         // 初始化绑定滑动事件
        this.setWrapper(this.imgs[0], this.count);
        this.showImg(this.cur_img); // 显示图片
    }

    bindTouchEv() {
        this.imgBox.addEventListener('touchstart', this.touchstart.bind(this), false);
        this.imgBox.addEventListener('touchmove', this.touchmove.bind(this), false);
        this.imgBox.addEventListener('touchend', this.touchend.bind(this), false);
    }

    touchstart(ev) {
        if (this.ready_moved) {
            let touch = ev.touches[0];
            this.touchX = touch.pageX;
            this.ready_moved = false;
        }
    }

    touchmove(ev) {
        this.calcTouch(ev);
    }

    touchend(ev) {
        this.calcTouch(ev);
    }

    calcTouch(ev) {
        ev.preventDefault();
        let minRange = this.minRange,
            touchX = this.touchX,
            count = this.count;

        if (!this.ready_moved) {
            let release = ev.changedTouches[0],
                releaseAt = release.pageX;

            if (releaseAt + minRange < touchX) {
                if (this.cur_img >= (count - 1)) {
                    this.cur_img = 0;
                } else {
                    this.cur_img++;
                }
                this.showImg(this.cur_img);

                this.ready_moved = true;
            } else if (releaseAt - minRange > touchX) {
                if (this.cur_img <= 0) {
                    this.cur_img = count - 1;
                } else {
                    this.cur_img--;
                }
                this.showImg(this.cur_img);

                this.ready_moved = true;
            }
        }
    }

    fadeIn(ele) {
        ele.classList.add('fadeIn');
    }

    fadeOut(ele) {
        ele = Array.from(ele);  // 类数组转为数组

        ele.forEach(item => {
            item.className = 'bg';
        });
    }

    setWrapper(ele, count) {
        let width = ele.offsetWidth * count;
        this.imgBox.style.width = `${width}px`;
    }

    slideIn(ele, index) {
        console.log(ele);
        let width = ele.offsetWidth;
        ele.style.transition = 'left .5s ease';
        ele.style.left = -index * width + 'px';
    }

    slideOut(ele, index) {
        Array.from(ele).forEach((item, i) => {
           if (i === (index - 1)) {
               item.style.transform = 'translate3d(-100%, 0, 0)';
           } else if (i === (index + 1)) {
               item.style.transform = 'translate3d(0, 0, 0)';
           }
        });
    }

    showImg(index) {
        let panel = document.getElementById('pagination-panel'),
            btns = panel.querySelectorAll('li');

        this.hideImg(this.imgs, index);

        for (let i = 0; i < btns.length; i++) {
            btns[i].className = 'page-dot';
            this.imgs[i].style.width = document.documentElement.clientWidth + 'px';
        }
        btns[index].classList.add('active');

        //this.fadeIn(this.imgs[index]);
        this.slideIn(this.imgs[index], index);
    }

    hideImg(ele, index) {
        this.fadeOut(ele);
        //this.slideOut(ele, index);
    }
}

// 初始化
let imgs = new Swiper(document.getElementById('list'), 30);
