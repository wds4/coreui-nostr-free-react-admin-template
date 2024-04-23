import { configureStore, combineReducers } from '@reduxjs/toolkit'
import uiReducer from './features/ui/slice'
import profileReducer from './features/profile/slice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers({
  ui: uiReducer,
  profile: profileReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})
export default store

export const persistor = persistStore(store)

/*
Note: following this guide to implement redux-persist
https://dev.to/mihomihouk/persisting-state-on-page-refresh-in-reactredux-app-58cf

Beware, redux-persist has not been maintained for 3 years.

I have not yet wrapped root components (index.js) with PersistGate, and yet it magically seems to work anyway ... ?!?

I have now updated (index.js) with PersistGate, minus loading={<MainLoader />} bc I don't know what that does, and it still works.
*/
