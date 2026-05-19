export default defineNuxtPlugin(() => {
  const promo = usePromoCode()

  promo.initPromoCode()
})
