const WHATSAPP_PHONE = '551152835040';

const whatsappPresetMessage = encodeURIComponent(
  'Olá! Encontrei vocês pelo site e gostaria de falar com um especialista '
);

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappPresetMessage}`;
