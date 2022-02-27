<template>
    <div class="app-view">
        <router-view></router-view>
    </div>
</template>


<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<style scoped>
.app-view {
    padding: 16px;
    position: relative;
    top: 60px;
}

::-webkit-scrollbar {
    width: 4px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.7);
}

/* 滚动条 */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #ababab;
}

::-webkit-scrollbar-thumb:window-inactive {
    background-color: #ababab;
}
</style>

