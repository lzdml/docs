<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(() => {
  // 自动重定向到AI知识点页面
  router.go('/ai/knowledge/')
})
</script>

# AI 模块

正在跳转到AI知识点页面...