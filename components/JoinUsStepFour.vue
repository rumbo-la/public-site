<template>
  <div class="w-[333px] lg:w-[500px] xl:w-[610px] relative py-[70px] lg:py-[200px] mx-auto">
    <img class="absolute top-0 left-0 w-full z-10" src="/images/cellphone-border.png" alt="Rumbo">
    <div class="w-full px-3 lg:px-0 lg:w-[450px] mx-auto flex justify-center relative flex-col z-20">
      <img class="w-[80px] lg:w-[130px] h-[80px] lg:h-[130px] mx-auto mb-10" src="/images/rumbo-icon.png" alt="Rumbo">
      <h3 class="text-[24px] lg:text-[32px] leading-[28px] lg:leading-[38px] font-bold text-black mb-[30px] text-center">¡Gracias por registrarte<br/>a Rumbo!</h3>
      <p class="w-full lg:w-[436px] text-[#666] text-base lg:text-lg px-4 lg:px-0 font-normal mb-[60px] text-center">Pronto nos estaremos comunicando contigo 
        para ofrecerte más información</p>
      <div class="justify-center flex">
        <UiButton
          @click="handleGoHome()"
          class="!rounded-3xl !min-w-[270px] !bg-primary hover:!bg-[#2C23B9] !h-[50px]"
          color="primary"
          variant="fill"
        >
          <span class="text-lg">Ir a Rumbo</span>
        </UiButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter()
const {
  setStep,
  setJoinUsModal
} = useJoin()

const handleGoHome = () => {
  setStep(1)
  setJoinUsModal(false)
  router.push({ path: '/' })
}
</script>
<style lang="scss" scoped>

</style>