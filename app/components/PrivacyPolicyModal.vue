<script lang="ts" setup>
const { locale } = useI18n();

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleCloseLegalModal = () => {
  emit('close')
}
</script>
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
        <h3 class="text-lg font-bold text-black text-center lg:w-[370px] mx-auto mb-[45px]">Privacy Policy</h3>
        <p>Rumbo S.A.C. (hereinafter "Rumbo"), located at Calle Martín Napanga, 135 - Miraflores, is committed to protecting the privacy of users ("Users") who access and use our website www.rumbo.la (the "Website") to submit information. This document sets forth the terms, conditions, and policies regarding privacy and cookies, governing the collection and processing of personal data provided by Users through these forms.</p>
        <br >
        <h4 class="font-bold">1. Acceptance of Terms</h4>
        <p class="pl-[14px]">By completing and submitting the form on the Website, Users authorize Rumbo to share their data with contracting companies and to send them communications from Rumbo and third parties that may be of interest in the context of Rumbo’s activities.</p>
        <br >
        <h4 class="font-bold">2. Collection and Use of Information</h4>
        <p class="pl-[14px]">Rumbo will not collect personally identifiable information without the express prior consent of Users. Personal information is collected only when provided voluntarily through forms on the Website, with acceptance of Rumbo's Privacy Policy. This information is used to evaluate Users' professional profiles, contact them regarding job opportunities, and keep them in Rumbo's database.</p>
        <br >
        <h4 class="font-bold">3. Automatically Collected Data</h4>
        <p class="pl-[14px]">The Website may automatically collect technical data, such as IP addresses, browser types, operating systems, and pages visited. This information is used for statistical purposes and to improve the user experience but does not include sensitive data like names, addresses, or credit card information.</p>
        <br >
        <h4 class="font-bold">4. Cookies</h4>
        <p class="pl-[14px]">Rumbo's Website uses cookies to enhance user experience, store preferences, and customize content. Cookies do not identify specific individuals but allow us to provide better service to Users. Cookies can be disabled in browser settings; however, some Website features may be affected.</p>
        <br >
        <h4 class="font-bold">5. Purpose of Data Processing</h4>
        <p class="pl-[14px]">The personal data provided through forms will be used to:</p>
        <ul class="pl-[38px] list-disc">
          <li>Evaluate Users' profiles for suitable job opportunities.</li>
          <li>Enable hiring companies to contact Users.</li>
          <li>Compile statistics and improve Website content and functionality.</li>
          <li>Perform marketing communications and trend analysis.</li>
        </ul>
        <br >
        <h4 class="font-bold">6. User Rights</h4>
        <p class="pl-[14px]">Users have the right to access, rectify, update, and delete their personal data at any time. To exercise these rights, Users should email hola@rumbo.la, and Rumbo will respond as soon as possible.</p>
        <br >
        <h4 class="font-bold">7. Modifications</h4>
        <p class="pl-[14px]">Rumbo reserves the right to modify these terms and conditions at any time. Any changes will be posted on the Website.</p>
      </template>
      <template v-else>
        <h3 class="text-lg font-bold text-black text-center lg:w-[370px] mx-auto mb-[45px]">Privacy Policy</h3>
        <p>Rumbo S.A.C. (en adelante "Rumbo"), con domicilio en Calle Martín Napanga, 135 - Miraflores, se compromete a proteger la privacidad de los usuarios ("Usuarios") que acceden y utilizan nuestro sitio web www.rumbo.la (el "Sitio Web") para ingresar información. Este documento establece los términos, condiciones y políticas de privacidad y cookies que regulan la recopilación y tratamiento de los datos personales proporcionados por los Usuarios a través de dichos formularios.</p>
        <br >
        <h4 class="font-bold">1. Aceptación de los términos</h4>
        <p class="pl-[14px]">Al completar la información y enviar el formulario en el Sitio Web, los Usuarios autorizan a Rumbo a que pueda ceder sus datos a empresas contratantes y remitirles comunicaciones propias y de terceros, por cualquier medio, que puedan resultarles de interés en el contexto de las actividades de Rumbo.</p>
        <br >
        <h4 class="font-bold">2. Recopilación y uso de información</h4>
        <p class="pl-[14px]">Rumbo no recopilará información personal identificativa sin el expreso consentimiento previo de los Usuarios. La información personal sólo será recopilada si se proporciona voluntariamente a través de los formularios disponibles en el Sitio Web, aceptando la Política de Privacidad de Rumbo. Esta información será utilizada para evaluar los perfiles profesionales de los Usuarios, contactarles en relación con oportunidades laborales, y mantenerles en la base de datos de Rumbo.</p>
        <br >
        <h4 class="font-bold">3. Datos personales recolectados automáticamente</h4>
        <p class="pl-[14px]">El Sitio Web puede recopilar automáticamente ciertos datos técnicos, como la dirección IP, el navegador utilizado, el sistema operativo y las páginas visitadas. Esta información se usa con fines estadísticos y para mejorar la experiencia del usuario, pero no incluye datos sensibles como nombres, direcciones o información de tarjetas de crédito.</p>
        <br >
        <h4 class="font-bold">4. Cookies</h4>
        <p class="pl-[14px]">El Sitio Web de Rumbo utiliza cookies para mejorar la experiencia del usuario, almacenar preferencias y personalizar el contenido. Las cookies no identifican a una persona específica, sino que permiten ofrecer un mejor servicio a los Usuarios. Se pueden deshabilitar las cookies en las opciones del navegador; sin embargo, algunas funcionalidades del Sitio Web podrían verse afectadas.</p>
        <br >
        <h4 class="font-bold">5. Finalidad del tratamiento de datos</h4>
        <p class="pl-[14px]">Los datos personales proporcionados a través de los formularios serán utilizados para:</p>
        <ul class="pl-[38px] list-disc">
          <li>Evaluar si los perfiles de los Usuarios son adecuados para las oportunidades laborales disponibles.</li>
          <li>Permitir que las empresas contratantes se pongan en contacto con los Usuarios.</li>
          <li>Elaborar estadísticas y mejorar el contenido y funcionalidad del Sitio Web.</li>
          <li>Comunicaciones de marketing y análisis de tendencias.</li>
        </ul>
        <br >
        <h4 class="font-bold">6. Derechos del usuario</h4>
        <p class="pl-[14px]">Los Usuarios tienen derecho a acceder, rectificar, actualizar y suprimir sus datos personales en cualquier momento. Para ejercer estos derechos, se debe enviar un correo a hola@rumbo.la. Rumbo responderá a las solicitudes en el menor tiempo posible.</p>
        <br >
        <h4 class="font-bold">7. Modificaciones</h4>
        <p class="pl-[14px]">Rumbo se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será publicado en el Sitio Web.</p>
      </template>
    </div>
  </div>
</template>