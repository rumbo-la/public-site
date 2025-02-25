<template>
  <div class="typing-container mr-1 min-w-2">
    <div ref="typingText" class="typing-text"></div>
    <div class="cursor"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const { locale  } = useI18n();

const typingText = ref(null);

let textIndex = 0;
let charIndex = 0;
let typingSpeed = 150;
let deletingSpeed = 100;
let delayBetweenTexts = 2000;

const localeDiscipline = computed(() => {
  if (locale.value === 'es') {
    return [
      "Ingenieros",
      "Diseñadores de Producto",
      "CTOs",
      "Científicos de Datos",
      "Arquitectos",
      "Expertos en GenAI",
      "Gerentes de Producto",
      "Expertos en la Nube"
    ]
  }
  return [
    "Engineers",
    "Product Designers",
    "CTOs",
    "Data Scientists",
    "Architects",
    "GenAI Experts",
    "Product Managers",
    "Cloud Experts"
  ]
})

const typeText = () => {
  const currentText = localeDiscipline.value[textIndex];

  if (charIndex < currentText.length) {
    typingText.value.innerHTML += currentText.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(deleteText, delayBetweenTexts); // Delay before starting deletion
  }
};

const deleteText = () => {
  const currentText = localeDiscipline.value[textIndex];

  if (charIndex > 0) {
    typingText.value.innerHTML = currentText.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteText, deletingSpeed);
  } else {
    textIndex = (textIndex + 1) % localeDiscipline.value.length; // Move to the next text
    setTimeout(typeText, typingSpeed); // Start typing the next text
  }
};

onMounted(() => {
  setTimeout(typeText, typingSpeed);
});
</script>

<style scoped lang="scss">
.typing-container {
  @apply text-primary relative;
  display: inline-block;
  white-space: nowrap;
  // overflow: hidden;
  // border-right: 2px solid;
  @apply h-[21px];
  @screen lg {
    @apply h-[37px];
  }
}

.typing-text {
  @apply font-dxgrafik text-[20px] leading-[20px] relative pr-1;
  @apply h-[20px];
  @screen lg {
    @apply text-[34px] leading-[37px] mt-0;
    @apply h-[37px];
  }
}

.cursor {
  @apply bg-primary absolute right-0 -top-0.5 h-full w-0.5;
  display: inline-block;
  animation: blink 0.5s steps(1) infinite;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
</style>