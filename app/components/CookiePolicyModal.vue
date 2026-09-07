<template>
  <div class="fixed w-full h-full bg-[#444]/30 pt-[60px] lg:pt-[120px] pb-[60px] top-0 left-0 px-[50px] z-[120] overflow-y-auto overflow-x-hidden">
    <div class="bg-white rounded-2xl px-14 relative py-[75px] text-base font-normal mx-auto w-full md:w-[622px]">
      <UiButton
        class="absolute top-[30px] right-[20px]"
        color="black"
        variant="text"
        @click="handleCloseLegalModal"
      >
        <IconClose />
      </UiButton>
      <template v-if="locale === 'en'">
        <h3 class="text-lg font-bold text-black text-center lg:w-[370px] mx-auto mb-[45px]">Cookie Policy</h3>
        <p>At Rumbo S.A.C., we use cookies and similar technologies on our website www.rumbo.la to enhance user experience, provide personalized services, and analyze site traffic. Below, we explain what cookies are, how we use them, and how you can manage them.</p>
        <br >
        <h4 class="font-bold">1. What are cookies?</h4>
        <p class="pl-[14px]">Cookies are small text files stored in your browser when you visit a website. These files allow the website to remember your activity and preferences (such as language or font size) to enhance your browsing experience. Cookies can also be used for other purposes, like web analytics or marketing.</p>
        <br >
        <h4 class="font-bold">2. Types of cookies we use</h4>
        <p class="pl-[14px]">On www.rumbo.la, we use the following categories of cookies:</p>
        <ul class="ml-[14px] list-disc">
          <li>Strictly necessary cookies: Essential for the proper functioning of the website, enabling navigation and the use of basic services, like accessing secure areas.</li>
          <li>Performance cookies: Help us understand how users interact with our site by collecting information anonymously. These cookies allow us to continuously improve the user experience.</li>
          <li>Functionality cookies: Allow us to remember user preferences and settings to offer a more personalized experience.</li>
          <li>Marketing cookies: Used to show relevant ads to users on other websites, based on their browsing behavior on www.rumbo.la.</li>
        </ul>
        <br >
        <h4 class="font-bold">3. Third-party cookies</h4>
        <p class="pl-[14px]">We may use third-party services that also place cookies in your browser. These services may include web analytics (like Google Analytics) or advertising platforms that help us measure and optimize our campaign effectiveness.</p>
        <br >
        <h4 class="font-bold">4. How to manage cookies</h4>
        <p class="pl-[14px]">You can configure your browser to accept or reject cookies, as well as to delete existing cookies. Please note that if you choose to block or delete certain cookies, some website functions may not be available or work correctly. To manage cookies in popular browsers, you can refer to the following links:</p>
        <ul class="ml-[14px] list-disc">
          <li>Google Chrome</li>
          <li>Mozilla Firefox</li>
          <li>Microsoft Edge</li>
          <li>Safari</li>
        </ul>
        <br >
        <h4 class="font-bold">5. Cookie policy updates</h4>
        <p class="pl-[14px]">Rumbo S.A.C. reserves the right to update this cookie policy to reflect changes in our cookie usage practices or applicable legislation. We recommend checking this page periodically to stay informed of any changes.</p>
        <br >
        <h4 class="font-bold">6.Contact</h4>
        <p class="pl-[14px]">If you have any questions about our cookie policy or how we handle your personal data, please feel free to contact us at hola@rumbo.la.</p>
      </template>
      <template v-else>
        <h3 class="text-lg font-bold text-black text-center lg:w-[370px] mx-auto mb-[45px]">Cookie Policy</h3>
        <p>En Rumbo S.A.C., utilizamos cookies y tecnologías similares en nuestro sitio web www.rumbo.la para mejorar la experiencia de los usuarios, ofrecer servicios personalizados y analizar el tráfico del sitio. A continuación, te explicamos qué son las cookies, cómo las usamos y cómo puedes gestionarlas.</p>
        <br >
        <h4 class="font-bold">1. ¿Qué son las cookies?</h4>
        <p class="pl-[14px]">Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando visitas un sitio web. Estos archivos permiten que el sitio web recuerde tu actividad y preferencias (como el idioma o el tamaño de fuente) para mejorar tu experiencia de navegación. Las cookies también pueden ser utilizadas para otros fines, como la analítica web o el marketing.</p>
        <br >
        <h4 class="font-bold">2. Tipos de cookies que utilizamos</h4>
        <p class="pl-[14px]">En www.rumbo.la utilizamos las siguientes categorías de cookies:</p>
        <ul class="ml-[14px] list-disc">
          <li>Cookies estrictamente necesarias: Son esenciales para el correcto funcionamiento de la página web y permiten la navegación y el uso de servicios básicos, como acceder a áreas seguras.</li>
          <li>Cookies de rendimiento: Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio web, recopilando información de forma anónima. Estas cookies nos permiten mejorar continuamente la experiencia del usuario.</li>
          <li>Cookies de funcionalidad: Permiten recordar las preferencias y configuraciones del usuario para ofrecer una experiencia más personalizada.</li>
          <li>Cookies de marketing: Estas cookies se utilizan para mostrar anuncios relevantes para los usuarios en otros sitios web, basándose en su comportamiento de navegación en www.rumbo.la.</li>
        </ul>
        <br >
        <h4 class="font-bold">3. Cookies de terceros</h4>
        <p class="pl-[14px]">Es posible que utilicemos servicios de terceros que también colocan cookies en tu navegador. Estos servicios pueden incluir analíticas web (como Google Analytics) o plataformas de publicidad que nos ayudan a medir y optimizar la efectividad de nuestras campañas.</p>
        <br >
        <h4 class="font-bold">4. Cómo gestionar las cookies</h4>
        <p class="pl-[14px]">Puedes configurar tu navegador para aceptar o rechazar cookies, así como para eliminar las cookies existentes. Ten en cuenta que si decides bloquear o eliminar ciertas cookies, es posible que algunas funciones del sitio web no estén disponibles o no funcionen correctamente.
          Para gestionar las cookies en los navegadores más utilizados, puedes consultar los siguientes enlaces:</p>
        <ul class="ml-[14px] list-disc">
          <li>Google Chrome</li>
          <li>Mozilla Firefox</li>
          <li>Microsoft Edge</li>
          <li>Safari</li>
        </ul>
        <br >
        <h4 class="font-bold">5. Actualización de la política de cookies</h4>
        <p class="pl-[14px]">Rumbo S.A.C. se reserva el derecho de actualizar esta política de cookies para reflejar cambios en nuestras prácticas de uso de cookies o en la legislación aplicable. Te recomendamos revisar esta página periódicamente para estar informado de cualquier cambio.</p>
        <br >
        <h4 class="font-bold">6.Contacto</h4>
        <p class="pl-[14px]">Si tienes alguna duda sobre nuestra política de cookies o sobre cómo tratamos tus datos personales, no dudes en contactarnos a través de hola@rumbo.la.</p>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { locale } = useI18n();

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleCloseLegalModal = () => {
  emit('close')
}
</script>