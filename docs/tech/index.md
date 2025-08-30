<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(() => {
  // 重定向到管理体系标准页面
  router.go('/tech/management-systems/')
})
</script>

# 技术点

正在跳转到管理体系标准页面...