import{j as r,B as i}from"./iframe-DUnjrbO8.js";import{S as n}from"./SignInToSaveModal-2K_3S6dx.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CpB1l9cH.js";import"./index-CsPeDwm9.js";import"./x-Cn134Yge.js";import"./createLucideIcon-ZjxZPZsu.js";import"./bookmark-DxLEx7jR.js";import"./file-text-qtEiikbF.js";const S={title:"Components/SignInToSaveModal",component:n,decorators:[c=>r.jsx(i,{children:r.jsx(c,{})})],parameters:{layout:"fullscreen",docs:{description:{component:"A modal that prompts unauthenticated users to sign in when they try to save a vehicle, article, or video."}}},argTypes:{itemType:{control:"select",options:["vehicle","article","video"],description:"The type of item being saved"},isOpen:{control:"boolean",description:"Whether the modal is open"},itemName:{control:"text",description:"The name of the item being saved"},itemImage:{control:"text",description:"Optional image URL for the item"}}},e={args:{isOpen:!0,onClose:()=>console.log("Modal closed"),itemType:"vehicle",itemName:"2025 Honda Accord",itemImage:"https://hips.hearstapps.com/mtg-prod/65a1ccd79afa860008125aac/2024-honda-accord-12.jpg"}},o={args:{isOpen:!0,onClose:()=>console.log("Modal closed"),itemType:"article",itemName:"The Refreshed Solterra EV SUV Is the Quickest Subaru We've Ever Tested",itemImage:"https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg"}},a={args:{isOpen:!0,onClose:()=>console.log("Modal closed"),itemType:"video",itemName:"2025 Porsche 911 GT3 RS Track Test",itemImage:"https://hips.hearstapps.com/mtg-prod/65a1ccd79afa860008125aac/2024-porsche-911-gt3-rs-12.jpg"}},t={args:{isOpen:!0,onClose:()=>console.log("Modal closed"),itemType:"vehicle",itemName:"2025 Toyota Camry"}},s={args:{isOpen:!0,onClose:()=>console.log("Modal closed"),itemType:"article"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'vehicle',
    itemName: '2025 Honda Accord',
    itemImage: 'https://hips.hearstapps.com/mtg-prod/65a1ccd79afa860008125aac/2024-honda-accord-12.jpg'
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'article',
    itemName: 'The Refreshed Solterra EV SUV Is the Quickest Subaru We\\'ve Ever Tested',
    itemImage: 'https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg'
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'video',
    itemName: '2025 Porsche 911 GT3 RS Track Test',
    itemImage: 'https://hips.hearstapps.com/mtg-prod/65a1ccd79afa860008125aac/2024-porsche-911-gt3-rs-12.jpg'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'vehicle',
    itemName: '2025 Toyota Camry'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'article'
  }
}`,...s.parameters?.docs?.source}}};const y=["SaveVehicle","SaveArticle","SaveVideo","WithoutImage","WithoutItemName"];export{o as SaveArticle,e as SaveVehicle,a as SaveVideo,t as WithoutImage,s as WithoutItemName,y as __namedExportsOrder,S as default};
