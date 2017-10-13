/**
 * Created by chenhongdong on 2017/10/13.
 */
import Vue from 'vue';

export default Vue.extend({
    template: `
        <div>
            <div>Hello {{name}}{{exclamationMarks}}</div>
            <button @click="decrement">-</button>
            <button @click="increment">+</button>
        </div>
    `,
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm
        }
    },
    methods: {
        increment() {
            this.enthusiasm++;
        },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        }
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
})