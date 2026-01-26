import{G as i}from"./GasStationsModal-DEpvKWjf.js";import"./iframe-DcgZJ2Uo.js";import"./preload-helper-PPVm8Dsz.js";import"./index.modern-BcqBioLn.js";import"./index-DeohuagH.js";import"./index-CaJADRT1.js";import"./zap-DRfwLoKU.js";import"./createLucideIcon-DKG3LGyb.js";import"./fuel-CMCmyPO6.js";import"./x-BB0Nz_97.js";import"./loader-circle-bKLPK745.js";import"./map-pin-C_5X5z24.js";import"./external-link-Bbf9X_lV.js";const k={title:"Molecules/FuelEconomy/GasStationsModal",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
## Gas Stations Modal

A modal component that displays nearby gas stations on an interactive Google Map.

### Features
- **Geolocation**: Automatically detects user's location (with fallback to Los Angeles)
- **Google Maps Integration**: Interactive map with gas station markers
- **Places API**: Searches for gas stations within 8km radius
- **Station List**: Sidebar showing all found stations with ratings and status
- **Info Windows**: Click markers to see station details
- **Directions**: One-click navigation to any station via Google Maps
- **GasBuddy Integration**: Link to compare gas prices

### Mental Model for Info Windows
- Click a marker or list item → Opens that station's info window
- Click a different marker/list item → Closes previous, opens new one
- Click the X on info window → Closes it
- Only one info window can be open at a time

### Requirements
- Google Maps API key with Places API enabled
- Set \`VITE_GOOGLE_MAPS_API_KEY\` environment variable

### Usage
\`\`\`tsx
<GasStationsModal
  isOpen={true}
  onClose={() => {}}
  vehicleName="2024 Honda CR-V"
/>
\`\`\`

### Note
This component requires a valid Google Maps API key to function.
In Storybook, the map may not display if the API key is not configured.
        `}}},tags:["autodocs"],argTypes:{isOpen:{control:"boolean",description:"Whether the modal is visible"},vehicleName:{control:"text",description:"Name of the vehicle (displayed in subtitle)"}}},e={args:{isOpen:!0,onClose:()=>{},vehicleName:"2024 Honda CR-V"}},o={args:{isOpen:!0,onClose:()=>{},vehicleName:"2024 Toyota RAV4 Hybrid"}},s={args:{isOpen:!0,onClose:()=>{}}},a={args:{isOpen:!0,onClose:()=>{},vehicleName:"2024 Ford F-150"}},t={args:{isOpen:!0,onClose:()=>{},vehicleName:"2024 Toyota Prius Prime"}},r={args:{isOpen:!1,onClose:()=>{},vehicleName:"2024 Honda CR-V"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {},
    vehicleName: '2024 Honda CR-V'
  }
}`,...e.parameters?.docs?.source},description:{story:`Default gas stations modal.
Shows the modal with a vehicle name in the subtitle.
Note: Requires Google Maps API key to display the map.`,...e.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {},
    vehicleName: '2024 Toyota RAV4 Hybrid'
  }
}`,...o.parameters?.docs?.source},description:{story:`Modal for a specific vehicle.
The vehicle name appears in the modal subtitle.`,...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {}
  }
}`,...s.parameters?.docs?.source},description:{story:`Modal without vehicle name.
Shows generic "Gas Stations Near You" title.`,...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {},
    vehicleName: '2024 Ford F-150'
  }
}`,...a.parameters?.docs?.source},description:{story:`Modal for a truck.
Demonstrates the modal with a truck vehicle name.`,...a.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {},
    vehicleName: '2024 Toyota Prius Prime'
  }
}`,...t.parameters?.docs?.source},description:{story:`Modal for an electric vehicle.
Note: For EVs, users might want charging stations instead.
This is for hybrid or plug-in hybrid vehicles that use gas.`,...t.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {},
    vehicleName: '2024 Honda CR-V'
  }
}`,...r.parameters?.docs?.source},description:{story:`Modal in closed state.
The modal should not be visible.`,...r.parameters?.docs?.description}}};const w=["Default","WithVehicleName","WithoutVehicleName","ForTruck","ForHybrid","Closed"];export{r as Closed,e as Default,t as ForHybrid,a as ForTruck,o as WithVehicleName,s as WithoutVehicleName,w as __namedExportsOrder,k as default};
