import { ref } from 'vue'

export type ModalType = 'join' | 'create' | 'profile' | 'stats' | 'match-detail' | 'edit-profile' | 'share-profile' | 'contact-organizer' | 'challenge' | 'detailed-stats' | 'manage-game' | 'post-game' | null

const activeModal = ref<ModalType>(null)
const selectedItem = ref<any>(null)

export const useUI = () => {
  const openModal = (type: ModalType, item?: any) => {
    activeModal.value = type
    if (item) selectedItem.value = item
  }

  const closeModal = () => {
    activeModal.value = null
    selectedItem.value = null
  }

  return {
    activeModal,
    selectedItem,
    openModal,
    closeModal
  }
}
