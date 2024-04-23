This is a fork of [CoreUI Free React Admin Template](https://github.com/coreui/coreui-free-react-admin-template) with basic nostr functionality added. If you know react, want to build a nostr web app, and prefer an admin / dashboard style template, this may be of use to you! 

This template is hosted on Vercel (see link in the About section of this repo), and updates to the main branch are automatically pushed to the live site and deployed. Similar steps could be followed for different starting templates or different hosting services (in place of Vercel). 

## Nostr features

Implemented:
- two nostr login methods: login with extension and login with secret (user supplied or generate a new one)
- default relay list
- data persistence using redux-persist (caution: this lib has not been well maintained, seems abandoned)
- logout, which clears redux store (profile info)
- download your profile relays and follows and updates active relays list to your relays
- profile page which downloads your kind 1 notes (but does not turn them into a feed)

Caution with using your nsec! This does not yet salt the nsec, although that may be added later.

This does NOT implement:
- several other login methods
- update your profile
- update relays or follows
- show any content feeds
- view other profiles

## This document

This README is a record of the steps I took to fork the Core UI template, to set it up on [vercel](https://vercel.com) for hosting, and to incorporate basic nostr functionality. Mostly, this is for myself in case I need to retrace my steps. 

# Steps

## fork CoreUI template

Go to `https://github.com/coreui/coreui-free-react-admin-template` and fork the template, naming it `coreui-nostr-free-react-admin-template`.

Clone it Locally:

```
git clone https://github.com/wds4/coreui-nostr-free-react-admin-template.git
cd coreui-nostr-free-react-admin-template
npm install
npm start
```

Should indicate that it is running on http://localhost:3000/

Update package.json with this:

```
"engines": {
  "node": "20.x"
},
```

and push changes to github repo.

## Vercel

Go to `vercel.com`, sign in using github account, then Add New Project. Should see option to Import Git Repository. Select the repo we just created. 
- Framework Preset is Vite. (automatically)
- Did NOT select src as the root directory.
- Under Build and Output Settings, next to Output Directory, click Override and enter `build`. 
- Under Install Command, click Override and enter `npm install`. 
- No Environmental Variables. 
- Click Deploy.

## Add dependencies

These are all of the dependencies that must be added to the CoreUI template.

```
npm install @nostr-dev-kit/ndk 
npm install @nostr-dev-kit/ndk-react 
npm install nostr-tools
npm install @noble/hashes

npm install @reduxjs/toolkit
npm install redux-persist
```

Push changes, make sure Vercel updates and still works.

## reorganize redux store

Two reasons to reorganize the store. First, I anticipate having lots of data and want to divide it into multiple reducer slices, each with its own folder in src/redux/features. Second, it's the method that I am accustomed to. Don't know whether it's actually better or not.

Steps:
- Add src/redux folder, which includes store.js, profile and ui folders.
- delete the old rc/store.js
- Replace state.sidebarShow with state.ui.sidebarShow in AppHeader.js and AppSidebar.js
- Replace state.sidebarUnfoldable with state.ui.sidebarUnfoldable in AppSidebar.js
- Import updateSidebarShow to AppHeader.js. and add it to onClick under CHeaderToggler
- Import updateSidebarShow to AppSidebar.js.
- Import updateSidebarUnfoldable to AppSidebar.js. and add it to onClick under CSidebarToggler
- In `index.js`, replace `import store from './store'` with `import { persistor, store } from './redux/store'`. 
- In `index.js`, import PersistGate and wrap <App /> with <PersistGate>.
- Add `src/const.js`

Rationale for redux-persist: I discovered that a refresh of any page will clear out redux store, effectively logging the user out. To prevent this from happening, I made use of the redux-persist package. Beware, this library is no longer maintained!

Note: following this guide to implement redux-persist
https://dev.to/mihomihouk/persisting-state-on-page-refresh-in-reactredux-app-58cf

commit of the above changes: `restructure redux`

## nostr login using extension and secret.

Steps:
- Update AppHeaderDropdown by adding Login and Logout links to bottom, check whether signed in, add runLogout function, replace avatar8 with myPictureUrl.
- Update _custom.scss with .show and .hide.

commit of the above changes: `login and logout links`

Steps:
- Major changes to Login.js page
- Add helpers folder, with nip19 and relays.js.
- Update App.js with NDKProvider.
- Add myProfile/MyProfile.js under views.
- Update routes.js with myProfile
- Update Profile link in AppHeaderDropdown.js. 
- Update DefaultLayout, major revisions.

commit of the above changes: `login using extension and secret`

## Refining the template

Fork `coreui-nostr-free-react-admin-template` to create `coreui-nostr-free-react-admin-template-B`, then:
- delete unrelated menu items and generally clean up the navigation
- have a page for follows
- make basic profile page for other user profiles
- show notes for users - list by id, nothing more
- make settings page to view relays

Then turn it into a template, fork it in two, maintain 4 repositories, host each on vercel:
- the early version of the template, at https://coreui-nostr-free-react-admin-template.vercel.app
- the more polished version of the template, probably at https://coreui-nostr-free-react-admin-template-b.vercel.app
- one repo to rebuild Plex, which will do losts of things, and will introduce a complex menu navigation system for multiple apps. https://brainstorm.ninja
- one site with a very focused purpose, which is to demo the basic grapevine app; manage contexts and trust attestations, and calculate and save influence scores. https://tapestry,ninja

## Bugs

on smartphone, left side panel opens with button but does not close unless you touch somewhere outside the sidebar. X does not close sidebar. This does however work on laptop. Maybe need to get rid of:
dispatch({ type: 'set', sidebarShow: visible })
and replace with:
dispatch(updateSidebarShow(visible))
in AppSidebar.js ? (Done but not pushed to github)
bc it works correctly in AppHeader but does not work correctly in AppSidebar.

Not sure whether I am downloading events properly; useEffect, triggered by changes in
- fetchEvents(filter) when downloading events
- getProfile(myNpub) when downloading my profile data

## Quick Start

- Clone the repo: `git clone https://github.com/wds4/coreui-nostr-free-react-admin-template.git`

### Installation

``` bash
$ npm install
```

or

``` bash
$ yarn install
```

### Basic usage

``` bash
# dev server with hot reload at http://localhost:3000
$ npm start 
```

or 

``` bash
# dev server with hot reload at http://localhost:3000
$ yarn start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

#### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

or

```bash
# build for production with minification
$ yarn build
```

## Copyright and License

Code released under [the MIT license](https://github.com/coreui/coreui-free-react-admin-template/blob/main/LICENSE).
