/**
 * Default Hearst/CD body-style line art used by BodyStyleSelector and other flows.
 */

export interface BodyStyle {
  id: string;
  name: string;
  icon: string;
}

export const DEFAULT_BODY_STYLES: BodyStyle[] = [
  { id: 'suvs', name: 'SUVs', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suv-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*' },
  { id: 'hybrids', name: 'Hybrids', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hybridcar-647e4833d60f9.jpg?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*' },
  { id: 'crossovers', name: 'Crossovers', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/crossovers-1585158793.png?crop=1.00xw:0.502xh;0,0.244xh&resize=180:*' },
  { id: 'trucks', name: 'Pickup Trucks', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/trucks-1585158794.png?crop=1.00xw:0.502xh;0,0.236xh&resize=180:*' },
  { id: 'luxury', name: 'Luxury', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/luxury-1585158794.png?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*' },
  { id: 'evs', name: 'EVs', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hybrids-1585158794.png?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*' },
  { id: 'sports', name: 'Sports Cars', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sportscar-1585158794.png?crop=1.00xw:0.502xh;0,0.255xh&resize=180:*' },
  { id: 'sedans', name: 'Sedans', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sedans-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*' },
  { id: 'wagons', name: 'Wagons', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/wagons-1585158795.png?crop=1.00xw:0.502xh;0,0.244xh&resize=180:*' },
  { id: 'convertibles', name: 'Convertibles', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/convertibles-1585158793.png?crop=1.00xw:0.502xh;0,0.258xh&resize=180:*' },
  { id: 'vans', name: 'Vans', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vans-1585158795.png?crop=1.00xw:0.502xh;0,0.252xh&resize=180:*' },
  { id: 'coupes', name: 'Coupes', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sedans-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*' },
];
