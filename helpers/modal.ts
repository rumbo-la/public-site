export const toggleBodyModal = () => {
  if (document.body.classList.contains('body-modal-active')) {
    document.body.classList.remove('body-modal-active'); // Elimina la clase si existe
  } else {
    document.body.classList.add('body-modal-active'); // Agrega la clase si no existe
  }
}