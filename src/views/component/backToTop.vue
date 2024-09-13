<template>
    <div class="components-container">
        这是顶部
        <div class="placeholder-container">
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
        </div>
        <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="0"
            transition-name="fade" />
    </div>
</template>

<script>
    import BackToTop from '@/components/BackToTop'

    export default {
        name: 'BackToTopDemo',
        components: {
            BackToTop
        },
        data() {
            return {
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1' // 按钮的背景颜色 
                }
            }
        }
    }
</script>

<style scoped>
    .placeholder-container div {
        padding: 100px 0;
        background: #eee;
    }
</style>