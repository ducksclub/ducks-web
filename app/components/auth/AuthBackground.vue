<template>
  <div class="absolute inset-0 overflow-hidden">
    <div class="glow left"></div>
    <div class="glow right"></div>
  </div>
</template>

<style scoped>
.glow {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 9999px;
  filter: blur(100px);
  opacity: 0.12;
}

.left {
  top: -80px;
  left: -80px;
  background: var(--primary);
}

.right {
  bottom: -80px;
  right: -80px;
  background: var(--accent);
}
</style>
