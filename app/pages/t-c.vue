<script lang="ts" setup>
usePageSeo('TERMS_CONDITIONS')

const { locale } = useI18n()
</script>
<template>
  <div class="flex flex-col w-full pt-[70px] lg:pt-[89px]">
    <div v-if="locale === 'es'" class="container py-[60px] lg:py-[90px] lg:px-[90px]">
      <h3 class="font-dxgrafik text-[20px] leading-[30px] lg:text-[34px] lg:leading-[60px] font-bold text-black text-center mx-auto mb-[45px]">Términos y condiciones</h3>
      <p>Rumbo S.A.C. (en adelante, "Rumbo"), con domicilio en Calle Martín Napanga 135, Miraflores, se compromete a proteger la privacidad de los usuarios ("Usuarios") que acceden y utilizan nuestro sitio web http://www.rumbo.la (el "Sitio Web") para enviar información. Este documento establece los términos, condiciones y políticas de privacidad y cookies que rigen la recopilación y el tratamiento de los datos personales que los Usuarios proporcionan a través de estos formularios.</p>
      <br >
      <h4 class="font-bold">Aceptación de los términos</h4>
      <p>Al completar y enviar el formulario del Sitio Web, los Usuarios autorizan a Rumbo a compartir sus datos con empresas contratantes y a enviarles comunicaciones de Rumbo y de terceros que puedan ser de su interés en el contexto de las actividades de Rumbo.</p>
      <br >
      <h4 class="font-bold">Recopilación y uso de la información</h4>
      <p>Rumbo no recopilará información de identificación personal sin el consentimiento previo y expreso de los Usuarios. La información personal se recopila únicamente cuando se proporciona de forma voluntaria a través de los formularios del Sitio Web, con la aceptación de la Política de Privacidad de Rumbo. Esta información se utiliza para evaluar el perfil profesional de los Usuarios, contactarlos respecto a oportunidades laborales y mantenerlos en la base de datos de Rumbo.</p>
      <br >
      <h4 class="font-bold">Datos recopilados automáticamente</h4>
      <p>El Sitio Web puede recopilar automáticamente datos técnicos, como direcciones IP, tipos de navegador, sistemas operativos y páginas visitadas. Esta información se utiliza con fines estadísticos y para mejorar la experiencia del usuario, y no incluye datos sensibles como nombres, direcciones o información de tarjetas de crédito.</p>
      <br >
      <h4 class="font-bold">Cookies</h4>
      <p>El Sitio Web de Rumbo utiliza cookies para mejorar la experiencia del usuario, almacenar preferencias y personalizar el contenido. Las cookies no identifican a personas específicas, pero nos permiten brindar un mejor servicio a los Usuarios. Las cookies pueden desactivarse en la configuración del navegador; sin embargo, algunas funciones del Sitio Web podrían verse afectadas.</p>
      <br >
      <h4 class="font-bold">Finalidad del tratamiento de datos</h4>
      <p>Los datos personales proporcionados a través de los formularios se utilizarán para:</p>
      <ul class="pl-[38px] list-disc">
        <li>Evaluar el perfil de los Usuarios para oportunidades laborales adecuadas.</li>
        <li>Permitir que las empresas contratantes se pongan en contacto con los Usuarios.</li>
        <li>Elaborar estadísticas y mejorar el contenido y la funcionalidad del Sitio Web.</li>
        <li>Realizar comunicaciones de marketing y análisis de tendencias.</li>
      </ul>
      <br >
      <h4 class="font-bold">Uso de la información personal</h4>
      <p>Con el fin de promover la comunidad de Rumbo, realizaremos actividades comerciales y/o promocionales en sitios web, redes sociales, publicidad física, etc. En ese sentido, y de acuerdo con la Ley sobre el Derecho de Autor del Perú (Decreto Legislativo N° 822), usted autoriza expresamente el uso de su voz, nombre, imagen y/o información personal general para dichos fines. Esta autorización se otorga por tiempo indefinido, reconociendo que su consentimiento es necesario conforme a la ley para utilizar estos atributos personales. Usted conserva el derecho de revocar este consentimiento en cualquier momento, de conformidad con las disposiciones legales aplicables.</p>
      <br >
      <h4 class="font-bold">Derechos de los Usuarios</h4>
      <p>Los Usuarios tienen derecho a acceder, rectificar, actualizar y eliminar sus datos personales en cualquier momento. Para ejercer estos derechos, los Usuarios deben escribir a hola@rumbo.la, y Rumbo responderá a la brevedad posible.</p>
      <br >
      <h4 class="font-bold">Modificaciones</h4>
      <p>Rumbo se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será publicado en el Sitio Web.</p>
    </div>
    <div v-else class="container py-[60px] lg:py-[90px] lg:px-[90px]">
      <h3 class="font-dxgrafik text-[20px] leading-[30px] lg:text-[34px] lg:leading-[60px] font-bold text-black text-center mx-auto mb-[45px]">Terms and Conditions</h3>
      <p>Rumbo S.A.C. (hereinafter "Rumbo"), located at Calle Martín Napanga, 135 - Miraflores, is committed to protecting the privacy of users ("Users") who access and use our website http://www.rumbo.la  (the "Website") to submit information. This document sets forth the terms, conditions, and policies regarding privacy and cookies, governing the collection and processing of personal data provided by Users through these forms.</p>
      <br >
      <h4 class="font-bold">Acceptance of Terms</h4>
      <p >By completing and submitting the form on the Website, Users authorize Rumbo to share their data with contracting companies and to send them communications from Rumbo and third parties that may be of interest in the context of Rumbo’s activities.</p>
      <br >
      <h4 class="font-bold">Collection and Use of Information</h4>
      <p >Rumbo will not collect personally identifiable information without the express prior consent of Users. Personal information is collected only when provided voluntarily through forms on the Website, with acceptance of Rumbo's Privacy Policy. This information is used to evaluate Users' professional profiles, contact them regarding job opportunities, and keep them in Rumbo's database.</p>
      <br >
      <h4 class="font-bold">Automatically Collected Data</h4>
      <p  >The Website may automatically collect technical data, such as IP addresses, browser types, operating systems, and pages visited. This information is used for statistical purposes and to improve the user experience but does not include sensitive data like names, addresses, or credit card information.</p>
      <br >
      <h4 class="font-bold">Cookies</h4>
      <p  >Rumbo's Website uses cookies to enhance user experience, store preferences, and customize content. Cookies do not identify specific individuals but allow us to provide better service to Users. Cookies can be disabled in browser settings; however, some Website features may be affected.</p>
      <br >
      <h4 class="font-bold">Purpose of Data Processing</h4>
      <p  >The personal data provided through forms will be used to:</p>
      <ul class="pl-[38px] list-disc">
        <li>Evaluate Users profiles for suitable job opportunities.</li>
        <li>Enable hiring companies to contact Users.</li>
        <li>Compile statistics and improve Website content and functionality.</li>
        <li>Perform marketing communications and trend analysis.</li>
      </ul>
      <br >
      <h4 class="font-bold">Personal Information Use</h4>
      <p  >For the purpose of promoting Rumbo’s community, we will engage in commercial and/or promotional activities on websites, social media, physical advertisements, etc. In this regard, and in accordance with Peruvian Copyright Law (Decreto Legislativo N° 822), you expressly authorize us to use your voice, name, image, and/or general personal information for such purposes. This authorization is granted for an indefinite period, recognizing that your consent is necessary under the law to use these personal attributes. You retain the right to revoke this consent at any time, in compliance with the relevant legal provisions.</p>
      <br >
      <h4 class="font-bold">User Rights</h4>
      <p  >Users have the right to access, rectify, update, and delete their personal data at any time. To exercise these rights, Users should email hola@rumbo.la, and Rumbo will respond as soon as possible.</p>
      <br >
      <h4 class="font-bold">Modifications</h4>
      <p  >Rumbo reserves the right to modify these terms and conditions at any time. Any changes will be posted on the Website.</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>