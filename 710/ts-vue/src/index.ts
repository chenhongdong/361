/**
 * Created by chenhongdong on 2017/10/13.
 */
import Vue from 'vue';
// import Hello from './components/Hello';
import Hello from './components/hello.vue';

let v = new Vue({
    el: '#app',
    template: `
        <div>
            <div>Hello {{name}}!</div>
            <hello :name="name" :number="5"></hello>
        </div>
    `,
    data: {
        name: '世界'
    },
    components: {
        Hello
    }
});