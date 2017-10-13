/**
 * Created by chenhongdong on 2017/10/13.
 */
import Vue from 'vue';
// import Hello from './components/Hello';
import Hello from './components/hello.vue';
var v = new Vue({
    el: '#app',
    template: "\n        <div>\n            <div>Hello {{name}}!</div>\n            <hello :name=\"name\" :number=\"5\"></hello>\n        </div>\n    ",
    data: {
        name: '世界'
    },
    components: {
        Hello: Hello
    }
});
//# sourceMappingURL=index.js.map