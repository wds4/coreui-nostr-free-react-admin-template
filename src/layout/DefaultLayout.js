import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNDK } from '@nostr-dev-kit/ndk-react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import {
  updateAbout,
  updateBanner,
  updateDisplayName,
  updateName,
  updateNip05,
  updatePicture,
} from '../redux/features/profile/slice'

const DefaultLayout = () => {
  const myNpub = useSelector((state) => state.profile.npub)

  const { getProfile } = useNDK()

  const dispatch = useDispatch()

  useEffect(() => {
    async function updateMyProfile() {
      if (myNpub) {
        const oMyProfile = getProfile(myNpub)
        dispatch(updateDisplayName(oMyProfile?.displayName))
        dispatch(updateName(oMyProfile?.name))
        dispatch(updateAbout(oMyProfile?.about))
        dispatch(updateBanner(oMyProfile?.banner))
        if (oMyProfile?.image) {
          dispatch(updatePicture(oMyProfile?.image))
        }
        dispatch(updateNip05(oMyProfile?.nip05))
      }
    }
    updateMyProfile()
  }, [getProfile(myNpub)])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
