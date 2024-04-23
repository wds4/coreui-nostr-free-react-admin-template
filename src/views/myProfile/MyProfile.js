import React from 'react'
import { useSelector } from 'react-redux'

const MyProfile = () => {
  const myNpub = useSelector((state) => state.profile.npub)
  const myPubkey = useSelector((state) => state.profile.pubkey)
  const myName = useSelector((state) => state.profile.name)
  const myDisplayName = useSelector((state) => state.profile.display_name)
  const myPicture = useSelector((state) => state.profile.picture)
  return (
    <>
      <div>My Profile</div>
      <div>myNpub: {myNpub}</div>
      <div>myPubkey: {myPubkey}</div>
      <div>myName: {myName}</div>
      <div>myDisplayName: {myDisplayName}</div>
      <div>myPicture: {myPicture}</div>
    </>
  )
}

export default MyProfile
