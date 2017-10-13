<template>
    <div>
        <div class="greeting">Hello {{name}}{{mark}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: ['name', 'number'],
    data() {
        return {
            num: this.number
        }
    },
    methods: {
        increment() {
            this.num++;
        },
        decrement() {
            if (this.num > 1) {
                this.num--;
            }
        }
    },
    computed: {
        mark():string {
            return Array(this.num + 1).join('-');
        }
    }
})
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>