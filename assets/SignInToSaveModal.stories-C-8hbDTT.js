import{j as r,B as n}from"./iframe-DcgZJ2Uo.js";import{S as i}from"./SignInToSaveModal-SHOsz7dD.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DeohuagH.js";import"./index-CaJADRT1.js";import"./x-BB0Nz_97.js";import"./createLucideIcon-DKG3LGyb.js";import"./bookmark-CuqTJ9Hf.js";import"./file-text-B3vu-IB6.js";const f={title:"Components/SignInToSaveModal",component:i,decorators:[c=>r.jsx(n,{children:r.jsx(c,{})})],parameters:{layout:"fullscreen",docs:{description:{component:"A modal that prompts unauthenticated users to sign in when they try to save a vehicle, article, or video."}}},argTypes:{itemType:{control:"select",options:["vehicle","article","video"],description:"The type of item being saved"},isOpen:{control:"boolean",description:"Whether the modal is open"},itemName:{control:"text",description:"The name of the item being saved"},itemImage:{control:"text",description:"Optional image URL for the item"}}},e={args:{isOpen:!0,onClose:()=>console.log("Modal closed"),itemType:"vehicle",itemName:"2025 Honda Accord",itemImage:"https://d2kde5ohu8qb21.cloudfront.net/files/65a1ccd79afa860008125aac/2024-honda-accord-12.jpg"}},o={args:{isOpen:!0,onClose:()=>console.log("Modal closed"),itemType:"article",itemName:"The Refreshed Solterra EV SUV Is the Quickest Subaru We've Ever Tested",itemImage:"https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg"}},t={args:{isOpen:!0,onClose:()=>console.log("Modal closed"),itemType:"video",itemName:"2025 Porsche 911 GT3 RS Track Test",itemImage:"https://d2kde5ohu8qb21.cloudfront.net/files/65a1ccd79afa860008125aac/2024-porsche-911-gt3-rs-12.jpg"}},a={args:{isOpen:!0,onClose:()=>console.log("Modal closed"),itemType:"vehicle",itemName:"2025 Toyota Camry"}},s={args:{isOpen:!0,onClose:()=>console.log("Modal closed"),itemType:"article"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'vehicle',
    itemName: '2025 Honda Accord',
    itemImage: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a1ccd79afa860008125aac/2024-honda-accord-12.jpg'
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'article',
    itemName: 'The Refreshed Solterra EV SUV Is the Quickest Subaru We\\'ve Ever Tested',
    itemImage: 'https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg'
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'video',
    itemName: '2025 Porsche 911 GT3 RS Track Test',
    itemImage: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a1ccd79afa860008125aac/2024-porsche-911-gt3-rs-12.jpg'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'vehicle',
    itemName: '2025 Toyota Camry'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'article'
  }
}`,...s.parameters?.docs?.source}}};const S=["SaveVehicle","SaveArticle","SaveVideo","WithoutImage","WithoutItemName"];export{o as SaveArticle,e as SaveVehicle,t as SaveVideo,a as WithoutImage,s as WithoutItemName,S as __namedExportsOrder,f as default};
